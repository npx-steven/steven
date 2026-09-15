import "server-only";
import type { ContributionCalendar } from "./types";

const GITHUB_LOGIN = "npx-steven";

//My query format github graphql will return back
const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export async function getContributionCalendar(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("GITHUB_TOKEN is not set; skipping GitHub activity.");
    return null;
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: GITHUB_LOGIN },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`GitHub GraphQL request failed: ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.error("GitHub GraphQL errors:", json.errors);
      return null;
    }

    return (
      json.data?.user?.contributionsCollection.contributionCalendar ?? null
    );
  } catch (err) {
    console.error("GitHub GraphQL request threw:", err);
    return null;
  }
}
