const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post("/", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a smart AI Travel Assistant. Answer ONLY questions related to travel, itinerary planning, weather, costs, hotels, flights, and tourism. If asked about unrelated topics, politely guide the user back to travel planning.",
                },
                { role: "user", content: message },
            ],
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (err) {
        console.error("Chat API error:", err.message);
        res.status(500).json({ error: "Chatbot failed" });
    }
});

module.exports = router;