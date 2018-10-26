import express, { Router } from 'express';
import { users } from './users';

const router = express.Router();

router.use('/users', users);

export const index: Router = router;
