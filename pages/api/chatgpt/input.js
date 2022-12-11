// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ChatGPTAPI } from "chatgpt";

export default async function handler(req, res) {
  const { title } = req.body;

  if (!title) return res.status(400).json({ error: "title is required" });

  const message = `I have a video for youtube titled "${title}"
can you give me a prompt for stable difussion to generate the thumbnail background image ?`;

  const api = new ChatGPTAPI({
    sessionToken: process.env.SESSION_TOKEN,
    markdown: false,
  });

  // ensure the API is properly authenticated
  const ensureAuth = await api.ensureAuth();

  // send a message and wait for the response
  const response = await api.sendMessage(message);
  //search for the first ":" in the response and return the text after it
  const index = response.indexOf(":");
  const prompt = response.substring(index + 1);

  res.status(200).json(prompt);
}
