import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
import JobRow from "../components/JobRow";

export default function Jobs() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .getJobs(search ? { search } : {})
      .then((data) => setJobs(data.jobs || []))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="max-w-[1100px] mx-auto px-10 py-12">
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="text-2xl">{search ? `Results for "${search}"` : "All listings"}</h2>
        <span className="font-mono text-slate text-xs uppercase">{jobs.length} roles</span>
      </div>

      {loading && <p className="text-slate">Loading…</p>}
      {!loading && jobs.length === 0 && <p className="text-slate">No jobs found.</p>}

      <div>
        {jobs.map((job, i) => (
          <JobRow key={job._id} job={job} index={i} />
        ))}
      </div>
    </div>
  );
}
