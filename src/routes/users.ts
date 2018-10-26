import express, { Router } from 'express';
const router = express.Router();

router.put('/register', (req: express.Request, res: express.Response) => {
  res.sendStatus(200);
});

export const users: Router = router;
