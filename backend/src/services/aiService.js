import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateSummary = async (data) => {
  const prompt = `
Analyze this sales dataset and produce a short business summary.

Sample data:
${JSON.stringify(data.slice(0, 5))}
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    },
  );

  return response.data.candidates[0].content.parts[0].text;
};
