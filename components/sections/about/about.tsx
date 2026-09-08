import BlurText from "@/components/ui/blur-text";
import TeckStack from "./tech-stack";

const BIO =
  "I'm a software engineer with a B.S. in Computer Science. I'm most interested in building alongside a team on software at real scale, where the constraints are tighter and the problems are the kind I haven't run into yet.";

const INTEREST =
  "Outside of software development I enjoy building PCs and keeping up with the newest hardware, playing video games, and falling down the occasional rabbit hole. I like picking up something unfamiliar and staying with it long enough to get decent at it.";

function About() {
  return (
    <section className="content flex flex-col mb-8">
      <div className="flex flex-col gap-3 mb-6">
        <h2 className="font-sans text-sm font-medium tracking-widest text-muted dark:text-faint">
          ABOUT ME
        </h2>
        <BlurText
          text={BIO}
          delay={0}
          sweep={1.2}
          duration={0.5}
          className="text-base/relaxed text-wrap md:text-pretty"
        />
      </div>
      <TeckStack />
      <BlurText
        delay={0}
        sweep={1.2}
        duration={0.5}
        text={INTEREST}
        className="text-base/relaxed text-wrap md:text-pretty my-6"
      />
    </section>
  );
}

export default About;
