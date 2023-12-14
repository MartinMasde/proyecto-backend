import { Octokit } from "octokit";
import { Request, Response } from "express";
import Search from "../models/searchModel";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function getQueryById(req: Request, res: Response) {
  
  try {
    const response = await Search.findById(req.params.id);
    res.json({ response });

  } catch (error: any) {
    res.status(500).json({ message: "No se encuentra el ID a borrar" });
  }
}
