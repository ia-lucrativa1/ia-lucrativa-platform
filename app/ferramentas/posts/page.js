"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function GeradorPosts() {
  const router = useRouter();

  const [verificando, setVerificando] = useState(true);

  const [nicho, setNicho] = useState("");
  const [tema, setTema] = useState("");
  const [formato, setFormato] = useState("Carrossel");
  const [objetivo, setObjetivo] = useState("Gerar engajamento");

  const [resultado, setResultado] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function verificarUsuario() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.replace("/login");
        return;
      }

      setVerificando(false);
    }

    verificarUsuario();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.replace("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

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
Você é um especialista em criação de conteúdo para Instagram, marketing digital, copywriting e estratégia de conteúdo.

Crie um conteúdo profissional, estratégico e pronto para publicação no Instagram.

Nicho:
${nicho}

Tema:
${tema}

Formato:
${formato}

Objetivo:
${objetivo}

REGRAS:

- Use português do Brasil.
- Evite conteúdo genérico.
- Crie textos claros, profissionais e fáceis de entender.
- Não invente resultados garantidos.
- Utilize ganchos fortes e naturais.
- O conteúdo deve entregar valor real.
- Seja específico para o nicho e tema informados.
- Não invente informações sobre o negócio.
- O resultado deve ser prático e pronto para utilização.

${
  formato === "Carrossel"
    ? `
Crie um carrossel com exatamente 7 slides.

Estruture assim:

SLIDE 1 — GANCHO
Crie uma frase forte que faça a pessoa parar e querer continuar lendo.

SLIDE 2 — PROBLEMA
Apresente o principal problema relacionado ao tema.

SLIDE 3 — CONTEXTO
Explique por que esse problema acontece.

SLIDE 4 — SOLUÇÃO
Apresente uma solução prática e objetiva.

SLIDE 5 — APLICAÇÃO
Mostre como a pessoa pode colocar essa solução em prática.

SLIDE 6 — INSIGHT
Entregue uma informação, estratégia ou reflexão de valor.

SLIDE 7 — CTA
Crie uma chamada para ação relacionada ao objetivo do conteúdo.
`
    : `
Crie o conteúdo completo do post no formato escolhido.

Organize o texto de forma profissional e pronta para publicação.
`
}

Depois crie:

LEGENDA

Crie uma legenda profissional, envolvente e pronta para Instagram.

CTA

Crie uma chamada para ação forte, natural e relacionada ao objetivo.

HASHTAGS

Crie hashtags relevantes para o nicho e para o tema.

RECOMENDAÇÃO VISUAL

Descreva brevemente como o design do conteúdo pode ser apresentado visualmente.

O resultado deve parecer criado por um profissional de marketing digital e social media.
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
          data.erro || "Não foi possível gerar o conteúdo."
        );
      }

      setResultado(data.resultado);
    } catch (error) {
      setErro(
        error.message || "Ocorreu um erro ao gerar o conteúdo."
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
    setTema("");
    setFormato("Carrossel");
    setObjetivo("Gerar engajamento");
    setResultado("");
    setErro("");
    setCopiado(false);
  }

  if (verificando) {
    return (
      <main style={styles.loadingPage}>
        <div style={styles.loadingBox}>
          <div style={styles.loadingLogo}>
            IA LUCRATIVA
          </div>

          <div style={styles.loadingText}>
            Verificando acesso...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.container}>

        {/* HERO */}
        <div style={styles.hero}>
          <div style={styles.badge}>
            📱 IA AUTOMÁTICA
          </div>

          <h1 style={styles.title}>
            Crie posts profissionais
            <br />
            <span style={styles.highlight}>
              com Inteligência Artificial
            </span>
          </h1>

          <p style={styles.description}>
            Gere carrosséis e conteúdos estratégicos
            para Instagram em poucos segundos.
          </p>
        </div>

        {/* FORMULÁRIO */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <span style={styles.cardLabel}>
                GERADOR DE POSTS
              </span>

              <h2 style={styles.cardTitle}>
                Configure seu conteúdo
              </h2>

              <p style={styles.cardDescription}>
                Informe o nicho, tema, formato e objetivo
                para criar um conteúdo estratégico.
              </p>
            </div>
          </div>

          <label style={styles.label}>
            Nicho
          </label>

          <input
            type="text"
            placeholder="Ex: Marketing digital"
            value={nicho}
            onChange={(event) =>
              setNicho(event.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Tema do conteúdo
          </label>

          <input
            type="text"
            placeholder="Ex: Como conseguir os primeiros clientes"
            value={tema}
            onChange={(event) =>
              setTema(event.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Formato
          </label>

          <select
            value={formato}
            onChange={(event) =>
              setFormato(event.target.value)
            }
            style={styles.input}
          >
            <option value="Carrossel">
              Carrossel
            </option>

            <option value="Post único">
              Post único
            </option>

            <option value="Legenda">
              Legenda
            </option>
          </select>

          <label style={styles.label}>
            Objetivo
          </label>

          <select
            value={objetivo}
            onChange={(event) =>
              setObjetivo(event.target.value)
            }
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

            <option value="Gerar leads">
              Gerar leads
            </option>

            <option value="Vender">
              Vender
            </option>
          </select>

          {erro && (
            <div style={styles.error}>
              ⚠️ {erro}
            </div>
          )}

          <div style={styles.actions}>
            <button
              type="button"
              onClick={gerarPost}
              disabled={carregando}
              style={{
                ...styles.generateButton,
                opacity: carregando ? 0.7 : 1,
              }}
            >
              {carregando
                ? "🤖 Criando conteúdo..."
                : "✨ Gerar conteúdo"}
            </button>

            <button
              type="button"
              onClick={limpar}
              style={styles.clearButton}
            >
              Limpar
            </button>
          </div>
        </section>

        {/* RESULTADO */}
        {resultado && (
          <section style={styles.resultCard}>
            <div style={styles.resultHeader}>
              <div>
                <div style={styles.resultBadge}>
                  RESULTADO DA IA
                </div>

                <h2 style={styles.resultTitle}>
                  Conteúdo gerado
                </h2>

                <div style={styles.resultSubtitle}>
                  Criado pela IA LUCRATIVA
                </div>
              </div>

              <button
                type="button"
                onClick={copiarResultado}
                style={styles.copyButton}
              >
                {copiado
                  ? "✓ Copiado"
                  : "📋 Copiar"}
              </button>
            </div>

            <div style={styles.result}>
              {resultado}
            </div>

            <button
              type="button"
              onClick={limpar}
              style={styles.clearResultButton}
            >
              🧹 Limpar conteúdo
            </button>
          </section>
        )}

        {/* DICA */}
        <section style={styles.tip}>
          <div style={styles.tipIcon}>
            💡
          </div>

          <div>
            <strong style={styles.tipTitle}>
              Dica IA LUCRATIVA
            </strong>

            <p style={styles.tipText}>
              Quanto mais específico for o nicho e o
              tema, mais estratégico será o conteúdo
              gerado pela inteligência artificial.
            </p>
          </div>
        </section>

      </section>
    </main>
  );
}

const styles = {
  loadingPage: {
    minHeight: "100vh",
    background: "#050505",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },

  loadingBox: {
    textAlign: "center",
  },

  loadingLogo: {
    fontSize: "22px",
    fontWeight: "900",
    letterSpacing: "1px",
    color: "#ffffff",
  },

  loadingText: {
    marginTop: "10px",
    color: "#888888",
    fontSize: "14px",
  },

  page: {
    minHeight: "100vh",
    background: "transparent",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    paddingBottom: "60px",
  },

  container: {
    width: "min(900px, 100%)",
    margin: "0 auto",
    padding: "20px 0 40px",
    boxSizing: "border-box",
  },

  hero: {
    textAlign: "center",
    marginBottom: "35px",
  },

  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "30px",
    background: "rgba(0, 255, 170, 0.05)",
    border: "1px solid rgba(0, 255, 170, 0.35)",
    color: "#00ffaa",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "1px",
    marginBottom: "20px",
  },

  title: {
    fontSize: "clamp(38px, 7vw, 64px)",
    lineHeight: "1.05",
    margin: "0",
    fontWeight: "900",
    letterSpacing: "-1.5px",
  },

  highlight: {
    color: "#00ffaa",
  },

  description: {
    color: "#999999",
    fontSize: "15px",
    lineHeight: "1.7",
    maxWidth: "650px",
    margin: "20px auto 0",
  },

  card: {
    background: "#0d0d0d",
    border: "1px solid #242424",
    borderRadius: "20px",
    padding: "30px",
    boxSizing: "border-box",
    boxShadow: "0 15px 50px rgba(0, 0, 0, 0.2)",
  },

  cardHeader: {
    marginBottom: "28px",
    paddingBottom: "22px",
    borderBottom: "1px solid #222222",
  },

  cardLabel: {
    color: "#00ffaa",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1.5px",
  },

  cardTitle: {
    margin: "8px 0 6px",
    fontSize: "23px",
    fontWeight: "800",
  },

  cardDescription: {
    margin: "0",
    color: "#777777",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  label: {
    display: "block",
    fontSize: "13px",
    color: "#dddddd",
    marginBottom: "9px",
    marginTop: "20px",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#050505",
    color: "#ffffff",
    border: "1px solid #333333",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "14px",
    outline: "none",
    marginBottom: "3px",
  },

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "25px",
  },

  generateButton: {
    flex: "1",
    minWidth: "200px",
    padding: "15px 20px",
    border: "1px solid #00ffaa",
    borderRadius: "10px",
    background: "#00ffaa",
    color: "#000000",
    fontSize: "14px",
    fontWeight: "900",
    cursor: "pointer",
  },

  clearButton: {
    border: "1px solid #333333",
    borderRadius: "10px",
    padding: "15px 20px",
    background: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
  },

  error: {
    marginTop: "18px",
    padding: "13px",
    background: "#211010",
    border: "1px solid #4a2020",
    color: "#ff8d8d",
    borderRadius: "10px",
    fontSize: "13px",
  },

  resultCard: {
    marginTop: "25px",
    background: "#0d0d0d",
    border: "1px solid rgba(0, 255, 170, 0.25)",
    borderRadius: "20px",
    padding: "30px",
    boxSizing: "border-box",
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "25px",
  },

  resultBadge: {
    color: "#00ffaa",
    fontSize: "10px",
    letterSpacing: "1.5px",
    fontWeight: "900",
  },

  resultTitle: {
    margin: "7px 0 0",
    fontSize: "22px",
    fontWeight: "800",
  },

  resultSubtitle: {
    marginTop: "5px",
    color: "#777777",
    fontSize: "12px",
  },

  copyButton: {
    background: "#151515",
    color: "#ffffff",
    border: "1px solid #333333",
    borderRadius: "10px",
    padding: "11px 15px",
    cursor: "pointer",
    fontWeight: "700",
  },

  result: {
    whiteSpace: "pre-wrap",
    lineHeight: "1.7",
    color: "#dddddd",
    background: "#050505",
    border: "1px solid #222222",
    borderRadius: "12px",
    padding: "22px",
    fontSize: "14px",
    overflowX: "auto",
  },

  clearResultButton: {
    marginTop: "18px",
    background: "transparent",
    color: "#888888",
    border: "1px solid #292929",
    borderRadius: "9px",
    padding: "10px 14px",
    cursor: "pointer",
  },

  tip: {
    marginTop: "25px",
    padding: "22px",
    background: "#090909",
    border: "1px solid #222222",
    borderRadius: "15px",
    display: "flex",
    gap: "15px",
    alignItems: "flex-start",
    boxSizing: "border-box",
  },

  tipIcon: {
    fontSize: "23px",
    flexShrink: 0,
  },

  tipTitle: {
    display: "block",
    color: "#00ffaa",
    fontSize: "14px",
    marginBottom: "5px",
  },

  tipText: {
    color: "#888888",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: "0",
  },
};
