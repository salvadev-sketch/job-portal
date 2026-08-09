import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/recruiter/Dashboard";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/recruiter/*" element={<RecruiterDashboard />} />
      </Routes>
      <footer className="border-t border-line px-10 py-8 text-center text-slate text-[11px] font-mono">
        © 2026 INSIDERJOBS
      </footer>
    </>
  );
}
