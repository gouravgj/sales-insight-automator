import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { analyzeSales } from "../controllers/analyzeController.js";

const router = express.Router();

/**
 * @swagger
 * /api/analyze:
 *   post:
 *     summary: Upload sales file and generate AI summary
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - email
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Summary generated successfully
 */

router.post("/analyze", upload.single("file"), analyzeSales);

export default router;
