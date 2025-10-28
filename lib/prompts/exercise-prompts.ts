export const DIFFICULTY_PROMPTS = {
  easy: {
    description: "simple, everyday phrases",
    examples: "greetings, basic questions, common expressions",
    complexity: "short sentences (5-8 words)"
  },
  medium: {
    description: "moderate complexity sentences",
    examples: "descriptions, opinions, explanations",
    complexity: "medium sentences (8-15 words)"
  },
  hard: {
    description: "complex, nuanced sentences",
    examples: "abstract concepts, technical terms, idiomatic expressions",
    complexity: "long sentences (15+ words) with complex grammar"
  }
} as const;

export const SYSTEM_PROMPT = "You are a professional language teacher and translator. Generate accurate, culturally appropriate translation exercises.";

export function createExercisePrompt(
  baseLanguage: string,
  targetLanguage: string,
  difficulty: keyof typeof DIFFICULTY_PROMPTS,
  questionCount: number
): string {
  const difficultyConfig = DIFFICULTY_PROMPTS[difficulty];
  
  return `Generate ${questionCount} translation exercises from ${baseLanguage} to ${targetLanguage}.

Difficulty Level: ${difficulty}
Description: ${difficultyConfig.description}
Examples: ${difficultyConfig.examples}
Complexity: ${difficultyConfig.complexity}

Requirements:
- Each exercise should have a sentence in ${baseLanguage} to translate to ${targetLanguage}
- Provide the correct translation
- Ensure cultural accuracy and natural phrasing
- Vary the topics (greetings, daily life, work, travel, etc.)
- Make sure translations are idiomatic, not literal word-for-word

Return the response as a JSON array with this exact structure:
[
  {
    "id": 1,
    "baseLanguage": "${baseLanguage}",
    "targetLanguage": "${targetLanguage}",
    "sentence": "English sentence here",
    "correctAnswer": "Target language translation here",
    "difficulty": "${difficulty}",
    "category": "topic category"
  }
]`;
}

export const GRADING_SYSTEM_PROMPT = "You are a professional language teacher and translator. Provide detailed, constructive feedback on translation exercises.";

export function createGradingPrompt(
  question: {
    baseLanguage: string;
    targetLanguage: string;
    difficulty: string;
    sentence: string;
    correctAnswer: string;
  },
  userAnswer: string
): string {
  return `You are a professional language teacher grading a translation exercise.

EXERCISE DETAILS:
- Base Language: ${question.baseLanguage}
- Target Language: ${question.targetLanguage}
- Difficulty: ${question.difficulty}
- Original Sentence: "${question.sentence}"
- Correct Answer: "${question.correctAnswer}"
- Student's Answer: "${userAnswer}"

GRADING INSTRUCTIONS:
1. Score the translation from 0-100 based on accuracy, fluency, and cultural appropriateness
2. Determine if the answer is correct (score >= 80)
3. Identify specific phrases that need improvement only use the phrases portion of the response if there are any specific phrases that are incorrect, it should never be the entire sentence or a correct phrase in that section.
4. Provide explanations for each phrase comparison
5. Give overall feedback on the translation

RESPONSE FORMAT (return as JSON):
{
  "score": 85,
  "isCorrect": true,
  "overallFeedback": "Overall assessment of the translation with specific suggestions for improvement"
}

GRADING CRITERIA:
- Accuracy: How well does it convey the original meaning?
- Fluency: Does it sound natural in the target language?
- Grammar: Are there grammatical errors?
- Vocabulary: Is the word choice appropriate?
- Cultural Context: Does it respect cultural nuances?

Be encouraging but constructive in your feedback.`;
}
