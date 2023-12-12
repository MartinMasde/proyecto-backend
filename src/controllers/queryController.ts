
import { Request, Response } from 'express';
import { Octokit } from "octokit";
import Search from '../models/searchModel';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function getQueriesDB(req: Request, res: Response) {

  try {
    const data = await Search.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}