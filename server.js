import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Test route (optional, helps debugging)
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});