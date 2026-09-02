import express from 'express';
import { signup, signin, signOut, gitHubLogin, gitHubCallback, googleLogin, googleCallback } from '#controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', signup);

router.post('/sign-in', signin);

router.post('/sign-out', signOut);

router.get('/github/login', gitHubLogin);

router.get('/github/callback', gitHubCallback);

router.get('/google/login', googleLogin);

router.get('/google/callback', googleCallback);

export default router;
