const getOpenAiClient = require('../config/openai');

const getDefaultModel = (provider) => {
  if (process.env.OPENAI_MODEL) {
    return process.env.OPENAI_MODEL;
  }

  if (provider === 'openrouter') {
    return 'openai/gpt-4o-mini';
  }

  if (provider === 'gemini') {
    return 'gemini-2.0-flash';
  }

  return 'gpt-4o-mini';
};

const buildPrompt = (data) => `
You are an expert technical resume writer and career coach. Given the user's raw resume information below, enhance and expand it into a comprehensive, modern, ATS-friendly resume with rich details.

IMPORTANT: Generate substantial AI-enhanced content that goes BEYOND what the user provided.

Return ONLY valid JSON with the following shape:
{
  "professionalSummary": "3-4 sentences about the candidate including key achievements and career trajectory",
  "careerHighlight": "1-2 sentence powerful statement about the candidate's unique value",
  "experienceHighlights": ["3-4 word powerful bullet", "3-4 word powerful bullet", "3-4 word powerful bullet"],
  "optimizedResume": {
    "summary": "Rewritten 2-3 sentence professional summary with specific achievements",
    "skills": ["Skill with proficiency", "Skill with proficiency"],
    "experience": [
      "Role at Company: AI-generated detailed accomplishment with impact metrics. Delivered key achievement.",
      "Role at Company: AI-generated detailed accomplishment with impact metrics. Improved process effectively.",
      "Role at Company: AI-generated challenge solved, technology implemented, outcome achieved."
    ],
    "projects": [
      "Project Name: AI-enhanced description focusing on technical impact and what was built. Technologies: tech stack.",
      "Project Name: AI-enhanced description with measurable outcome. Impact: specific improvement."
    ],
    "certifications": ["Generated certifications if applicable"],
    "additionalHighlights": ["Achievement metric or accomplishment", "Process improvement or innovation", "Team leadership or mentorship"]
  }
}

Guidelines for AI generation:
- For experience: Add specific metrics, technologies, and business impact
- For skills: Include proficiency level or context
- For projects: Explain the technical challenge and solution
- Generate at least 2-3 additional bullet points per experience entry
- Add certification suggestions based on skills
- Create additional highlights from existing information

Raw user data:
${JSON.stringify(data)}
`;

const parseJson = (text) => {
  try {
    const cleaned = text.replace(/```json|```/g, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    const jsonString = start >= 0 && end >= 0 ? cleaned.slice(start, end + 1) : cleaned;
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Failed to parse AI response, returning fallback.', error);
    return null;
  }
};

const buildFallbackContent = (payload) => {
  const name = payload.name || 'the candidate';
  const skills = Array.isArray(payload.skills) ? payload.skills.filter(Boolean) : [];
  const topSkills = skills.slice(0, 5);
  const experience = Array.isArray(payload.experience) ? payload.experience : [];
  const projects = Array.isArray(payload.projects) ? payload.projects : [];

  // Generate enhanced experience descriptions
  const enhancedExperience = experience
    .slice(0, 6)
    .map((exp) => {
      const role = exp.position || exp.role || 'Professional';
      const company = exp.company ? ` at ${exp.company}` : '';
      const baseDesc = exp.description ? `${exp.description}. ` : '';
      const enhancements = [
        `Successfully delivered solutions impacting team productivity.`,
        `Implemented best practices improving code quality and maintainability.`,
        `Collaborated cross-functionally to achieve project objectives.`,
        `Took ownership of critical functionality and technical decisions.`,
        `Mentored junior team members and shared technical knowledge.`
      ];
      const enhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
      return `${role}${company}: ${baseDesc}${enhancement}`.trim();
    })
    .filter(Boolean);

  // Enhanced project descriptions
  const enhancedProjects = projects
    .slice(0, 4)
    .map((proj) => {
      const title = proj.title || proj.name || 'Project';
      const desc = proj.description || 'Innovative solution';
      const tech = proj.technologies ? ` Tech: ${proj.technologies}` : '';
      return `${title}: ${desc} - demonstrated technical problem-solving and modern development practices.${tech}`;
    })
    .filter(Boolean);

  // Enhanced skills with proficiency
  const enhancedSkills = skills.map(skill => 
    typeof skill === 'string' ? skill : String(skill).trim()
  ).filter(Boolean);

  return {
    professionalSummary: `${name} is a seasoned professional with proven expertise in ${
      topSkills.length ? topSkills.slice(0, 3).join(', ') : 'technical problem solving'
    }. Demonstrates strong ability to deliver results, mentor teams, and drive technical innovation. Passionate about building scalable solutions and fostering collaborative team environments.`,
    careerHighlight: `Results-driven professional bringing ${topSkills.length ? topSkills[0] : 'technical'} expertise combined with leadership and delivery excellence.`,
    experienceHighlights: enhancedExperience.slice(0, 3),
    optimizedResume: {
      summary: `${name} is a driven professional committed to excellence with hands-on experience in ${topSkills.join(', ')}. Known for delivering innovative solutions, fostering collaboration, and continuously expanding technical capabilities.`,
      skills: enhancedSkills,
      experience: enhancedExperience,
      projects: enhancedProjects,
      certifications: [],
      additionalHighlights: [
        'Strong track record of delivering high-impact technical solutions',
        'Proven ability to work effectively in fast-paced, collaborative environments',
        'Committed to continuous learning and professional development'
      ]
    }
  };
};

const generateResumeContent = async (payload) => {
  const { client, provider } = getOpenAiClient();

  if (!client) {
    console.warn('AI provider key missing; using deterministic fallback generation.');
    return buildFallbackContent(payload);
  }

  try {
    const completion = await client.chat.completions.create({
      model: getDefaultModel(provider),
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
      return buildFallbackContent(payload);
    }

    return {
      professionalSummary: parsed.professionalSummary || '',
      careerHighlight: parsed.careerHighlight || '',
      experienceHighlights: parsed.experienceHighlights || [],
      optimizedResume: parsed.optimizedResume || {}
    };
  } catch (error) {
    console.warn('AI generation failed, using deterministic fallback.', error.message);
    return buildFallbackContent(payload);
  }
};

module.exports = {
  generateResumeContent
};
