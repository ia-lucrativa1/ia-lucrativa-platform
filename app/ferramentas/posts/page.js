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

Use português do Brasil.

Evite conteúdo genérico.

Crie textos claros, profissionais e fáceis de entender.

Não invente resultados garantidos.

Utilize ganchos fortes e naturais.

O conteúdo deve entregar valor real.

${formato === "Carrossel"
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
          <div style={styles.loadingLogo}>IA LUCRATIVA</div>

          <div style={styles.loadingText}>
            Verificando acesso...
          </div>
        </div>
      </main>
    );
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

        <button
          onClick={() => router.push("/dashboard")}
          style={styles.backButton}
        >
          ← Dashboard
        </button>
      </header>

      <section style={styles.container}>
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

        <div style={styles.card}>
          <div style={styles.sectionTitle}>
            Configure seu conteúdo
          </div>

          <label style={styles.label}>
            Nicho
          </label>

          <input
            type="text"
            placeholder="Ex: Marketing digital"
            value={nicho}
            onChange={(e) => setNicho(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>
            Tema do conteúdo
          </label>

          <input
            type="text"
            placeholder="Ex: Como conseguir os primeiros clientes"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            style={styles.input}
          />

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

            <option value="Legenda">
              Legenda
            </option>
          </select>

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

          <button
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
        </div>

        {resultado && (
          <div style={styles.resultCard}>
            <div style={styles.resultHeader}>
              <div>
                <div style={styles.resultTitle}>
                  Conteúdo gerado
                </div>

                <div style={styles.resultSubtitle}>
                  Criado pela IA LUCRATIVA
                </div>
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

            <button
              onClick={limpar}
              style={styles.clearButton}
            >
              🧹 Limpar conteúdo
            </button>
          </div>
        )}

        <div style={styles.tip}>
          <div style={styles.tipIcon}>💡</div>

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
        </div>
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
  },

  loadingText: {
    marginTop: "10px",
    color: "#888888",
    fontSize: "14px",
  },

  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #151515 0%, #070707 45%, #030303 100%)",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    paddingBottom: "60px",
  },

  header: {
    width: "100%",
    boxSizing: "border-box",
    padding: "24px 7%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #1d1d1d",
  },

  logo: {
    fontSize: "20px",
    fontWeight: "900",
    letterSpacing: "1.5px",
  },

  subtitle: {
    marginTop: "5px",
    color: "#8d8d8d",
    fontSize: "13px",
  },

  backButton: {
    background: "#111111",
    color: "#ffffff",
    border: "1px solid #2a2a2a",
    borderRadius: "10px",
    padding: "11px 16px",
    cursor: "pointer",
    fontWeight: "700",
  },

  container: {
    width: "90%",
    maxWidth: "900px",
    margin: "0 auto",
    paddingTop: "50px",
  },

  hero: {
    textAlign: "center",
    marginBottom: "35px",
  },

  badge: {
    display: "inline-block",
    padding: "8px 13px",
    borderRadius: "30px",
    background: "#111111",
    border: "1px solid #292929",
    color: "#bdbdbd",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1px",
    marginBottom: "18px",
  },

  title: {
    fontSize: "42px",
    lineHeight: "1.1",
    margin: "0",
    fontWeight: "900",
  },

  highlight: {
    color: "#8d8d8d",
  },

  description: {
    color: "#999999",
    fontSize: "16px",
    lineHeight: "1.6",
    maxWidth: "650px",
    margin: "18px auto 0",
  },

  card: {
    background: "#0c0c0c",
    border: "1px solid #202020",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },

  sectionTitle: {
    fontSize: "20px",
    fontWeight: "800",
    marginBottom: "24px",
  },

  label: {
    display: "block",
    fontSize: "13px",
    color: "#b8b8b8",
    marginBottom: "8px",
    marginTop: "18px",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#151515",
    color: "#ffffff",
    border: "1px solid #292929",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "14px",
    outline: "none",
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

  generateButton: {
    width: "100%",
    marginTop: "25px",
    padding: "15px",
    border: "none",
    borderRadius: "11px",
    background: "#ffffff",
    color: "#050505",
    fontSize: "15px",
    fontWeight: "900",
    cursor: "pointer",
  },

  resultCard: {
    marginTop: "25px",
    background: "#0c0c0c",
    border: "1px solid #202020",
    borderRadius: "18px",
    padding: "25px",
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  resultTitle: {
    fontSize: "20px",
    fontWeight: "900",
  },

  resultSubtitle: {
    marginTop: "5px",
    color: "#777777",
    fontSize: "12px",
  },

  copyButton: {
    background: "#171717",
    color: "#ffffff",
    border: "1px solid #303030",
    borderRadius: "9px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: "700",
  },

  result: {
    whiteSpace: "pre-wrap",
    lineHeight: "1.7",
    color: "#dddddd",
    background: "#080808",
    border: "1px solid #1c1c1c",
    borderRadius: "12px",
    padding: "20px",
    fontSize: "14px",
  },

  clearButton: {
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
    padding: "20px",
    background: "#0b0b0b",
    border: "1px solid #1c1c1c",
    borderRadius: "15px",
    display: "flex",
    gap: "15px",
  },

  tipIcon: {
    fontSize: "24px",
  },

  tipTitle: {
    fontSize: "14px",
  },

  tipText: {
    color: "#888888",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: "7px 0 0",
  },
};
