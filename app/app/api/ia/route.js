import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "O prompt é obrigatório.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "A chave da IA ainda não foi configurada.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-5.6-luna",
          input: [
            {
              role: "system",
              content:
                "Você é a IA oficial da plataforma IA LUCRATIVA. Sua função é ajudar empreendedores, criadores de conteúdo e iniciantes a transformar ideias em oportunidades de negócio usando inteligência artificial. Responda em português do Brasil, de forma prática, clara, profissional e acionável. Evite respostas genéricas. Sempre que possível, entregue estruturas, exemplos e próximos passos.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          sucesso: false,
          erro:
            data?.error?.message ||
            "Não foi possível obter uma resposta da IA.",
        },
        { status: response.status }
      );
    }

    const texto =
      data?.output_text ||
      data?.output
        ?.flatMap((item) => item?.content || [])
        ?.map((item) => item?.text || "")
        ?.filter(Boolean)
        ?.join("\n") ||
      "";

    if (!texto) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "A IA não retornou conteúdo.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      sucesso: true,
      resultado: texto,
    });
  } catch (error) {
    console.error("Erro na API IA LUCRATIVA:", error);

    return NextResponse.json(
      {
        sucesso: false,
        erro: "Ocorreu um erro interno ao processar sua solicitação.",
      },
      { status: 500 }
    );
  }
}
