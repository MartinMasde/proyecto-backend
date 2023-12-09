
import express from 'express';
import { searchRepos } from '../controllers/searchReposController';
import { searchUsers } from '../controllers/searchUsersController';
import { getReposByUsername } from '../controllers/reposController';

const router = express.Router();

// GET ALL THE REPOS FROM A SPECIFIC USER
router.get('/repos/:username', getReposByUsername);
// GET ALL THE REPOS WITH THE REQUESTED REPO NAME
router.get('/search/repos', searchRepos);
// GET ALL THE USERS WITH THE REQUESTED USER NAME
router.get('/search/users', searchUsers);
    
export default router;