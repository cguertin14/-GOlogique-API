import ActivityController from './../controllers/activityController';
import { bearer } from './../middlewares/authenticate';
import express from 'express';
import { body, check } from 'express-validator/check';
const router = express.Router();

router.get('/index', bearer, async (req, res) => {
    await new ActivityController(req, res).index();
});

router.put('/finish/:id', bearer, async (req, res) => {
    await new ActivityController(req, res).finish();
});

router.post('/generate', bearer, async (req, res) => {
    await new ActivityController(req, res).generate();
});

export default router;