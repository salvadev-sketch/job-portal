const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }
  return data;
}

export const api = {
  // Public
  getJobs: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/jobs${qs ? `?${qs}` : ""}`);
  },
  getJob: (id) => request(`/jobs/${id}`),
  applyToJob: (id, payload, token) => request(`/jobs/${id}/apply`, { method: "POST", body: payload, token }),

  // Applicant (auth required)
  getMyApplications: (token) => request("/user/applications", { token }),

  // Recruiter (auth + recruiter role required)
  getRecruiterJobs: (token) => request("/recruiter/jobs", { token }),
  addJob: (payload, token) => request("/recruiter/jobs", { method: "POST", body: payload, token }),
  updateJob: (id, payload, token) => request(`/recruiter/jobs/${id}`, { method: "PATCH", body: payload, token }),
  getRecruiterApplications: (token) => request("/recruiter/applications", { token }),
  updateApplication: (id, status, token) =>
    request(`/recruiter/applications/${id}`, { method: "PATCH", body: { status }, token }),
};
