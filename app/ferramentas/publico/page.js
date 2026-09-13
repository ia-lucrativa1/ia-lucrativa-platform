"use client";

import { useState } from "react";

export default function GeradorPublico() {
  const [nicho, setNicho] = useState("");
  const [produto, setProduto] = useState("");
  const [objetivo, setObjetivo] = useState("Atrair clientes");
  const [resultado, setResultado] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [erro, setErro] = useState("");

  async function gerarPublico() {
    if (!nicho.trim() || !produto.trim()) {
      setErro("Preencha o nicho e o produto ou serviço.");
      return;
    }

    setCarregando(true);
    setResultado("");
    setErro("");
    setCopiado(false);

    const prompt = `
Você é um especialista em marketing, posicionamento e comportamento do consumidor.

Crie um perfil estratégico de público-alvo para:

NICHO:
${nicho}

PRODUTO OU SERVIÇO:
${produto}

OBJETIVO:
${objetivo}

Estruture exatamente assim:

1. PERFIL DO PÚBLICO
Descreva quem é o público ideal.

2. CARACTERÍSTICAS
Liste características importantes desse público.

3. PRINCIPAIS DORES
Liste pelo menos 7 problemas, dificuldades ou frustrações.

4. PRINCIPAIS DESEJOS
Liste pelo menos 7 desejos ou resultados que esse público procura.

5. OBJEÇÕES
Liste 5 motivos que podem fazer esse público não comprar.

6. GATILHOS DE COMUNICAÇÃO
Liste formas éticas de chamar a atenção desse público.

7. LINGUAGEM IDEAL
Explique como a marca deve conversar com esse público.

8. IDEIAS DE CONTEÚDO
Crie 10 ideias de conteúdos específicos para esse público.

9. POSICIONAMENTO
Crie uma sugestão clara de posicionamento.

10. CTA
Crie 3 chamadas para ação adequadas.

11. PRÓXIMO PASSO
Dê uma ação prática para começar a alcançar esse público.

Use português do Brasil.
Seja específico para o nicho informado.
Não faça suposições exageradas sobre idade, renda ou localização.
Evite respostas genéricas.
Entregue diretamente o resultado pronto.
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
          data.erro || "Não foi possível gerar o público."
        );
      }

      setResultado(data.resultado);
    } catch (error) {
      setErro(
        error.message || "Ocorreu um erro ao gerar o público."
      );
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
    setProduto("");
    setObjetivo("Atrair clientes");
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
            Gerador de Público com IA
          </div>
        </div>

        <a href="/dashboard" style={styles.backButton}>
          Dashboard
        </a>
      </header>

      <section style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.badge}>🎯 IA AUTOMÁTICA</div>

          <h1 style={styles.title}>
            Encontre o público
            <br />
            <span style={styles.highlight}>
              certo para sua oferta.
            </span>
          </h1>

          <p style={styles.description}>
            Descubra dores, desejos, objeções, linguagem e
            oportunidades de conteúdo para entender melhor
            quem você quer alcançar.
          </p>
        </div>

        <section style={styles.card}>
          <label style={styles.label}>
            Seu nicho
          </label>

          <input
            type="text"
            placeholder="Ex: Design gráfico"
            value={nicho}
            onChange={(event) => setNicho(event.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>
            Produto ou serviço
          </label>

          <input
            type="text"
            placeholder="Ex
