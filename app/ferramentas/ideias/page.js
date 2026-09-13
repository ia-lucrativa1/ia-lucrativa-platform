"use client";

import { useState } from "react";

export default function GeradorIdeias() {
  const [nicho, setNicho] = useState("");
  const [objetivo, setObjetivo] = useState("Criar renda");
  const [experiencia, setExperiencia] = useState("Iniciante");
  const [resultado, setResultado] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [erro, setErro] = useState("");

  async function gerarIdeias() {
    if (!nicho.trim()) {
      setErro("Informe o seu nicho antes de gerar as ideias.");
      return;
    }

    setCarregando(true);
    setResultado("");
    setErro("");
    setCopiado(false);

    const prompt = `
Você é um estrategista de negócios digitais especializado em inteligência artificial.

Crie oportunidades de negócio usando IA para o seguinte nicho:

Nicho:
${nicho}

Objetivo:
${objetivo}

Nível de experiência:
${experiencia}

Crie 8 ideias de oportunidades diferentes e práticas.

Para cada oportunidade, apresente:

1. NOME DA OPORTUNIDADE
2. COMO FUNCIONA
3. COMO A IA PODE AJUDAR
4. COMO GANHAR DINHEIRO
5. PRIMEIRO PASSO

Depois das 8 oportunidades, crie uma seção:

"QUAL EU DEVERIA COMEÇAR?"

Escolha a oportunidade mais adequada para alguém no nível informado e explique brevemente o motivo.

Finalize com:

"PLANO DE AÇÃO"

Crie 5 ações práticas para começar essa oportunidade.

Use português do Brasil.
Seja específico para o nicho informado.
Evite ideias genéricas.
Priorize oportunidades que possam começar com baixo investimento.
Entregue diretamente o resultado, sem explicar o processo de criação.
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
          data.erro || "Não foi possível gerar as ideias."
        );
      }

      setResultado(data.resultado);
    } catch (error) {
      setErro(error.message || "Ocorreu um erro ao gerar as ideias.");
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
    setObjetivo("Criar renda");
    setExperiencia("Iniciante");
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
            Gerador de Ideias com IA
          </div>
        </div>

        <a href="/dashboard" style={styles.backButton}>
          Dashboard
        </a>
      </header>

      <section style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.badge}>💡 IA AUTOMÁTICA</div>

          <h1 style={styles.title}>
            Encontre novas
            <br />
            <span style={styles.highlight}>oportunidades.</span>
          </h1>

          <p style={styles.description}>
            Descubra ideias de negócios, serviços e produtos que
            podem ser criados utilizando inteligência artificial.
          </p>
        </div>

        <section style={styles.card}>
          <label style={styles.label}>Seu nicho</label>

          <input
            type="text"
            placeholder="Ex: Design gráfico"
            value={nicho}
            onChange={(event) => setNicho(event.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Seu objetivo</label>

          <select
            value={objetivo}
            onChange={(event) => setObjetivo(event.target.value)}
            style={styles.input}
          >
            <option>Criar renda</option>
            <option>Criar um negócio</option>
            <option>Conseguir clientes</option>
            <option>Criar produto digital</option>
            <option>Criar serviços</option>
          </select>

          <label style={styles.label}>Seu nível</label>

          <select
            value={experiencia}
            onChange={(event) => setExperiencia(event.target.value)}
            style={styles.input}
          >
            <option>Iniciante</option>
            <option>Intermediário</option>
            <option>Avançado</option>
          </select>

          {erro && (
            <div style={styles.error}>
              {erro}
            </div>
          )}

          <div style={styles.actions}>
            <button
              onClick={gerarIdeias}
              disabled={carregando}
              style={{
                ...styles.generateButton,
                opacity: carregando ? 0.7 : 1,
              }}
            >
              {carregando
                ? "Gerando ideias..."
                : "✨ Gerar oportunidades"}
            </button>

            <button
              onClick={limpar}
              style={styles.clearButton}
            >
              Limpar
            </button>
          </div>
        </section>

        {resultado && (
          <section style={styles.resultCard}>
            <div style={styles.resultHeader}>
              <div>
                <div style={styles.resultBadge}>
                  RESULTADO DA IA
                </div>

                <h2 style={styles.resultTitle}>
                  Suas oportunidades
                </h2>
              </div>

              <button
                onClick={copiarResultado}
                style={styles.copyButton}
              >
                {copiado ? "✓ Copiado" : "📋 Copiar"}
              </button>
            </div>

            <div style={styles.result}>
              {resultado}
            </div>
          </section>
        )}

        <section style={styles.tipCard}>
          <div style={styles.tipIcon}>🚀</div>

          <div>
            <strong style={styles.tipTitle}>
              Dica IA LUCRATIVA
            </strong>

            <p style={styles.tipText}>
              Não tente começar todas as ideias ao mesmo tempo.
              Escolha uma oportunidade, valide e dê o primeiro
              passo.
            </p>
          </div>
        </section>
      </section>

      <footer style={styles.footer}>
        <strong>IA LUCRATIVA</strong>
        <span>
          Transformando inteligência artificial em oportunidades.
        </span>
        <span>@ia.lucrativa1</span>
      </footer>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050505",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 6%",
    borderBottom: "1px solid #222222",
    gap: "20px",
  },

  logo: {
    fontSize: "20px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  subtitle: {
    color: "#888888",
    fontSize: "12px",
    marginTop: "5px",
  },

  backButton: {
    color: "#ffffff",
    textDecoration: "none",
    border: "1px solid #333333",
    borderRadius: "10px",
    padding: "10px 15px",
    fontSize: "13px",
  },

  container: {
    width: "min(920px, 90%)",
    margin: "0 auto",
    padding: "70px 0",
  },

  hero: {
    textAlign: "center",
    marginBottom: "45px",
  },

  badge: {
    display: "inline-block",
    border: "1px solid #333333",
    borderRadius: "30px",
    padding: "8px 14px",
    fontSize: "11px",
    letterSpacing: "1px",
    color: "#cccccc",
    marginBottom: "20px",
  },

  title: {
    fontSize: "clamp(38px, 7vw, 70px)",
    lineHeight: "1.05",
    margin: "0",
    fontWeight: "900",
  },

  highlight: {
    color: "#888888",
  },

  description: {
    maxWidth: "650px",
    margin: "22px auto 0",
    color: "#999999",
    lineHeight: "1.7",
    fontSize: "16px",
  },

  card: {
    background: "#0d0d0d",
    border: "1px solid #242424",
    borderRadius: "20px",
    padding: "30px",
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "9px",
    color: "#dddddd",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#050505",
    color: "#ffffff",
    border: "1px solid #333333",
    borderRadius: "10px",
    padding: "14px",
    marginBottom: "22px",
    fontSize: "14px",
    outline: "none",
  },

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  generateButton: {
    flex: "1",
    minWidth: "200px",
    border: "none",
    borderRadius: "10px",
    padding: "15px 20px",
    background: "#ffffff",
