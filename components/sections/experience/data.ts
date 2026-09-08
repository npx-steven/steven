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
    start: "Dec 2022",
    end: "Present",
    bullets: [
      "Rebuilt the company website from a static HTML/CSS site to a Next.js, TypeScript, and Supabase application, growing traffic to 450+ monthly visitors with 170+ arriving from Google Search.",
      "Built service pages with dynamic routing and a contact form validated with React Hook Form and Zod, reaching 126 monthly contact-page visits — 28% of all site visitors.",
      "Added an owner-only admin portal on Supabase Auth behind a protected route group, letting staff manage project photos without developer involvement.",
    ],
  },
];
