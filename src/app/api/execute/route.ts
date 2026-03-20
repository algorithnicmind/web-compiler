import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { language, sourceCode, stdin } = await request.json();

    if (!language || !sourceCode) {
      return NextResponse.json(
        { error: "Language and source code are required." },
        { status: 400 }
      );
    }

    // Map language string to Judge0 language IDs
    const LANGUAGE_IDS: Record<string, number> = {
      javascript: 93, // Node.js
      typescript: 94, // TypeScript
      python: 71,     // Python 3
      java: 62,       // Java
      cpp: 54,        // C++
    };

    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      );
    }

    // Prepare payload for Judge0
    // Using ce.judge0.com public instance for MVP
    const judge0Endpoint = process.env.JUDGE0_API_URL || "https://ce.judge0.com";

    const payload = {
      language_id: languageId,
      source_code: sourceCode,
      stdin: stdin || "",
    };

    // 1. Create a submission
    const createResponse = await fetch(`${judge0Endpoint}/submissions?base64_encoded=false&wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Pass optional RapidAPI keys if configured in .env
        ...(process.env.JUDGE0_API_KEY && {
          "x-rapidapi-key": process.env.JUDGE0_API_KEY,
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        }),
      },
      body: JSON.stringify(payload),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.text();
      console.error("Judge0 Error:", errorData);
      return NextResponse.json(
        { error: "Failed to execute code using Judge0." },
        { status: 500 }
      );
    }

    const data = await createResponse.json();

    // With `wait=true`, Judge0 returns the output directly
    const result = {
      stdout: data.stdout || "",
      stderr: data.stderr || "",
      compile_output: data.compile_output || "",
      status: data.status?.description || "Unknown Error",
      executionTime: data.time || "0",
    };

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Execution API Error:", error);
    return NextResponse.json(
      { error: "Internal server error during execution." },
      { status: 500 }
    );
  }
}
