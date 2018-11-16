import express, { Router } from 'express';
import { users } from './users';
import { tweets } from './tweets';

const router = express.Router();

router.use('/users', users);
router.use('/tweets', tweets);

export const index: Router = router;
