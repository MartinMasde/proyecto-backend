import { Request, Response } from 'express';
import { Octokit } from "octokit";
import Search from '../models/searchModel';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function getReposByUsername(req: Request, res: Response) {
  const username = req.params.username;

    //modifica la hora de un registro que ya esta en la BD y lo busco nuevamente
    let modifayResponse;
    try {
          modifayResponse = await Search.updateOne(
          {searchType:"users", queryOptions: { q: username}}, 
          {$set: {date: new Date()}}
          );
          res.send('Query updated in the database');
          // console.log("buscando", modifayResponse)
        } catch (error) {
          res.send('Query not found in the database');
          // console.log(error + "error al buscar")
    }

  try {
    if (!username || username?.length === 0) {
      return res
        .status(400)
        .json({ message: "The username field is required." });
    }
    const { data: users } = await octokit.rest.repos.listForUser({ username });
    res.json(users);

    const data = new Search({
      searchType: "users",
      queryOptions: {
        username,
        sort: req.query?.sort,
        order: req.query?.order,
        per_page: req.query?.per_page,
        page: req.query?.page,
      },
    });
       // si no modifica un registro, lo crea
    if(modifayResponse && modifayResponse.modifiedCount === 0){
        const dataToSave = await data.save();
        res.send('Query saved in the database');
      }
    res.json(users);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}