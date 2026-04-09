import { NextResponse } from "next/server";

const CLINT_WEBHOOK =
  "https://functions-api.clint.digital/endpoints/integration/webhook/41090861-a54c-4baf-a7f7-386f6a5cfb33";

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(CLINT_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
