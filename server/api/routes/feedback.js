import FeedbackController from './../controllers/feedbackController';
import { bearer } from './../middlewares/authenticate';
import express from 'express';
const router = express.Router();

router.post('/store', bearer, async (req, res) => {
    await new FeedbackController(req, res).store();
});

export default router;