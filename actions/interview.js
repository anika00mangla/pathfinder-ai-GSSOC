"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export async function generateQuiz(category = "Technical") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");

  const normalizedSkills = user.skills
    ? Array.from(new Set(user.skills.map((s) => String(s).trim()).filter(Boolean)))
    : [];

  const categoryPrompts = {
    Technical: `Generate 10 technical interview questions for a ${user.industry} professional${
      normalizedSkills.length ? ` with expertise in ${normalizedSkills.join(", ")}` : ""
    }. Focus on programming concepts, data structures, algorithms, and technical knowledge.`,
    Behavioral: `Generate 10 behavioral interview questions for a ${user.industry} professional${
      normalizedSkills.length ? ` with expertise in ${normalizedSkills.join(", ")}` : ""
    }. Focus on teamwork, leadership, conflict resolution, communication, and past experiences. Use scenarios like "Tell me about a time when..." or "How would you handle..."`,
    Situational: `Generate 10 situational interview questions for a ${user.industry} professional${
      normalizedSkills.length ? ` with expertise in ${normalizedSkills.join(", ")}` : ""
    }. Focus on hypothetical workplace scenarios — how the candidate would handle specific on-the-job situations, ethical dilemmas, and decision-making.`,
  };

  const categoryIntro = categoryPrompts[category] || categoryPrompts.Technical;

  const prompt = `
    ${categoryIntro}
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz = JSON.parse(cleanedText);

    return quiz.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz questions");
  }
}

export async function saveQuizResult(questions, answers, score, category = "Technical") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const sanitizedAnswers = Array.isArray(answers) ? answers.slice(0, questions.length) : [];
  while (sanitizedAnswers.length < questions.length) sanitizedAnswers.push(null);

  const questionMap = new Map();
  questions.forEach((q, index) => {
    const key = String(q.question).trim();
    if (!questionMap.has(key)) {
      questionMap.set(key, {
        question: key,
        answer: q.correctAnswer,
        userAnswer: sanitizedAnswers[index],
        isCorrect: q.correctAnswer === sanitizedAnswers[index],
        explanation: q.explanation,
      });
    }
  });

  const questionResults = Array.from(questionMap.values());

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      const tipResult = await model.generateContent(improvementPrompt);

      improvementTip = tipResult.response.text().trim();
      console.log(improvementTip);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category,
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}

export async function getAssessment(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const assessment = await db.assessment.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!assessment) throw new Error("Assessment not found");

    return assessment;
  } catch (error) {
    console.error("Error fetching assessment:", error);
    throw new Error("Failed to fetch assessment");
  }
}