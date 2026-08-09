import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { api } from "../lib/api";

const statusStyle = {
  Accepted: "bg-green-100 text-accept",
  Rejected: "bg-red-100 text-reject",
  Pending: "bg-yellow-100 text-signal-deep",
};

export default function MyApplications() {
  const { getToken } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const data = await api.getMyApplications(token);
        setApplications(data.applications || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [getToken]);

  return (
    <div className="max-w-[1100px] mx-auto px-10 py-12">
      <h2 className="text-2xl mb-8">My Applications</h2>

      {loading && <p className="text-slate">Loading…</p>}
      {!loading && applications.length === 0 && <p className="text-slate">No applications yet.</p>}

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-slate border-b border-ink">
            <th className="pb-3">Company</th>
            <th className="pb-3">Role</th>
            <th className="pb-3">Location</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((a) => (
            <tr key={a._id} className="border-b border-line">
              <td className="py-3">{a.jobId?.company?.name}</td>
              <td className="py-3">{a.jobId?.title}</td>
              <td className="py-3">{a.jobId?.location}</td>
              <td className="py-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] uppercase font-mono ${statusStyle[a.status] || ""}`}>
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
