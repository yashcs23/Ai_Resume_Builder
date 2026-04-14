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
  try {
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
      throw new Error("Failed to parse AI message");
    }

    return {
      professionalSummary: parsed.professionalSummary,
      experienceHighlights: parsed.experienceHighlights || [],
      optimizedResume: parsed.optimizedResume || {}
    };
  } catch (error) {
    console.warn("AI Generation failed. Falling back to mocked format. Error was:", error.message);
    // Provide visually appealing fallback data if OpenRouter fails with dummy key
    return {
      professionalSummary: "This is a dummy AI generated summary since the API key is not valid yet. The developer has a strong background in building scalable web applications with Node.js and React. Highly proficient in system design and responsive user interfaces.",
      experienceHighlights: [
        "Enhanced application performance by 30% through optimization",
        "Led a team of 4 front-end developers using agile methodologies.",
        "Engineered RESTful APIs utilized by over 10,000 daily active users."
      ],
      optimizedResume: {
        summary: "This is a dummy AI generated summary since the API key is not valid yet. The developer has a strong background in building scalable web applications with Node.js and React. Highly proficient in system design and responsive user interfaces.",
        skills: ["Mock AI Skill", "React.js", "Node.js", "System Architecture", "Performance Tuning"],
        experience: [
          "Developed high-throughput data processing service.",
          "Implemented responsive UI components using modern CSS.",
          "Reduced cloud infrastructure costs by 15%."
        ],
        projects: [
          "AI Resume Builder (Mock project entry)",
          "E-commerce scalable backend"
        ]
      }
    };
  }
};

module.exports = {
  generateResumeContent
};
