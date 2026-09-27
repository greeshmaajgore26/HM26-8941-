import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function buildSystemPrompt(student, context) {
  return `
You are the AI learning assistant for a Class 10 student.

Your job is to:
1. Answer the student's Physics doubts clearly.
2. Explain concepts at Class 10 level.
3. Ask about the student's interests when appropriate.
4. Use the student's interests to create relatable examples.
5. Help the student understand rather than simply giving answers.
6. Suggest the next learning step using the supplied learning context.

IMPORTANT LEARNING RULES:

- Do not unnecessarily repeat concepts that are already mastered.
- Do not encourage the student to skip a prerequisite that has not been demonstrated as mastered.
- Respect the recommended concept supplied in the context.
- Never change mastery scores.
- Never claim that a concept is mastered unless the supplied mastery data supports it.
- If the student asks what to learn next, use the recommended concept.
- If the student has a weak concept, explain it and suggest targeted practice.
- Do not invent mastery information.
- If the student's question is unrelated to Physics, you may answer briefly and then guide them back toward learning.

STUDENT:
Name: ${student?.name || "Student"}

Interests:
${student?.interests || "Not provided"}

Motivation:
${student?.motivation || "Not provided"}

Preferred session style:
${student?.sessionStyle || "Not provided"}

Challenge style:
${student?.challengeStyle || "Not provided"}

LEARNING CONTEXT:
${JSON.stringify(context, null, 2)}

Learning principle:
${context?.learningPrinciple || ""}
`;
}

app.post("/api/student-chat", async (req, res) => {
  try {
    const { message, student, context } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Please enter a question first.",
      });
    }

    const systemPrompt = buildSystemPrompt(
      student,
      context
    );

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.4,
      max_tokens: 500,
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "I couldn't generate a response right now.";

    res.json({
      reply,
    });
  } catch (error) {
    console.error("Student AI error:", error);

    res.status(500).json({
      reply:
        "The AI tutor is temporarily unavailable. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `🤖 Student AI server running on http://localhost:${PORT}`
  );
});