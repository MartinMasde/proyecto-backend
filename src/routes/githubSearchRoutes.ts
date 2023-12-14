import express from 'express';
import { searchRepos } from '../controllers/searchReposController';
import { searchUsers } from '../controllers/searchUsersController';
import { getReposByUsername } from '../controllers/reposController';
import { getQueriesDB } from '../controllers/queryController';
import { deleteQueryDB } from '../controllers/deleteQueryController';
import { getQueryById } from '../controllers/queryIdController';

const router = express.Router();

// GET ALL THE REPOS FROM A SPECIFIC USER
router.get('/repos/:username', getReposByUsername);
// GET ALL THE REPOS WITH THE REQUESTED REPO NAME
router.get('/search/repos', searchRepos);
// GET ALL THE USERS WITH THE REQUESTED USER NAME
router.get('/search/users', searchUsers);
// GET ALL THE QUERIES FROM THE DATABASE
router.get('/queries', getQueriesDB);
// GET A QUERY FROM THE DATABASE BY ID
router.get('/queries/:id', getQueryById);
// crear ruta para borrar un query de la base de datos
router.delete('/delete/:id', deleteQueryDB);


    
export default router;