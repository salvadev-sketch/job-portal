import "dotenv/config";
import connectDB from "../config/db.js";
import Job from "../models/Job.js";

const sampleJobs = [
  {
    title: "Cloud Engineer",
    description: "Design and manage our cloud infrastructure across AWS, Azure, and GCP.",
    company: { name: "Google", logo: "" },
    category: "Programming",
    location: "Hyderabad",
    level: "Intermediate level",
    salary: 102000,
    recruiterId: "seed_recruiter_1",
  },
  {
    title: "Network Security Engineer",
    description: "Protect our IT infrastructure and design security measures.",
    company: { name: "Google", logo: "" },
    category: "Cybersecurity",
    location: "Bangalore",
    level: "Senior level",
    salary: 118000,
    recruiterId: "seed_recruiter_1",
  },
  {
    title: "Software Tester",
    description: "Design test cases and ensure the quality of our software applications.",
    company: { name: "Google", logo: "" },
    category: "Programming",
    location: "Chennai",
    level: "Intermediate level",
    salary: 86000,
    recruiterId: "seed_recruiter_1",
  },
  {
    title: "Graphic Designer",
    description: "Create visually appealing graphics and layouts that enhance our brand.",
    company: { name: "Google", logo: "" },
    category: "Designing",
    location: "Chennai",
    level: "Beginner level",
    salary: 72000,
    recruiterId: "seed_recruiter_1",
  },
];

const run = async () => {
  await connectDB();
  await Job.deleteMany({});
  await Job.insertMany(sampleJobs);
  console.log(`Seeded ${sampleJobs.length} jobs`);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
