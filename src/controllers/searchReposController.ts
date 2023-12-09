import { Request, Response } from "express";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function searchRepos(req: Request, res: Response) {
  const { repoName } = req.query;

  try {
    if (!repoName || repoName?.length === 0) {
      return res
        .status(400)
        .json({ message: "The repoName field is required." });
    }
    const { data: repos } = await octokit.rest.search.repos({
      q: repoName as any,
    });
    res.json(repos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
