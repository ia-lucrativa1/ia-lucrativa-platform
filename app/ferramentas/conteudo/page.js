"use client";

import { useState } from "react";

export default function GeradorConteudoPage() {
  const [tema, setTema] = useState("");
  const [nicho, setNicho] = useState("");
  const [objetivo, setObjetivo] = useState("Atrair clientes");
  const [resultado, setResultado] = useState("");
  const [copiado, setCopiado] = useState(false);

  function gerarConteudo() {
    if (!tema.trim() || !nicho.trim()) {
      alert("Preencha o tema e o nicho antes de gerar.");
      return;
    }

    const conteudo = `
IDEIA DE CONTEÚDO — IA LUCRATIVA

Nicho: ${nicho}
Tema: ${tema}
Objetivo: ${objetivo}

TÍTULO:
${tema}: o que você precisa saber para começar

GANCHO:
Você está tentando melhorar seus resultados em ${nicho}, mas ainda não sabe por onde começar?

DESENVOLVIMENTO:
Mostre de forma simples por que esse assunto é importante para o público.

Explique os principais pontos relacionados ao tema "${tema}".

Apresente uma solução prática que a pessoa consiga aplicar ainda hoje.

Mostre um exemplo real ou uma situação comum dentro do nicho.

CTA:
Quer aprender mais estratégias para transformar conhecimento em oportunidades?

Acesse a IA LUCRATIVA e descubra novas ferramentas, prompts e estratégias.

LEGENDA:
Se você trabalha com ${nicho}, precisa entender melhor sobre ${tema}.

Comece aplicando uma estratégia simples, acompanhe os resultados e vá melhorando com o tempo.

Salve este conteúdo para consultar depois e compartilhe com alguém que precisa dessas informações.

#${nicho.replace(/\s+/g, "")} #InteligenciaArtificial #MarketingDigital #IA #NegociosDigitais
`;

    setResultado(conteudo.trim());
    setCopiado(false);
  }

  async function copiarConteudo() {
    if (!resultado) return;

    try {
      await navigator.clipboard.writeText(resultado);
      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 2000);
    } catch (error) {
      alert("Não foi possível copiar automaticamente.");
    }
  }

  function limpar() {
    setTema("");
    setNicho("");
    setObjetivo("Atrair clientes");
    setResultado("");
    setCopiado(false);
  }

  return (
    <main style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logoArea}>
          <div style={styles.logoBox}>IA</div>

          <div>
            <div style={styles.brand}>IA LUCRATIVA</div>
            <div style={styles.subtitle}>
              Gerador de Conteúdo
            </div>
          </div>
        </div>

        <a href="/ferramentas" style={styles.backButton}>
          ← Ferramentas
        </a>
      </header>

      {/* CONTEÚDO */}
      <section style={styles.container}>
        <div style={styles.titleArea}>
          <span style={styles.eyebrow}>
            FERRAMENTA DE IA
          </span>

          <h1 style={styles.title}>
            Gerador de Conteúdo
          </h1>

          <p style={styles.description}>
            Crie ideias e estruturas de conteúdo para o seu negócio
            de forma rápida e estratégica.
          </p>
        </div>

        <div style={styles.grid}>
          {/* FORMULÁRIO */}
          <section style={styles.card}>
            <div style={styles.cardTop}>
              <span style={styles.icon}>✦</span>

              <div>
                <h2 style={styles.cardTitle}>
                  Crie seu conteúdo
                </h2>

                <p style={styles.cardDescription}>
                  Preencha as informações abaixo.
                </p>
              </div>
            </div>

            <div style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Qual é o seu nicho?
                </label>

                <input
                  type="text"
                  value={nicho}
                  onChange={(e) => setNicho(e.target.value)}
                  placeholder="Ex.: estética, restaurante, design..."
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Qual é o tema?
                </label>

                <input
                  type="text"
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  placeholder="Ex.: como conseguir mais clientes"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Objetivo do conteúdo
                </label>

                <select
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  style={styles.input}
                >
                  <option value="Atrair clientes">
                    Atrair clientes
                  </option>

                  <option value="Gerar autoridade">
                    Gerar autoridade
                  </option>

                  <option value="Aumentar vendas">
                    Aumentar vendas
                  </option>

                  <option value="Gerar engajamento">
                    Gerar engajamento
                  </option>

                  <option value="Conseguir seguidores">
                    Conseguir seguidores
                  </option>
                </select>
              </div>

              <button
                onClick={gerarConteudo}
                style={styles.generateButton}
              >
                ✦ Gerar conteúdo
              </button>

              <button
                onClick={limpar}
                style={styles.clearButton}
              >
                Limpar
              </button>
            </div>
          </section>

          {/* RESULTADO */}
          <section style={styles.card}>
            <div style={styles.resultHeader}>
              <div>
                <h2 style={styles.cardTitle}>
                  Resultado
                </h2>

                <p style={styles.cardDescription}>
                  Seu conteúdo aparecerá aqui.
                </p>
              </div>

              {resultado && (
                <button
                  onClick={copiarConteudo}
                  style={styles.copyButton}
                >
                  {copiado ? "✓ Copiado" : "Copiar"}
                </button>
              )}
            </div>

            <div style={styles.resultBox}>
              {resultado ? (
                <pre style={styles.resultText}>
                  {resultado}
                </pre>
              ) : (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>✦</div>

                  <strong>
                    Seu conteúdo será criado aqui
                  </strong>

                  <p>
                    Informe o nicho e o tema ao lado para
                    começar.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* DICA */}
        <section style={styles.tip}>
          <div style={styles.tipIcon}>💡</div>

          <div>
            <strong style={styles.tipTitle}>
              Dica IA LUCRATIVA
            </strong>

            <p style={styles.tipText}>
              Quanto mais específico for o nicho e o tema,
              mais direcionado será o conteúdo gerado.
            </p>
          </div>
        </section>

        {/* VOLTAR */}
        <div style={styles.bottomArea}>
          <a href="/dashboard" style={styles.dashboardLink}>
            ← Voltar para o Dashboard
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <strong>IA LUCRATIVA</strong>

        <span>
          Crie. Automatize. Lucre.
        </span>

        <span>
          @ia.lucrativa1
        </span>
      </footer>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050505",
    color: "#ffffff",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  header: {
    minHeight: "76px",
    padding: "0 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #1b1b1b",
    background: "#070707",
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logoBox: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#050505",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: "14px",
  },

  brand: {
    fontSize: "15px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  subtitle: {
    marginTop: "3px",
    fontSize: "11px",
    color: "#777777",
  },

  backButton: {
    textDecoration: "none",
    color: "#ffffff",
    border: "1px solid #292929",
    padding: "10px 15px",
    borderRadius: "9px",
    fontSize: "13px",
    fontWeight: "700",
  },

  container: {
    width: "min(100% - 32px, 1100px)",
    margin: "0 auto",
    padding: "60px 0",
  },

  titleArea: {
    marginBottom: "35px",
  },

  eyebrow: {
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
    color: "#888888",
  },

  title: {
    margin: "10px 0",
    fontSize: "clamp(32px, 6vw, 52px)",
    lineHeight: "1.05",
    letterSpacing: "-2px",
  },

  description: {
    maxWidth: "650px",
    color: "#929292",
    lineHeight: "1.7",
    fontSize: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#0b0b0b",
    border: "1px solid #202020",
    borderRadius: "18px",
    padding: "25px",
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    marginBottom: "25px",
  },

  icon: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#050505",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
  },

  cardTitle: {
    margin: 0,
    fontSize: "20px",
  },

  cardDescription: {
    margin: "6px 0 0",
    color: "#777777",
    fontSize: "12px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "12px",
    color: "#aaaaaa",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#050505",
    border: "1px solid #292929",
    color: "#ffffff",
    padding: "14px",
    borderRadius: "10px",
    outline: "none",
    fontSize: "13px",
  },

  generateButton: {
    marginTop: "5px",
    border: "none",
    background: "#ffffff",
    color: "#050505",
    padding: "14px",
    borderRadius: "10px",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "13px",
  },

  clearButton: {
    border: "1px solid #292929",
    background: "transparent",
    color: "#888888",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "12px",
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  copyButton: {
    border: "1px solid #303030",
    background: "#151515",
    color: "#ffffff",
    padding: "9px 13px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "700",
  },

  resultBox: {
    minHeight: "450px",
    background: "#050505",
    border: "1px solid #202020",
    borderRadius: "12px",
    padding: "18px",
    boxSizing: "border-box",
    overflow: "auto",
  },

  resultText: {
    margin: 0,
    whiteSpace: "pre-wrap",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#dddddd",
    fontSize: "13px",
    lineHeight: "1.7",
  },

  emptyState: {
    minHeight: "410px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#777777",
    padding: "20px",
    boxSizing: "border-box",
  },

  emptyIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#111111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    marginBottom: "15px",
    fontSize: "20px",
  },

  tip: {
    marginTop: "20px",
    display: "flex",
    gap: "14px",
    padding: "20px",
    borderRadius: "15px",
    background: "#0a0a0a",
    border: "1px dashed #292929",
  },

  tipIcon: {
    fontSize: "20px",
  },

  tipTitle: {
    display: "block",
    fontSize: "13px",
    marginBottom: "5px",
  },

  tipText: {
    margin: 0,
    color: "#777777",
    fontSize: "12px",
    lineHeight: "1.6",
  },

  bottomArea: {
    marginTop: "30px",
    textAlign: "center",
  },

  dashboardLink: {
    color: "#aaaaaa",
    textDecoration: "none",
    fontSize: "12px",
  },

  footer: {
    padding: "30px 6%",
    borderTop: "1px solid #1b1b1b",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
    color: "#666666",
    fontSize: "11px",
  },
};
