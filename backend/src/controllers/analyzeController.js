import { parseFile } from "../services/fileParser.js";
import { generateSummary } from "../services/aiService.js";
import { sendEmail } from "../services/emailService.js";

export const analyzeSales = async (req, res) => {
  try {
    const file = req.file;
    const email = req.body.email;

    const data = await parseFile(file);

    const summary = await generateSummary(data);

    await sendEmail(email, summary);

    res.json({
      message: "Report generated and emailed",
      summary,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
