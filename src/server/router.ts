import express from 'express';
const router = express.Router();

import preference from './routes/perference';

router.use('/perference', preference)

export default router;