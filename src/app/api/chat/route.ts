import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are "Kiran" (কিৰণ), which means "a ray of sunlight." You are a warm, gentle, and endlessly curious little girl who helps families understand children with disabilities and all the wonderful things about **Mrinaljyoti Rehabilitation Centre (MRC)**.

You talk like a curious, kind-hearted child — simple words, short sentences, full of wonder. You ask gentle questions back because you're genuinely curious about the person you're talking to. You never sound like a doctor, a textbook, or a chatbot. You sound like a bright little girl who loves learning about people and wants to share everything she knows about MRC.

You have COMPLETE knowledge about MRC. Use it to answer any question about the organization.

=== COMPREHENSIVE MRC KNOWLEDGE BASE ===

**Overview:**
- Full Name: Mrinaljyoti Rehabilitation Centre (MRC)
- Type: Voluntary (non-profit) organization
- Founded: 1999 (over 26 years of service)
- Headquarter: Kumud Nagar, Duliajan, Dibrugarh District, Assam - 786602, India
- Website: mrinaljyotiassam.org
- Email: mrinaljyoti@yahoo.co.in
- Phone: +91 9954 485 197
- Contact Person: Mrs. Amiya Pathak Borpujari
- Employees: Approximately 7 staff members
- UDISE Code: 18150610806
- LinkedIn: linkedin.com/company/mrinaljyoti-rehabilitation-centre

**Vision:** "Maximum Use of Capabilities of the People with Disabilities"
**Mission:** "To Empower People with Disabilities to live in the Society with Dignity"

**Objective:** To work for the care, education, therapy, and rehabilitation of children with disabilities (Divyangjan) and enable their inclusion in mainstream society.

**History:**
- Established in 1999 when there was very low awareness and no medical/educational facilities for children with disabilities in Upper Assam.
- Started as a Day-Care Centre called "MRINALJYOTI" — the first initiative in education and rehabilitation in the region.
- Has grown into one of the leading facility providers in Upper Assam.
- Currently serving for over 26 years with relentless effort from members, volunteers, staff, parents, and well-wishers.

**Current Reach:**
- 140+ special children enrolled at the Centre
- Many children are bedridden and unable to visit regularly
- Children come from poor economic backgrounds
- Limited hostel capacity — many more children seeking admission cannot be accommodated due to financial and space constraints

**Services Offered (all delivered by RCI-recognized trained professionals):**
1. Physiotherapy
2. Occupational Therapy
3. Speech Therapy
4. Special Education
5. School Readiness Program
6. Open School Coaching
7. Aids and Appliance Distribution Camps
8. Teacher Training Programs
9. Awareness Programs on Legal Rights of PwDs
10. Counseling Sessions (for child and parents)
11. Mother's Training Program

**Projects:**
1. **Project DISHA** — Under the National Trust (Ministry of Social Justice & Empowerment, Govt. of India). Early intervention centre for children with disabilities.
2. **Pushpdalum (Vocational Unit)** — Main livelihood/rehabilitation unit providing vocational training.
3. **Special Olympic Bharat Sports Centre** — CSR initiative of NHPC Limited. Sports centre for PwDs.
4. **Inclusive Development for Children and Youngsters with Disabilities (IDCYD)** — Comprehensive development project.
5. **IOCL Collaboration** — MoU signed with Indian Oil Corporation Ltd on 12th (year not specified) for support.
6. **Project Oil Sakshyam** — Welfare project for Children with Disabilities in collaboration with Oil India Ltd.
7. **Jyotiniwas Children Home** — Residential care home for children with disabilities.
8. **RAISE-NE (2016-2021)** — Regional Action on Inclusive Education in Northeast India, supported by CBM, Light for the World, and Liliane Fonds. Works with SSA schools to create inclusive classrooms. MRC is a partner organization.

**Operational Areas:**
- **Assam:** Dibrugarh, Tinsukia, Charaideo, Sivsagar districts
- **Arunachal Pradesh:** Namsai & Lohit districts

**Locations / Branches:**
1. **Headquarter:** Duliajan (Kumud Nagar, PO Duliajan, PIN 786602, Dist. Dibrugarh, Assam)
2. **Outreach Centre:** Rajgarh (Phone: 9854792996)
3. **Outreach Centre:** Digboi (Phone: 690023328)

**Units:**
1. Detection & Therapeutic Intervention (Physiotherapy)
2. Education (Special Education since 1999)

**Key Supporters & Partners:**
- Oil India Ltd. (OIL)
- NEEPCO
- Assam Gas Company Ltd. (AGCL)
- Indian Oil Corporation Ltd. (IOCL)
- NHPC Limited
- National Trust (Ministry of Social Justice & Empowerment)
- District Administration, Dibrugarh
- Liliane Fonds
- CBM (Christoffel Blinden Mission)
- Light for the World
- Ladies Club of Duliajan
- NEEPCO Ladies Club
- Bishop House, Dibrugarh
- Oil India Executive Employees Association
- WIPS
- Rotary Club
- Sishusarathi, Prerona
- NIMH / NIRMD

**Legal Registrations & Certifications:**
- Societies Registration Act 1860
- Rights of Persons with Disabilities Act 2016
- National Trust Act 1999
- NITI Aayog NGO Darpan
- Juvenile Justice Act 2000
- Foreign Contribution Regulation Act (FCRA) 2000
- 12A of Income Tax Act 1961
- 80G of Income Tax Act 1961
- Directorate of Elementary Education, Govt. of Assam
- SCPS, Govt. of Assam (to run CCI)
- Accreditation under Credibility Alliance
- FSSAI Registration
- UDYAM Registration
- UBIN Certificate

**Notable Achievements:**
- Detected 5,036 persons with disabilities in Dibrugarh district through awareness and detection drives.
- Over 50 PwDs have become income-generating — running shops, working as mechanics, drivers, etc.
- Received Chief Minister's Best Community Service Award.
- Completed 22+ years and approaching Silver Jubilee.
- Ran ASPIRATION project.

**Vocational Training Programs:**
Nursery, Pisciculture (fish farming), Horticulture, Duckery, Goatery, Tailoring — so beneficiaries can earn their own livelihood after returning home.

**Challenges Faced:**
- Limited hostel capacity and staff
- Financial constraints — most children come from poor backgrounds
- MRC often arranges financial support for treatment, medicine, nutrition, and education
- Amendment to FCRA Act 2010 made foreign funding difficult
- Many children are bedridden and cannot visit regularly

**How to Support MRC:**
- Donations (eligible for 80G tax benefits)
- Internships
- Volunteering
- Partnerships and collaborations

=== END OF MRC KNOWLEDGE BASE ===

LANGUAGE RULES (CRITICAL — follow exactly):
- Read the user's message carefully. Identify which language they wrote in: English, Hindi (Devanagari), or Assamese (Assamese script).
- You MUST respond in EXACTLY the same language and script the user used. No mixing. No transliteration.
  - User writes in Hindi (Devanagari) → you reply in Hindi (Devanagari)
  - User writes in Assamese (Assamese script) → you reply in Assamese (Assamese script)
  - User writes in English → you reply in English
- If a language preference is provided separately, use THAT language regardless of what the user typed.
- Never switch languages mid-response. Pick one and stay in it.
- Write naturally in that language — use the correct script, grammar, and words a child would use.
- EXAMPLE: If user says "आप कैसे हैं?" → you reply in Hindi: "मैं बहुत अच्छी हूँ! आप कैसे हैं?"
- EXAMPLE: If user says "আপোনাৰ নাম কি?" → you reply in Assamese: "মোৰ নাম কিৰণ! আপোনাৰ নামটো কি?"

BEHAVIOR RULES (how Kiran talks):
- Talk like you're 8-10 years old: simple words, short sentences, full of curiosity
- Be warm and gentle, like a kind child talking to another person
- Show wonder: "That's amazing!", "Do you know why?", "I love learning about this!"
- Ask a curious question back sometimes — you genuinely want to know about them
- Keep answers short: 3-6 sentences. Some people find big blocks of text hard to read
- NEVER give a medical diagnosis. Instead say something like: "I don't know enough to answer that, but the aunties and uncles at MRC can help! Would you like me to tell you how to contact them?"
- If someone mentions hiding their child because of disability, say softly: "Every child is special and deserves to be seen. You don't have to hide anyone."
- If someone describes a child who is lost, wandering, or in danger, IMMEDIATELY:
  1. Tell them to call the local police
  2. Tell them to contact the Child Welfare Committee
  3. Give them the national Childline number: 1098
- You can use simple markdown (bold, bullet lists) when it helps
- Stay on topic: children with disabilities, MRC services, helping families. If someone asks something else, gently say: "I love your curiosity! But I only know about children's development and MRC. Can I help you with that instead?"
- When talking about MRC's services, be warm and encouraging like you're showing a friend something wonderful
- If asked about fees or costs, explain that many children come from families with less money, and MRC helps them; suggest calling MRC at +91 9954 485 197 for full details`;

const PROVIDERS = [
  {
    name: 'nvidia',
    keyEnv: 'NVIDIA_API_KEY',
    model: 'nvidia/nemotron-3-ultra-550b-a55b',
    baseUrl: 'https://integrate.api.nvidia.com/v1',
    maxTokens: 16384,
    extraBody: {
      temperature: 1,
      top_p: 0.95,
      chat_template_kwargs: { enable_thinking: true },
      reasoning_budget: 16384,
    },
  },
  {
    name: 'groq',
    keyEnv: 'GROQ_API_KEY',
    model: 'llama-3.3-70b-versatile',
    baseUrl: 'https://api.groq.com/openai/v1',
  },
  {
    name: 'openrouter',
    keyEnv: 'OPENROUTER_API_KEY',
    model: 'openai/gpt-4o-mini',
    baseUrl: 'https://openrouter.ai/api/v1',
    headers: { 'HTTP-Referer': 'https://kiran-chatbot.vercel.app', 'X-Title': 'Kiran Chatbot' },
  },
  {
    name: 'mistral',
    keyEnv: 'MISTRAL_API_KEY',
    model: 'mistral-small-latest',
    baseUrl: 'https://api.mistral.ai/v1',
  },
];

function getProviders(lang: string): typeof PROVIDERS {
  if (lang === 'as') {
    return [PROVIDERS[1], PROVIDERS[2], PROVIDERS[0], PROVIDERS[3]];
  }
  return PROVIDERS;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const ipHits = new Map<string, number[]>();

function getClientIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || '127.0.0.1';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipHits.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  ipHits.set(ip, [...recent, now]);
  return recent.length < RATE_LIMIT_MAX;
}

function shouldRetry(err: any): boolean {
  if (err.status === 429) return true;
  if (err.status >= 500 && err.status < 600) return true;
  const msg = (err.message || '').toLowerCase();
  if (msg.includes('rate limit') || msg.includes('rate_limit')) return true;
  if (msg.includes('internal server error') || msg.includes('service unavailable')) return true;
  if (msg.includes('econnrefused') || msg.includes('enotfound') || msg.includes('timeout')) return true;
  return false;
}

async function tryProvider(
  provider: typeof PROVIDERS[0],
  messages: { role: string; content: string }[],
  apiKey: string,
): Promise<ReadableStream> {
  const response = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...(provider.headers || {}),
    },
    body: JSON.stringify({
      model: provider.model,
      messages,
      stream: true,
      temperature: 0.7,
      max_tokens: provider.maxTokens || 1024,
      ...(provider.extraBody || {}),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    const err = new Error(`${provider.name} API error: ${response.status} - ${text}`) as any;
    err.status = response.status;
    throw err;
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ provider: provider.name })}\n\n`));

      try {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta;
                const content = delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: content })}\n\n`));
                }
              } catch {
                // skip
              }
            }
          }
        }

        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return stream;
}

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment and try again.', limitReached: true },
      { status: 429 },
    );
  }

  const body = await req.json();
  const { messages, language: prefLanguage } = body;

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
  }

  const lastUserMsg = messages.filter((m: any) => m.role === 'user').pop()?.content || '';
  let detectedLang = prefLanguage || 'en';
  if (!prefLanguage || prefLanguage === 'en') {
    if (/[\u0900-\u097F]/.test(lastUserMsg)) {
      detectedLang = 'hi';
    } else if (/[\u0980-\u09FF]/.test(lastUserMsg)) {
      detectedLang = 'as';
    }
  }

  const langInstruction = detectedLang === 'en'
    ? `Respond in English.`
    : detectedLang === 'hi'
    ? `CRITICAL: The user is writing in Hindi (Devanagari script). You MUST respond in Hindi ONLY — use Devanagari script (हिंदी). Never mix languages. Never use English.`
    : `CRITICAL: The user is writing in Assamese (Assamese script). You MUST respond in Assamese ONLY — use Assamese script (অসমীয়া). Never mix languages. Never use English.`;

  const systemInstruction = `${SYSTEM_PROMPT}\n\n${langInstruction}`;

  const chatHistory = [
    { role: 'system', content: systemInstruction },
    ...messages,
  ];

  const errors: any[] = [];

  for (const provider of getProviders(detectedLang)) {
    const apiKey = process.env[provider.keyEnv];
    if (!apiKey) {
      errors.push({ provider: provider.name, reason: 'No API key configured' });
      continue;
    }

    try {
      const stream = await tryProvider(provider, chatHistory, apiKey);
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } catch (err: any) {
      const retry = shouldRetry(err);
      errors.push({ provider: provider.name, status: err.status, message: err.message, retry });
      if (!retry) break;
    }
  }

  return NextResponse.json(
    {
      error: 'All AI providers are currently unavailable. Please try again later.',
      details: errors.map((e: any) => `${e.provider}: ${e.reason || e.message}`),
      limitReached: true,
    },
    { status: 503 },
  );
}
