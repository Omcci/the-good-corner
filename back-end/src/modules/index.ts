import { Router } from "express";
const router = Router();
import { router as adsRouter } from './ads';

router.use("/ads", adsRouter);

export { router };