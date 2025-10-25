'use server';

import { openai } from '@/lib/openai/client';
import { createExercisePrompt, SYSTEM_PROMPT, createGradingPrompt, GRADING_SYSTEM_PROMPT } from '@/lib/prompts/exercise-prompts';




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
  phrases: {
    userPhrase:  string;
    correctPhrase: string;
    explanation: string;
  }[];
  overallFeedback: string;
}
export async function gradeTranslation(question: TranslationQuestion, userAnswer: string): Promise<{ feedback: TranslationFeedback, error: string | null }>  {
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
        !Array.isArray(feedback.phrases) || 
        typeof feedback.overallFeedback !== 'string') {
      return { feedback: {} as TranslationFeedback, error: 'Invalid response format from OpenAI' };
    }

    console.log(feedback);

    return { feedback, error: null };

    
}