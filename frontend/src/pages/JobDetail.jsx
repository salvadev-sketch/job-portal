import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { api } from "../lib/api";

export default function JobDetail() {
  const { id } = useParams();
  const { getToken } = useAuth();

  const [job, setJob] = useState(null);
  const [status, setStatus] = useState("");
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    api.getJob(id).then((data) => setJob(data.job));
  }, [id]);

  const handleApply = async () => {
    setStatus("Submitting…");
    try {
      const token = await getToken();
      await api.applyToJob(id, {}, token);
      setApplied(true);
      setStatus("Applied ✅");
    } catch (err) {
      setStatus(err.message);
    }
  };

  if (!job) return <div className="max-w-[1100px] mx-auto px-10 py-12 text-slate">Loading…</div>;

  return (
    <div className="max-w-[1100px] mx-auto px-10 py-12">
      <div className="max-w-2xl bg-paper-raised border border-line rounded p-8">
        <div className="text-xs uppercase tracking-widest text-signal-deep font-bold mb-2">
          {job.company?.name}
        </div>
        <h3 className="text-2xl mb-2">{job.title}</h3>
        <div className="text-sm text-slate flex gap-3 mb-5">
          <span>{job.location}</span>
          <span className="font-mono text-[11px] uppercase border border-line rounded px-2 py-0.5">
            {job.level}
          </span>
          <span className="font-mono">${job.salary?.toLocaleString()}/yr</span>
        </div>
        <p className="text-sm leading-relaxed mb-6">{job.description}</p>

        <SignedIn>
          <button
            onClick={handleApply}
            disabled={applied}
            className="bg-signal text-ink font-bold text-xs uppercase tracking-wide px-6 py-3 rounded disabled:opacity-50"
          >
            {applied ? "Already applied" : "Apply now"}
          </button>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-signal text-ink font-bold text-xs uppercase tracking-wide px-6 py-3 rounded">
              Sign in to apply
            </button>
          </SignInButton>
        </SignedOut>

        {status && <p className="text-xs mt-3">{status}</p>}
      </div>
    </div>
  );
}
