'use server';

import { openai } from '@/lib/openai/client';
import { createExercisePrompt, SYSTEM_PROMPT, createGradingPrompt, GRADING_SYSTEM_PROMPT } from '@/lib/prompts/exercise-prompts';
import { db } from '../db';
import { completedExercises } from '../db/schema';
import { auth } from '../auth';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';




export type TranslationQuestion = {
  id: number;
  baseLanguage: string;
  targetLanguage: string;
  sentence: string;
  correctAnswer: string;
  difficulty: string;
  category: string;
}

export async function generateTranslationExercises(
  baseLanguage: string,
  targetLanguage: string,
  difficulty: string,
  questionCount: number = 5
): Promise<{ exercises: TranslationQuestion[], error: string | null }> {
  const prompt = createExercisePrompt(
    baseLanguage,
    targetLanguage,
    difficulty as 'easy' | 'medium' | 'hard',
    questionCount
  );

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const responseText = completion.choices[0]?.message?.content;
  if (!responseText) return { exercises: [], error: 'No response from OpenAI' };
  const exercises = JSON.parse(responseText);


  console.log(exercises);


  return { exercises, error: null };


}



export type TranslationFeedback = {
  score: number;
  isCorrect: boolean;
  overallFeedback: string;
}
export async function gradeTranslation(question: TranslationQuestion, userAnswer: string): Promise<{ feedback: TranslationFeedback, error: string | null }> {
  const prompt = createGradingPrompt(question, userAnswer);

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: GRADING_SYSTEM_PROMPT
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 1500,
  });

  const responseText = completion.choices[0]?.message?.content;
  if (!responseText) return { feedback: {} as TranslationFeedback, error: 'No response from OpenAI' };

  const feedback = JSON.parse(responseText) as TranslationFeedback;

  // Validate the response structure
  if (typeof feedback.score !== 'number' ||
    typeof feedback.isCorrect !== 'boolean' ||
    typeof feedback.overallFeedback !== 'string') {
    return { feedback: {} as TranslationFeedback, error: 'Invalid response format from OpenAI' };
  }

  console.log(feedback);

  return { feedback, error: null };


}



export async function saveCompletedTranslationExercise({ baseLanguage, targetLanguage, difficulty, questions, score, elapsedTime, userId }: { baseLanguage: string, targetLanguage: string, difficulty: string, questions: number, score: number, elapsedTime: number, userId: string }): Promise<{ error: string | null }> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !(session.user.id === userId)) return { error: 'Unauthorized' };




    await db.insert(completedExercises).values({
      id: crypto.randomUUID(),
      baseLanguage,
      targetLanguage,
      difficulty,
      questions,
      score,
      elapsedTime,
      date: new Date(),
      userId,
      exerciseType: 'translation',
    });
    return { error: null };
  } catch (error) {
    console.error('Error saving exercise:', error);
    return { error: 'Failed to save exercise' };
  }
}



export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface Passage {
  title: string
  difficulty: string
  language: string
  content: string
  questions: Question[]
}

export async function saveCompletedReadingComprehensionExercise({ passage, score, elapsedTime, userId }: { passage: Passage, score: number, elapsedTime: number, userId: string }): Promise<{ error: string | null }> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !(session.user.id === userId)) return { error: 'Unauthorized' };
    await db.insert(completedExercises).values({
      id: crypto.randomUUID(),
      date: new Date(),
      userId,
      exerciseType: 'reading_comprehension',
      baseLanguage: passage.language,
      targetLanguage: passage.language,
      difficulty: passage.difficulty,
      questions: passage.questions.length,
      score,
      elapsedTime,
    });
    return { error: null };
  }
  catch (error) {
    console.error('Error saving exercise:', error);
    return { error: 'Failed to save exercise' };
  }
}



type CompletedExercise = {
  id: string;
  date: Date;
  userId: string;
  exerciseType: string;
  baseLanguage: string;
  targetLanguage: string;
  difficulty: string;
  questions: number;
  score: number;
  elapsedTime: number;
  createdAt: Date;
  updatedAt: Date;
}
export async function getAllExercises(userId: string): Promise<{ exercises: CompletedExercise[], error: string | null }> {
  try {
    const exercises = await db.select().from(completedExercises).where(eq(completedExercises.userId, userId));
    return { exercises, error: null };
  }
  catch (error) {
    console.error('Error getting exercises:', error);
    return { exercises: [] , error: 'Failed to get exercises' };
  }
}