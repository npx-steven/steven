import { getContributionCalendar } from "./data";
import ContributionGraph from "./contribution-graph";

async function GithubActivity() {
  // If getContributionCalendar fails, the github section doesn't render
  const calendar = await getContributionCalendar();
  if (!calendar) return null;

  return (
    <section
      className="content flex flex-col gap-6 mb-8"
      aria-labelledby="github-heading"
    >
      <h2
        id="github-heading"
        className="font-sans text-sm font-medium tracking-widest text-muted dark:text-faint"
      >
        GITHUB ACTIVITY
      </h2>
      <ContributionGraph calendar={calendar} />
    </section>
  );
}

export default GithubActivity;
