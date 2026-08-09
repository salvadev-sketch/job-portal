import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { api } from "../../lib/api";

export default function AddJob() {
  const { getToken } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "Programming",
    level: "Intermediate level",
    salary: "",
    company: { name: "" },
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Filing…");
    try {
      const token = await getToken();
      await api.addJob({ ...form, salary: Number(form.salary) }, token);
      setStatus("Role filed ✅");
      setForm({ title: "", description: "", location: "", category: "Programming", level: "Intermediate level", salary: "", company: { name: "" } });
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-6">File a new role</h2>
      <form onSubmit={handleSubmit} className="grid gap-3 max-w-lg">
        <input
          placeholder="Job title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border border-line rounded p-3 text-sm"
          required
        />
        <input
          placeholder="Company name"
          value={form.company.name}
          onChange={(e) => setForm({ ...form, company: { name: e.target.value } })}
          className="border border-line rounded p-3 text-sm"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border border-line rounded p-3 text-sm"
          rows={3}
          required
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="border border-line rounded p-3 text-sm"
          required
        />
        <input
          placeholder="Salary (annual)"
          type="number"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          className="border border-line rounded p-3 text-sm"
          required
        />
        <button className="bg-ink text-paper font-bold text-xs uppercase tracking-wide px-6 py-3 rounded w-fit">
          File role
        </button>
        {status && <p className="text-xs">{status}</p>}
      </form>
    </div>
  );
}
