import About from "@/components/sections/about/about";
import Experience from "@/components/sections/experience/experience";
import Github from "@/components/sections/github/github";
import Header from "@/components/sections/header/header";
import Projects from "@/components/sections/projects/projects";

export default function Home() {
  return (
    <main>
      <Header />
      <About />
      <Experience />
      <Projects />
      <Github />
    </main>
  );
}
