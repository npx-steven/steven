import Marquee from "./marquee";

function Projects() {
  return (
    <section
      className="flex flex-col gap-6 pb-8 mb-8"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className="content font-sans text-sm font-medium tracking-widest text-muted dark:text-faint"
      >
        PROJECTS
      </h2>
      <Marquee />
    </section>
  );
}

export default Projects;
