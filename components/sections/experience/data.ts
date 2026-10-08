export type Job = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  bullets: string[];
};

export const JOBS: Job[] = [
  {
    id: "Francisco's Roofing Inc",
    company: "Francisco's Roofing Inc.",
    role: "Freelance Web Developer",
    start: "Jan 2025",
    end: "Jun 2026",
    bullets: [
      "Rebuilt the company website from a static HTML/CSS site to a Next.js, TypeScript, and Supabase application, growing traffic to 730+ monthly visitors (as of Oct 2026) with 300+ arriving from Google Search.",
      "Built service pages with dynamic routing and a contact form validated with React Hook Form and Zod, 248 visitors reach the contact page (34% of all visitors).",
      "Added an owner-only admin portal on Supabase Auth behind a protected route group, letting staff manage project photos without developer involvement.",
    ],
  },
];
