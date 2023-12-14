import { Request, Response } from "express";
import { Octokit } from "octokit";
import Search from "../models/searchModel";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function searchRepos(req: Request, res: Response) {
  const { repoName } = req.query;

  //modifica la hora de un registro que ya esta en la BD y lo busco nuevamente
  let modifayResponse;
  try {
        modifayResponse = await Search.updateOne(
        {searchType:"repos", queryOptions: { q: repoName}}, 
        {$set: {date: new Date()}}
        );
        // console.log("buscando", modifayResponse)
      } catch (error) {
        res.send('Query not found in the database');
        // console.log(error + "error al buscar")
  }

  try {
    if (!repoName || repoName?.length === 0) {
      return res
        .status(400)
        .json({ message: "The repoName field is required." });
    }
    const { data: repos } = await octokit.rest.search.repos({
      q: repoName as any,
    }); 

    const data = new Search({
      searchType: "repos",
      queryOptions: {
        q: repoName,
        sort: req.query?.sort,
        order: req.query?.order,
        per_page: req.query?.per_page,
        page: req.query?.page,
      },
    });
    // si no modifica un registro, lo crea
    if(modifayResponse && modifayResponse.modifiedCount === 0){
      const dataToSave = await data.save();
    }
    res.json(repos);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
