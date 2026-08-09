import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import JobRow from "../components/JobRow";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getJobs()
      .then((data) => setJobs(data.jobs || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${encodeURIComponent(search)}`);
  };

  return (
    <div>
      <div className="max-w-[1100px] mx-auto px-10 pt-16 pb-12 border-b border-line">
        <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-signal-deep font-bold mb-4 before:content-[''] before:w-5 before:h-px before:bg-signal-deep">
          Ledger №0847 — Open Roles
        </div>
        <h1 className="text-5xl leading-tight max-w-2xl mb-4">Every open role, filed and dated.</h1>
        <p className="text-slate max-w-md mb-8">
          Search open positions the way a hiring desk actually tracks them — indexed, timestamped, no noise.
        </p>

        <form onSubmit={handleSearch} className="flex border border-ink rounded max-w-xl overflow-hidden bg-paper-raised">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Role, e.g. Cloud Engineer"
            className="flex-1 px-4 py-4 text-sm outline-none"
          />
          <button className="bg-signal text-ink font-bold text-xs uppercase tracking-wide px-6">
            Search
          </button>
        </form>
      </div>

      <div className="max-w-[1100px] mx-auto px-10 py-12">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl">Latest filings</h2>
          <span className="font-mono text-slate text-xs uppercase">Sorted by date desc</span>
        </div>

        {loading && <p className="text-slate">Loading jobs…</p>}
        {error && <p className="text-reject text-sm">{error} — is the backend running?</p>}

        <div>
          {jobs.map((job, i) => (
            <JobRow key={job._id} job={job} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
