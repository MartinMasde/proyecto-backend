import { Request, Response } from "express";
import { Octokit } from "octokit";
import Search from "../models/searchModel";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function searchUsers(req: Request, res: Response) {
  const { username } = req.query;
  const { page, per_page, start_index } = req.query;

  
  //modifica la hora de un registro que ya esta en la BD y lo busco nuevamente
  let modifayResponse;
  try {
        modifayResponse = await Search.updateOne(
        { searchType:"users", queryOptions: { q: username}}, 
        { $set: {date: new Date()}}
        );
      } catch (error) {
        res.send('Query not found in the database');
        console.log(error + "Error when searching.");
        return;
  }

  try {
    if (!username || username?.length === 0) {
      return res
        .status(400)
        .json({ message: "The username field is required." });
    }

    
    const searchOptions: any = {
      q: username,
      sort: req.query?.sort,
      order: req.query?.order,
      per_page: per_page || 30,
      page: req.query?.page,
    };

    if (start_index) {
      const startIndex = Number(start_index);
      searchOptions.page = Math.floor(startIndex / searchOptions.per_page) + 1;
    }

     const { data: users } = await octokit.rest.search.users(searchOptions);

    const data = new Search({
        searchType: "users",
        queryOptions: searchOptions,
    });

    // si no modifica un registro, lo crea
    if(modifayResponse && modifayResponse.modifiedCount === 0){
      const dataToSave = await data.save();
    }
    res.json(users);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// import { Request, Response } from "express";
// import { Octokit } from "octokit";
// import Search from "../models/searchModel";

// const octokit = new Octokit({
//   auth: process.env.GITHUB_TOKEN || "",
// });

// export async function searchUsers(req: Request, res: Response) {
//   const { username } = req.query;
  
//   //modifica la hora de un registro que ya esta en la BD y lo busco nuevamente
//   let modifayResponse;
//   try {
//         modifayResponse = await Search.updateOne(
//         {searchType:"users", queryOptions: { q: username}}, 
//         {$set: {date: new Date()}}
//         );
//         console.log("buscando", modifayResponse)
//       } catch (error) {
//         console.log(error + "Error when searching.")
//   }

//   try {
//     if (!username || username?.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "The username field is required." });
//     }
//     const { data: users } = await octokit.rest.search.users({
//       q: username as any,
//     });

//     const data = new Search({
//         searchType: "users",
//         queryOptions: {
//             q: username,
//             sort: req.query?.sort,
//             order: req.query?.order,
//             per_page: req.query?.per_page,
//             page: req.query?.page,
//         },
//     });
//     // si no modifica un registro, lo crea
//     if(modifayResponse && modifayResponse.modifiedCount === 0){
//       const dataToSave = await data.save();
//     }
//     res.json(users);
    
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }