import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { api } from "../../lib/api";

const statusStyle = {
  Accepted: "bg-green-100 text-accept",
  Rejected: "bg-red-100 text-reject",
  Pending: "bg-yellow-100 text-signal-deep",
};

export default function ViewApplications() {
  const { getToken } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const data = await api.getRecruiterApplications(token);
      setApplications(data.applications || []);
      setLoading(false);
    })();
  }, [getToken]);

  const setStatus = async (id, status) => {
    const token = await getToken();
    const { application } = await api.updateApplication(id, status, token);
    setApplications((prev) => prev.map((a) => (a._id === application._id ? application : a)));
  };

  return (
    <div>
      <h2 className="text-2xl mb-6">Applicants</h2>
      {loading && <p className="text-slate">Loading…</p>}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-slate border-b border-ink">
            <th className="pb-3">Role</th>
            <th className="pb-3">Location</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((a) => (
            <tr key={a._id} className="border-b border-line">
              <td className="py-3">{a.jobId?.title}</td>
              <td className="py-3">{a.jobId?.location}</td>
              <td className="py-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] uppercase font-mono ${statusStyle[a.status] || ""}`}>
                  {a.status}
                </span>
              </td>
              <td className="py-3 space-x-2">
                <button onClick={() => setStatus(a._id, "Accepted")} className="text-xs font-mono text-accept underline">
                  Accept
                </button>
                <button onClick={() => setStatus(a._id, "Rejected")} className="text-xs font-mono text-reject underline">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
