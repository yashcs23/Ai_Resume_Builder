const getOpenAiClient = require('../config/openai');

const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const buildPrompt = (data) => `
You are an expert technical resume writer. Given the user's raw resume information below, rewrite it into a concise, modern, ATS-friendly resume.

Return ONLY valid JSON with the following shape:
{
  "professionalSummary": "2-3 sentences about the candidate",
  "experienceHighlights": ["bullet", "bullet"],
  "optimizedResume": {
    "summary": "rewritten summary",
    "skills": ["skill"],
    "experience": ["bullet"],
    "projects": ["bullet"]
  }
}

Raw user data:
${JSON.stringify(data)}
`;

const parseJson = (text) => {
  try {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    const jsonString = start >= 0 && end >= 0 ? text.slice(start, end + 1) : text;
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Failed to parse AI response, returning fallback.', error);
    return null;
  }
};

const generateResumeContent = async (payload) => {
  const openai = getOpenAiClient();

  const completion = await openai.chat.completions.create({
    model: DEFAULT_MODEL,
    temperature: 0.4,
    messages: [
      {
        role: 'system',
        content: 'You craft professional, concise resumes for software roles.'
      },
      {
        role: 'user',
        content: buildPrompt(payload)
      }
    ]
  });

  const aiMessage = completion.choices?.[0]?.message?.content || '';
  const parsed = parseJson(aiMessage);

  if (!parsed) {
    return {
      professionalSummary: 'Professional summary will be available soon.',
      experienceHighlights: [],
      optimizedResume: {}
    };
  }

  return {
    professionalSummary: parsed.professionalSummary,
    experienceHighlights: parsed.experienceHighlights || [],
    optimizedResume: parsed.optimizedResume || {}
  };
};

module.exports = {
  generateResumeContent
};