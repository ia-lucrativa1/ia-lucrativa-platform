"use client";

import { useState } from "react";

export default function GeradorPosts() {
  const [nicho, setNicho] = useState("");
  const [tema, setTema] = useState("");
  const [formato, setFormato] = useState("Carrossel");
  const [objetivo, setObjetivo] = useState("Gerar engajamento");
  const [resultado, setResultado] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [erro, setErro] = useState("");

  async function gerarPost() {
    if (!nicho.trim() || !tema.trim()) {
      setErro("Preencha o nicho e o tema antes de gerar.");
      return;
    }

    setCarregando(true);
    setResultado("");
    setErro("");
    setCopiado(false);

    const prompt = `
Você é um especialista em conteúdo para redes sociais e marketing digital.

Crie um post profissional para Instagram.

Nicho:
${nicho}

Tema:
${tema}

Formato:
${formato}

Objetivo:
${objetivo}

${formato === "Carrossel"
  ? `
Crie um carrossel com 7 slides.

Estruture assim:

SLIDE 1 — GANCHO
Uma frase forte que faça a pessoa parar.

SLIDE 2 — PROBLEMA
Apresente o problema de forma clara.

SLIDE 3 — CONTEXTO
Explique por que esse problema acontece.

SLIDE 4 — SOLUÇÃO
Apresente uma solução prática.

SLIDE 5 — APLICAÇÃO
Mostre como colocar a solução em prática.

SLIDE 6 — INSIGHT
Entregue uma informação ou reflexão de valor.

SLIDE 7 — CTA
Crie uma chamada para ação relacionada ao objetivo do post.
`
  : `
Crie o conteúdo completo do post no formato escolhido.
`
}

Depois crie:

LEGENDA
Uma legenda profissional, envolvente e pronta para Instagram.

CTA
Uma chamada para ação forte e natural.

HASHTAGS
Crie hashtags relevantes para o nicho e tema.

RECOMENDAÇÃO VISUAL
Descreva brevemente como o design do post pode ser apresentado.

Use português do Brasil.
Não invente resultados garantidos.
Evite conteúdo genérico.
Entregue o material pronto para publicação.
`;

    try {
      const response = await fetch("/api/ia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.sucesso) {
        throw new Error(
          data.erro || "Não foi possível gerar o post."
        );
      }

      setResultado(data.resultado);
    } catch (error) {
      setErro(error.message || "Ocorreu um erro ao gerar o post.");
    } finally {
      setCarregando(false);
    }
  }

  async function copiarResultado() {
    if (!resultado) return;

    try {
      await navigator.clipboard.writeText(resultado);
      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 2000);
    } catch {
      setErro("Não foi possível copiar o resultado.");
    }
  }

  function limpar() {
    setNicho("");
    setTema("");
    setFormato("Carrossel");
    setObjetivo("Gerar engajamento");
    setResultado("");
    setErro("");
    setCopiado(false);
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.logo}>IA LUCRATIVA</div>

          <div style={styles.subtitle}>
            Gerador de Posts com IA
          </div>
        </div>

        <a href="/dashboard" style={styles.backButton}>
          Dashboard
        </a>
      </header>

      <section style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.badge}>📱 IA AUTOM
