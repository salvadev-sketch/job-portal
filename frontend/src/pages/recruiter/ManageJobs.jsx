import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { api } from "../../lib/api";

export default function ManageJobs() {
  const { getToken } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const data = await api.getRecruiterJobs(token);
      setJobs(data.jobs || []);
      setLoading(false);
    })();
  }, [getToken]);

  const toggleVisible = async (job) => {
    const token = await getToken();
    const { job: updated } = await api.updateJob(job._id, { visible: !job.visible }, token);
    setJobs((prev) => prev.map((j) => (j._id === updated._id ? updated : j)));
  };

  return (
    <div>
      <h2 className="text-2xl mb-6">Manage roles</h2>
      {loading && <p className="text-slate">Loading…</p>}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-slate border-b border-ink">
            <th className="pb-3">Role</th>
            <th className="pb-3">Location</th>
            <th className="pb-3">Visible</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j._id} className="border-b border-line">
              <td className="py-3">{j.title}</td>
              <td className="py-3">{j.location}</td>
              <td className="py-3">
                <button onClick={() => toggleVisible(j)} className="font-mono text-xs underline">
                  {j.visible ? "Visible" : "Hidden"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
