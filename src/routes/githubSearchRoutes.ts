import express from 'express';
import { searchRepos } from '../controllers/searchReposController';
import { searchUsers } from '../controllers/searchUsersController';
import { getReposByUsername } from '../controllers/reposController';
import { getQueriesDB } from '../controllers/queryController';
import { deleteQueryDB } from '../controllers/deleteQueryController';
import { getQueryById } from '../controllers/queryIdController';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// GET ALL THE REPOS FROM A SPECIFIC USER - VALIDATE THE TOKEN AUTHENTICATION
router.get('/repos/:username'
,authMiddleware,
 getReposByUsername);
// GET ALL THE REPOS WITH THE REQUESTED REPO NAME - VALIDATE THE TOKEN AUTHENTICATION
router.get('/search/repos'
, authMiddleware
, searchRepos);
// GET ALL THE USERS WITH THE REQUESTED USER NAME - VALIDATE THE TOKEN AUTHENTICATION
router.get('/search/users'
, authMiddleware
, searchUsers);
// GET ALL THE QUERIES FROM THE DATABASE - VALIDATE THE TOKEN AUTHENTICATION
router.get('/queries'
, authMiddleware
, getQueriesDB);
// GET A QUERY FROM THE DATABASE BY ID
router.get('/queries/:id'
, authMiddleware
, getQueryById);
// DELETE A QUERY FROM THE DATABASE BY ID - VALIDATE THE TOKEN AUTHENTICATION
router.delete('/delete/:id'
, authMiddleware
, deleteQueryDB);
    
export default router;