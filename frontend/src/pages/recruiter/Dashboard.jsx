import { Link, Routes, Route, useLocation } from "react-router-dom";
import AddJob from "./AddJob";
import ManageJobs from "./ManageJobs";
import ViewApplications from "./ViewApplications";

export default function RecruiterDashboard() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block py-2.5 border-b border-line font-semibold ${
      pathname === path ? "text-signal-deep" : "text-slate"
    }`;

  return (
    <div className="max-w-[1100px] mx-auto px-10 py-12 grid grid-cols-[190px_1fr] gap-14">
      <nav className="text-sm">
        <Link to="/recruiter" className={linkClass("/recruiter")}>＋ Add role</Link>
        <Link to="/recruiter/manage" className={linkClass("/recruiter/manage")}>Manage roles</Link>
        <Link to="/recruiter/applications" className={linkClass("/recruiter/applications")}>View applicants</Link>
      </nav>
      <Routes>
        <Route index element={<AddJob />} />
        <Route path="manage" element={<ManageJobs />} />
        <Route path="applications" element={<ViewApplications />} />
      </Routes>
    </div>
  );
}
