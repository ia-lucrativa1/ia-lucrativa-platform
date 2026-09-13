"use client";

import { useState } from "react";

export default function GeradorPostsPage() {
  const [nicho, setNicho] = useState("");
  const [tema, setTema] = useState("");
  const [formato, setFormato] = useState("Carrossel");
  const [objetivo, setObjetivo] = useState("Gerar engajamento");
  const [resultado, setResultado] = useState("");
  const [copiado, setCopiado] = useState(false);

  function gerarPost() {
    if (!nicho.trim() || !tema.trim()) {
      alert("Preencha o nicho e o tema antes de gerar.");
      return;
    }

    let estrutura = "";

    if (formato === "Carrossel") {
      estrutura = `
SLIDE 1 — CAPA

${tema}

Uma abordagem simples para quem trabalha com ${nicho}.


SLIDE 2 — PROBLEMA

Você sente que está tentando crescer no mercado de ${nicho},
mas não sabe exatamente o que publicar?


SLIDE 3 — CONTEXTO

O problema muitas vezes não é falta de conteúdo.

É falta de estratégia.

Quando você sabe o que comunicar, para quem comunicar e qual
ação deseja gerar, seu conteúdo passa a ter um objetivo.


SLIDE 4 — ESTRATÉGIA

Comece identificando uma dúvida ou problema real do seu público.

Depois transforme essa informação em conteúdo simples,
direto e fácil de entender.


SLIDE 5 — APLICAÇÃO

Escolha um problema relacionado a ${tema}.

Explique:

• O que está acontecendo.
• Por que acontece.
• Como melhorar.
• Qual próximo passo a pessoa pode tomar.


SLIDE 6 — CTA

Gostou dessa estratégia?

Salve este post para consultar depois.

E compartilhe com alguém que trabalha com ${nicho}.


SLIDE 7 — FINAL

Quer mais ferramentas e estratégias para usar IA no seu negócio?

Conheça a IA LUCRATIVA.
`;
    } else if (formato === "Post único") {
      estrutura = `
POST PARA INSTAGRAM

TÍTULO:

${tema}

TEXTO:

Se você trabalha com ${nicho}, precisa prestar atenção neste ponto.

Muitas pessoas focam apenas em publicar conteúdo, mas esquecem
que cada publicação precisa ter um objetivo.

Use ${tema} como oportunidade para ensinar algo, gerar valor
e iniciar uma conversa com seu público.

OBJETIVO:

${objetivo}

CTA:

Salve este conteúdo e compartilhe com alguém que precisa dessas
informações.

LEGENDA:

Conteúdo estratégico não precisa ser complicado.

Comece resolvendo uma dúvida real do seu público e transforme
essa dúvida em uma publicação útil.

#${nicho.replace(/\s+/g, "")}
#Instagram
#MarketingDigital
#Conteudo
#IA
`;
    } else {
      estrutura = `
POST CURTO

GANCHO:

Você trabalha com ${nicho}?

Então precisa conhecer esta estratégia sobre ${tema}.

DESENVOLVIMENTO:

Apresente o problema.

Mostre por que ele acontece.

Entregue uma solução simples.

Finalize indicando o próximo passo.

CTA:

Salve este conteúdo e acompanhe a IA LUCRATIVA para mais
estratégias práticas.

OBJETIVO:

${objetivo}
`;
    }

    const resultadoFinal = `
GERADOR DE POSTS — IA LUCRATIVA

Nicho: ${nicho}
Tema: ${tema}
Formato: ${formato}
Objetivo: ${objetivo}

━━━━━━━━━━━━━━━━━━━━

${estrutura}

━━━━━━━━━━━━━━━━━━━━

DICA DE PUBLICAÇÃO

Antes de publicar, revise o conteúdo e adapte a linguagem
para o seu público.

O conteúdo gerado é um ponto de partida. Sua experiência,
seus exemplos e sua personalidade tornam a publicação única.
`;

    setResultado(resultadoFinal.trim());
    setCopiado(false);
  }

  async function copiarResultado() {
    if (!resultado) return;

    try {
      await navigator.clipboard.writeText(resultado);
      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 2000);
    } catch (error) {
      alert("Não foi possível copiar o resultado.");
    }
  }

  function limpar() {
    setNicho("");
    setTema("");
    setFormato("Carrossel");
    setObjetivo("Gerar engajamento");
    setResultado("");
    setCopiado(false);
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logoArea}>
          <div style={styles.logoBox}>IA</div>

          <div>
            <div style={styles.brand}>IA LUCRATIVA</div>

            <div style={styles.subtitle}>
              Gerador de Posts
            </div>
          </div>
        </div>

        <a href="/ferramentas" style={styles.backButton}>
          ← Ferramentas
        </a>
      </header>

      <section style={styles.container}>
        <div style={styles.titleArea}>
          <span style={styles.eyebrow}>
            FERRAMENTA DE IA
          </span>

          <h1 style={styles.title}>
            Gerador de Posts
          </h1>

          <p style={styles.description}>
            Crie estruturas de posts para Instagram com gancho,
            desenvolvimento, CTA e estratégia de conteúdo.
          </p>
        </div>

        <div style={styles.grid}>
          <section style={styles.card}>
            <div style={styles.cardTop}>
              <span style={styles.icon}>📱</span>

              <div>
                <h2 style={styles.cardTitle}>
                  Configure seu post
                </h2>

                <p style={styles.cardDescription}>
                  Escolha o formato e objetivo da publicação.
                </p>
              </div>
            </div>

            <div style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Nicho
                </label>

                <input
                  type="text"
                  value={nicho}
                  onChange={(e) => setNicho(e.target.value)}
                  placeholder="Ex.: design gráfico"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Tema do post
                </label>

                <input
                  type="text"
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  placeholder="Ex.: 5 erros que prejudicam seu Instagram"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Formato
                </label>

                <select
                  value={formato}
                  onChange={(e) => setFormato(e.target.value)}
                  style={styles.input}
                >
                  <option value="Carrossel">
                    Carrossel
                  </option>

                  <option value="Post único">
                    Post único
                  </option>

                  <option value="Post curto">
                    Post curto
                  </option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Objetivo
                </label>

                <select
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  style={styles.input}
                >
                  <option value="Gerar engajamento">
                    Gerar engajamento
                  </option>

                  <option value="Atrair seguidores">
                    Atrair seguidores
                  </option>

                  <option value="Gerar autoridade">
                    Gerar autoridade
                  </option>

                  <option value="Atrair clientes">
                    Atrair clientes
                  </option>

                  <option value="Gerar vendas">
                    Gerar vendas
                  </option>
                </select>
              </div>

              <button
                onClick={gerarPost}
                style={styles.generateButton}
              >
                📱 Gerar post
              </button>

              <button
                onClick={limpar}
                style={styles.clearButton}
              >
                Limpar
              </button>
            </div>
          </section>

          <section style={styles.card}>
            <div style={styles.resultHeader}>
              <div>
                <h2 style={styles.cardTitle}>
                  Post gerado
                </h2>

                <p style={styles.cardDescription}>
                  Sua estrutura aparecerá aqui.
                </p>
              </div>

              {resultado && (
                <button
                  onClick={copiarResultado}
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
                  <div style={styles.emptyIcon}>
                    📱
                  </div>

                  <strong>
                    Seu post aparecerá aqui
                  </strong>

                  <p>
                    Informe o nicho e o tema para começar.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <section style={styles.tip}>
          <div style={styles.tipIcon}>
            🎯
          </div>

          <div>
            <strong style={styles.tipTitle}>
              Conteúdo com objetivo
            </strong>

            <p style={styles.tipText}>
              Antes de publicar, saiba o que você quer que a pessoa
              faça depois de consumir o conteúdo. Isso ajuda a tornar
              cada publicação mais estratégica.
            </p>
          </div>
        </section>

        <div style={styles.bottomArea}>
          <a href="/dashboard" style={styles.dashboardLink}>
            ← Voltar para o Dashboard
          </a>
        </div>
      </section>

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
    maxWidth: "700px",
    color: "#929292",
    lineHeight: "1.7",
    fontSize: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
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
    fontSize: "18px",
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
