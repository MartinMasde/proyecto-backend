
import express from 'express';
import { searchRepos } from '../controllers/searchReposController';
import { searchUsers } from '../controllers/searchUsersController';
import { getReposByUsername } from '../controllers/reposController';
import { getQueriesDB } from '../controllers/queryController';

const router = express.Router();

// GET ALL THE REPOS FROM A SPECIFIC USER
router.get('/repos/:username', getReposByUsername);
// GET ALL THE REPOS WITH THE REQUESTED REPO NAME
router.get('/search/repos', searchRepos);
// GET ALL THE USERS WITH THE REQUESTED USER NAME
router.get('/search/users', searchUsers);
// GET ALL THE QUERIES FROM THE DATABASE
router.get('/queries', getQueriesDB);

    
export default router;