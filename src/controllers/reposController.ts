
import { Request, Response } from 'express';
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function getReposByUsername(req: Request, res: Response) {
  const username = req.params.username;

  try {
    const { data: repos } = await octokit.rest.repos.listForUser({ username });
    res.json(repos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}