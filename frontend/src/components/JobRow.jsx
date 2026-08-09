import { Link } from "react-router-dom";

export default function JobRow({ job, index }) {
  return (
    <Link
      to={`/jobs/${job._id}`}
      className="grid grid-cols-[34px_1fr_auto] md:grid-cols-[34px_1fr_auto] items-center gap-5 py-5 border-b border-line hover:bg-white/50"
    >
      <div className="font-mono text-slate text-sm">{String(index + 1).padStart(2, "0")}</div>
      <div>
        <div className="text-lg font-display font-semibold mb-1">{job.title}</div>
        <div className="text-sm text-slate flex gap-3 flex-wrap">
          <span>{job.company?.name}</span>
          <span>{job.location}</span>
          <span className="font-mono text-[11px] uppercase border border-line rounded px-2 py-0.5 text-ink-soft">
            {job.level}
          </span>
        </div>
      </div>
      <div className="font-mono text-sm text-right">${job.salary?.toLocaleString()}/yr</div>
    </Link>
  );
}
