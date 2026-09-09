export type Project = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
  repo?: string;
  live?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "Francisco's Roofing",
    title: "Francisco's Roofing Inc.",
    date: "Dec 2022",
    description:
      "Public marketing site for a local roofing contractor, with an owner-managed project gallery.",
    image: "/public/projects/franciscos_roofing_inc.png",
    tags: ["TypeScript", "Supabase", "Next.js"],
    repo: "https://github.com/npx-steven/franciscosroofinginc-website",
    live: "https://franciscosroofinginc.co/",
  },
  {
    id: "Siteline",
    title: "Siteline",
    date: "May 2026",
    description:
      "Multi-tenant PWA that keeps job site photos and documents filed per project, by GPS.",
    image: "/public/projects/siteline.png",
    tags: ["TypeScript", "Supabase", "Next.js"],
    repo: "https://github.com/npx-steven/siteline",
    live: "https://siteline-alpha.vercel.app/projects",
  },
];
