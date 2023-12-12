import { Request, Response } from "express";
import { Octokit } from "octokit";
import Search from "../models/searchModel";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function searchUsers(req: Request, res: Response) {
  const { username } = req.query;

  try {
    if (!username || username?.length === 0) {
      return res
        .status(400)
        .json({ message: "The username field is required." });
    }
    const { data: users } = await octokit.rest.search.users({
      q: username as any,
    });

    const data = new Search({
        searchType: "users",
        queryOptions: {
            q: username,
            sort: req.query?.sort,
            order: req.query?.order,
            per_page: req.query?.per_page,
            page: req.query?.page,
        },
    });
    const dataToSave = await data.save();
    res.json(users);
    
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
