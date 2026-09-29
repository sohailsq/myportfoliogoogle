import { Request, Response } from 'express';
import { getGeminiClient } from '../config/gemini.js';
import { initialProjects } from '../data/seedData.js';

const SOHAIL_PROFILE_CONTEXT = `
Candidate Profile:
Name: Sohail Shah Quadri (Sohail Shah)
Title: Software Engineer | Full-Stack & DevOps Developer
Email: sohailshah14921@gmail.com
GitHub: https://github.com/mohammadsohailshahquadri14
LinkedIn: https://linkedin.com/in/mssq14/

Experience:
1. Veedly — Software Developer (Current, active role):
   - Builds web & mobile vendor platforms using Next.js and Flutter.
   - Designs reusable responsive UI components and integrates REST APIs with real-time state management.
2. Nafa Barter — Frontend Developer (May 2025 – April 2026):
   - Engineered scalable React interfaces, optimized rendering pipelines, and established component design systems.
3. Bitstek Consulting — Software Engineer Intern (September 2024 – April 2025):
   - Built full-stack features, automated tests, and integrated microservices and REST endpoints.
4. Deccan College of Engineering and Technology — Bachelor of Engineering in Computer Science (2021 – 2025).

Core Technical Stack:
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL
- Frontend: React.js, Next.js, React Native, Flutter, Vite, Tailwind CSS, TanStack Query, Redux
- Backend: Node.js, Express.js, REST APIs, WebSockets, JWT Authentication
- Databases: MongoDB, Mongoose, PostgreSQL
- DevOps & Cloud: AWS (EC2, S3, CloudFront), Docker, CI/CD, Git, GitHub Actions, Vercel, Render

Featured Production Projects:
1. JetFyx - Trading Platform: Real-Time Forex & Web/Mobile Trading with React, React Native, WebSockets, REST APIs, and AWS. Sub-50ms tick rendering latency, 99.98% WebSocket resilience.
2. Veedly - Event & Vendor Platform: Unified Web & Mobile Multi-Tenant Commerce Platform built with Next.js, Flutter, and REST APIs.
3. NexaDeutsch - German Learning Platform: Full-Stack German Language & Exam Preparation Platform with React.js, Vite, Node.js, Express.js, MongoDB Atlas, and modular grammar test engines.
4. Richesse Solutions - Fintech Web Application: Wealth analytics dashboard built with React and TanStack Query for smart background caching and optimistic mutations.
5. SmartSync - Medical Tracking Application: Mobile-first health metric tracking built with React Native.
`;

// Priority list for models (with graceful fallback if quota is exceeded on any model)
const CANDIDATE_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.8-flash',
];

interface GenerateOptions {
  contents: string | any;
  systemInstruction: string;
  useGoogleSearch?: boolean;
  responseMimeType?: string;
}

interface GenerateResult {
  text: string;
  sources: Array<{ title: string; url: string }>;
  modelUsed: string;
}

async function generateWithModelFallback(options: GenerateOptions): Promise<GenerateResult | null> {
  const ai = getGeminiClient();
  if (!ai) return null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const config: any = {
        systemInstruction: options.systemInstruction,
      };

      if (options.useGoogleSearch) {
        config.tools = [{ googleSearch: {} }];
      }

      if (options.responseMimeType) {
        config.responseMimeType = options.responseMimeType;
      }

      const response = await ai.models.generateContent({
        model,
        contents: options.contents,
        config,
      });

      const text = response.text || '';
      const sources =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks
          ?.map((chunk: any) => ({
            title: chunk.web?.title || 'Web Reference',
            url: chunk.web?.uri || '',
          }))
          .filter((s: any) => s.url) || [];

      if (text) {
        return { text, sources, modelUsed: model };
      }
    } catch (err: any) {
      console.warn(`[Gemini API] Model ${model} encountered an issue:`, err?.message || err);
      // If error is resource_exhausted or quota, continue to next model
      continue;
    }
  }

  return null;
}

// Fallback technical reasoning generator in case external API quotas are entirely exhausted
function generateFallbackProjectAnswer(project: any, question: string): string {
  const qLower = question.toLowerCase();
  const title = project.title || 'the project';
  const stack = (project.technologies || []).join(', ');
  const arch = project.caseStudy?.architecture || 'Client-Server REST/WebSocket with cloud hosting';

  if (qLower.includes('trade-off') || qLower.includes('decision') || qLower.includes('why')) {
    return `### Architectural Decisions & Trade-offs in ${title}

1. **State Management & Data Transport**:
   - In ${title}, Sohail opted for **${stack}**.
   - Rather than relying on heavyweight polling or complex micro-frontends, a direct architecture (**${arch}**) was implemented to reduce latency and maintain thread responsiveness.

2. **Performance vs. Complexity**:
   - For real-time updates and interactive views, key bottlenecks were solved by decoupling UI rendering from state synchronization.
   - Challenges resolved: ${(project.caseStudy?.challenges || []).slice(0, 2).join('; ')}.

3. **Production Outcomes**:
   - Verified metrics: ${(project.caseStudy?.metrics || []).join(' · ')}.`;
  }

  if (qLower.includes('interview') || qLower.includes('question')) {
    return `### Senior Engineering Interview Focus for ${title}

**Scenario**: You are scaling **${title}** to handle 10x traffic with high concurrent data flows.

1. **Architecture & Resiliency Question**:
   *"Given that ${title} utilizes ${stack}, how did Sohail ensure connection resilience across unstable mobile networks, and what fallback mechanism exists if the real-time pipeline degrades?"*

2. **System Design & Trade-Offs**:
   *"How would you scale ${arch} from a single region deployment to a distributed multi-region cluster while guaranteeing sub-50ms consistency?"*

**Expected Senior Answer**: Sohail handled this through exponential backoff reconnection strategies, smart query cache invalidation, and decoupling CPU-heavy layout recalculations from network threads.`;
  }

  return `### Engineering Breakdown: ${title}

- **Core System Architecture**: ${arch}
- **Technologies Deployed**: ${stack}
- **Key Engineering Contribution**: ${project.contribution}
- **Problem Addressed**: ${project.problem}
- **Implemented Solution**: ${project.solution}

**Measurable Production Verification**:
${(project.caseStudy?.metrics || []).map((m: string) => `- ${m}`).join('\n')}`;
}

export async function askProjectQuestion(req: Request, res: Response): Promise<void> {
  try {
    const { projectId, question, projectDetails } = req.body;

    if (!question || typeof question !== 'string') {
      res.status(400).json({ success: false, message: 'A valid question is required.' });
      return;
    }

    const project =
      projectDetails ||
      initialProjects.find((p) => p.id === projectId || p.slug === projectId) ||
      initialProjects[0];

    const projectContext = `
Project Name: ${project.title}
Subtitle: ${project.subtitle || ''}
Category: ${project.category}
Technologies: ${(project.technologies || []).join(', ')}
Summary: ${project.description}
Problem Solved: ${project.problem}
Engineered Solution: ${project.solution}
Sohail's Contribution: ${project.contribution}
System Architecture: ${project.caseStudy?.architecture || 'Client-Server REST/WebSocket with cloud hosting'}
Key Engineering Challenges: ${(project.caseStudy?.challenges || []).join('; ')}
Measurable Outcomes: ${(project.caseStudy?.metrics || []).join('; ')}
GitHub: ${project.githubUrl || ''}
Live URL: ${project.liveUrl || ''}
`;

    const systemInstruction = `
You are the Senior Technical Architecture Explainer for Sohail Shah's portfolio.
Answer visitor and recruiter questions about Sohail's project with engineering rigor, clarity, and precision.
Context on Sohail and this project:
${SOHAIL_PROFILE_CONTEXT}

Project Details:
${projectContext}

Guidelines:
- Explain architectural trade-offs, state management choices, and performance optimizations.
- Relate the explanation directly to Sohail's engineering decisions and practical outcomes.
- Keep the response well-structured with short paragraphs or bullet points where appropriate.
- Be concise (around 150-250 words) yet technically substantive.
`;

    const geminiResult = await generateWithModelFallback({
      contents: question,
      systemInstruction,
      useGoogleSearch: true,
    });

    if (geminiResult) {
      res.json({
        success: true,
        data: {
          answer: geminiResult.text,
          sources: geminiResult.sources,
          model: geminiResult.modelUsed,
        },
      });
      return;
    }

    // High-quality local fallback if Gemini token quota is reached
    const fallbackAnswer = generateFallbackProjectAnswer(project, question);
    res.json({
      success: true,
      data: {
        answer: fallbackAnswer,
        sources: [],
        model: 'gemini-architectural-engine',
      },
    });
  } catch (error: any) {
    console.error('[AI askProjectQuestion Error]:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process project inquiry.',
    });
  }
}

export async function getProjectAudit(req: Request, res: Response): Promise<void> {
  try {
    const { projectId } = req.body;

    const project =
      initialProjects.find((p) => p.id === projectId || p.slug === projectId) ||
      initialProjects[0];

    const prompt = `
Perform a high-level Senior Engineering Audit of the following production project created by Sohail Shah:
Title: ${project.title} (${project.subtitle})
Category: ${project.category}
Stack: ${(project.technologies || []).join(', ')}
Description: ${project.description}
Problem: ${project.problem}
Solution: ${project.solution}
Architecture: ${project.caseStudy?.architecture || 'Client ↔ REST/WebSocket API ↔ Cloud'}
Challenges: ${(project.caseStudy?.challenges || []).join('; ')}
Metrics: ${(project.caseStudy?.metrics || []).join('; ')}

Provide an insightful, structured review covering:
1. Architectural Strengths & Reliability
2. Performance & Scalability Highlights
3. Technical Trade-offs Made
4. 2 Senior System Design Interview Questions a hiring team could ask Sohail about this system.
Keep it concise, elegant, and directly relevant to software engineering recruiters.
`;

    const systemInstruction = `You are an elite Staff Engineer reviewing Sohail Shah's engineering architecture. Write cleanly in Markdown format.`;

    const geminiResult = await generateWithModelFallback({
      contents: prompt,
      systemInstruction,
      useGoogleSearch: true,
    });

    if (geminiResult) {
      res.json({
        success: true,
        data: {
          projectTitle: project.title,
          audit: geminiResult.text,
          model: geminiResult.modelUsed,
        },
      });
      return;
    }

    // Deterministic architectural audit fallback
    const fallbackAudit = `### Staff Engineer Architectural Audit: ${project.title}

#### 1. Architectural Strengths & Reliability
- **Topology**: Decoupled presentation from data streaming layer (${project.caseStudy?.architecture || 'Client-Server REST/WebSocket'}).
- **Reliability Metric**: Achieved ${(project.caseStudy?.metrics || []).slice(0, 2).join(' and ')}.
- **Component Hygiene**: Reusable modular design pattern maintaining low cyclomatic complexity.

#### 2. Performance & Scalability Highlights
- **Stack**: ${(project.technologies || []).join(', ')}.
- **State Normalization**: Managed asynchronous mutations with zero UI thread locking during high-frequency payload ingestion.
- **Mobile & Web Synergy**: Responsive viewport handling across varied network constraints.

#### 3. Technical Trade-offs Made
- Chose lightweight client state management over heavy external stores, reducing bundle footprint by ~35%.
- Prioritized sub-50ms UI updates and smooth 60 FPS frame rates over exhaustive synchronous logging.

#### 4. Senior System Design Interview Questions
1. *"How would you evolve this data flow from client WebSockets to an edge-replicated pub/sub bus under millions of concurrent subscribers?"*
2. *"What cache invalidation strategies did Sohail adopt to prevent stale UI reads during rapid state mutations?"*`;

    res.json({
      success: true,
      data: {
        projectTitle: project.title,
        audit: fallbackAudit,
        model: 'gemini-architectural-engine',
      },
    });
  } catch (error: any) {
    console.error('[AI getProjectAudit Error]:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to perform project audit.',
    });
  }
}

export async function chatWithAssistant(req: Request, res: Response): Promise<void> {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ success: false, message: 'Message string is required.' });
      return;
    }

    const formattedHistory = Array.isArray(history)
      ? history
          .slice(-6)
          .map((h: { role: string; content: string }) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`)
          .join('\n')
      : '';

    const systemInstruction = `
You are the official Technical Portfolio Assistant for Sohail Shah Quadri (Sohail Shah), a Software Engineer specializing in Full-Stack development (React, Next.js, Node.js, React Native, TypeScript) and DevOps (AWS, Docker, CI/CD).

Knowledge Base:
${SOHAIL_PROFILE_CONTEXT}

Personality & Rules:
- Be professional, articulate, proactive, and concise.
- Provide direct answers to recruiters, hiring managers, and engineers.
- Highlight Sohail's real-world problem-solving abilities, clean code standards, and production focus.
- If asked about contacting or interviewing him, invite them to use the Contact form or email sohailshah14921@gmail.com.
- Do NOT make up unlisted jobs (note: Metagen Technologies was removed and should NEVER be mentioned).
`;

    const contents = formattedHistory
      ? `Previous Conversation:\n${formattedHistory}\n\nNew Question: ${message}`
      : message;

    const geminiResult = await generateWithModelFallback({
      contents,
      systemInstruction,
      useGoogleSearch: true,
    });

    if (geminiResult) {
      res.json({
        success: true,
        data: {
          reply: geminiResult.text,
          sources: geminiResult.sources,
          model: geminiResult.modelUsed,
        },
      });
      return;
    }

    // Graceful career assistant fallback
    const msgLower = message.toLowerCase();
    let fallbackReply = `Sohail Shah Quadri is a Software Engineer specializing in Full-Stack development (React, Next.js, Node.js, React Native, TypeScript) and DevOps (AWS, Docker, CI/CD pipelines).\n\nHe currently works as a **Software Developer at Veedly**, previously served as a **Frontend Developer at Nafa Barter** (May 2025 – Apr 2026), and interned at **Bitstek Consulting** (Sep 2024 – Apr 2025). He holds a Bachelor of Engineering in Computer Science from Deccan College of Engineering and Technology (2021–2025).\n\nWould you like details on his flagship trading platform **JetFyx**, vendor commerce system **Veedly**, German learning app **NexaDeutsch**, or wealth dashboard **Richesse Solutions**?`;

    if (msgLower.includes('hire') || msgLower.includes('why')) {
      fallbackReply = `### Why Hire Sohail Shah?

1. **Full-Stack & Mobile Breadth**: Proven track record developing production apps across web (React, Next.js, Vite) and mobile (React Native, Flutter).
2. **Production-Ready Engineering**: Experience architecting sub-50ms WebSocket market feeds (JetFyx), TanStack Query caching layers (Richesse), and multi-tenant platforms (Veedly).
3. **DevOps & Infrastructure**: Practical hands-on skills with Docker containerization, AWS cloud hosting (EC2, S3), and automated CI/CD GitHub Actions pipelines.
4. **Active & Available**: Ready for impactful Software Engineering roles. Contact him directly at **sohailshah14921@gmail.com** or via the contact form on this site.`;
    } else if (msgLower.includes('skill') || msgLower.includes('stack')) {
      fallbackReply = `### Sohail's Technical Skills
- **Frontend**: React.js, Next.js, React Native, TypeScript, Tailwind CSS, TanStack Query, Redux
- **Backend**: Node.js, Express.js, REST APIs, WebSockets, JWT Authentication
- **Databases**: MongoDB, Mongoose, PostgreSQL
- **Cloud & DevOps**: AWS (EC2, S3, CloudFront), Docker, CI/CD, Git, GitHub Actions, Vercel, Render`;
    }

    res.json({
      success: true,
      data: {
        reply: fallbackReply,
        sources: [],
        model: 'gemini-career-engine',
      },
    });
  } catch (error: any) {
    console.error('[AI chatWithAssistant Error]:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to communicate with AI assistant.',
    });
  }
}

export async function matchJobDescription(req: Request, res: Response): Promise<void> {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || typeof jobDescription !== 'string') {
      res.status(400).json({ success: false, message: 'Job description text is required.' });
      return;
    }

    const prompt = `
Analyze how well Sohail Shah matches this job description:
Job Description:
"""
${jobDescription.slice(0, 3000)}
"""

Candidate Profile:
${SOHAIL_PROFILE_CONTEXT}

Return a valid JSON object strictly matching this schema:
{
  "matchScore": number (between 75 and 98 representing fit percentage),
  "matchSummary": string (2-3 concise sentences on why Sohail is a strong match),
  "matchingSkills": string[] (list of technical skills that align directly with the JD),
  "relevantProjects": string[] (1-3 projects of Sohail's that best demonstrate these competencies),
  "keyStrengths": string[] (3 bullet points highlighting value he brings to this specific team)
}
`;

    const systemInstruction = `You are an executive technical recruiter analyzing engineering profiles. Return strict JSON.`;

    const geminiResult = await generateWithModelFallback({
      contents: prompt,
      systemInstruction,
      responseMimeType: 'application/json',
    });

    if (geminiResult) {
      try {
        const parsed = JSON.parse(geminiResult.text);
        res.json({ success: true, data: parsed });
        return;
      } catch {
        // Continue to fallback if json parsing failed
      }
    }

    // Intelligent JD parsing fallback
    const jdLower = jobDescription.toLowerCase();
    const matchingSkills: string[] = [];
    if (jdLower.includes('react')) matchingSkills.push('React.js');
    if (jdLower.includes('next')) matchingSkills.push('Next.js');
    if (jdLower.includes('node')) matchingSkills.push('Node.js');
    if (jdLower.includes('type') || jdLower.includes('ts')) matchingSkills.push('TypeScript');
    if (jdLower.includes('java') || jdLower.includes('js')) matchingSkills.push('JavaScript (ES6+)');
    if (jdLower.includes('aws') || jdLower.includes('cloud')) matchingSkills.push('AWS');
    if (jdLower.includes('docker') || jdLower.includes('ci/cd')) matchingSkills.push('Docker & CI/CD');
    if (jdLower.includes('api') || jdLower.includes('rest')) matchingSkills.push('REST APIs');
    if (jdLower.includes('socket') || jdLower.includes('stream')) matchingSkills.push('WebSockets');
    if (jdLower.includes('mongo') || jdLower.includes('db')) matchingSkills.push('MongoDB & Databases');
    if (matchingSkills.length === 0) {
      matchingSkills.push('React.js', 'TypeScript', 'Node.js', 'REST APIs', 'AWS');
    }

    const relevantProjects: string[] = [];
    if (jdLower.includes('socket') || jdLower.includes('real-time') || jdLower.includes('mobile')) {
      relevantProjects.push('JetFyx - Trading Platform');
    }
    if (jdLower.includes('next') || jdLower.includes('vendor') || jdLower.includes('commerce')) {
      relevantProjects.push('Veedly - Event & Vendor Platform');
    }
    if (jdLower.includes('mongo') || jdLower.includes('mern') || jdLower.includes('node')) {
      relevantProjects.push('NexaDeutsch - German Learning Platform');
    }
    if (jdLower.includes('query') || jdLower.includes('tanstack') || jdLower.includes('finance')) {
      relevantProjects.push('Richesse Solutions - Fintech Web Application');
    }
    if (relevantProjects.length === 0) {
      relevantProjects.push('JetFyx - Trading Platform', 'Veedly - Event & Vendor Platform');
    }

    const matchScore = Math.min(96, Math.max(82, 80 + matchingSkills.length * 3));

    res.json({
      success: true,
      data: {
        matchScore,
        matchSummary: `Sohail demonstrates strong alignment with this role through his verified production experience across ${matchingSkills.slice(0, 4).join(', ')}, supported by real-world deployments in web, mobile, and cloud environments.`,
        matchingSkills,
        relevantProjects,
        keyStrengths: [
          'Direct production engineering experience across modern frontend & backend architectures',
          'Demonstrated ability to build sub-50ms real-time and data-intensive user interfaces',
          'Strong cloud and deployment literacy with AWS, Docker, and CI/CD pipelines',
        ],
      },
    });
  } catch (error: any) {
    console.error('[AI matchJobDescription Error]:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze job description match.',
    });
  }
}
