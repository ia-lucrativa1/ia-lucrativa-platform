"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function GeradorConteudo() {
  const router = useRouter();

  const [nicho, setNicho] = useState("");
  const [tema, setTema] = useState("");
  const [objetivo, setObjetivo] = useState("Atrair clientes");
  const [resultado, setResultado] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [erro, setErro] = useState("");
  const [verificando, setVerificando] = useState(true);

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

  async function gerarConteudo() {
    if (!nicho.trim() || !tema.trim()) {
      setErro("Preencha o nicho e o tema antes de gerar.");
      return;
    }

    setCarregando(true);
    setResultado("");
    setErro("");
    setCopiado(false);

    const prompt = `
Crie um conteúdo completo para o nicho: ${nicho}.

Tema:
${tema}

Objetivo:
${objetivo}

Estruture a resposta exatamente com:

1. TÍTULO
2. GANCHO
3. DESENVOLVIMENTO
4. APLICAÇÃO PRÁTICA
5. CTA
6. LEGENDA PARA INSTAGRAM
7. HASHTAGS

O conteúdo deve ser profissional, específico para o nicho informado e fácil de aplicar.
Use português do Brasil.
Não explique o processo de criação. Entregue diretamente o conteúdo pronto.
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
      setErro(error.message || "Ocorreu um erro.");
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
      setErro("Não foi possível copiar o conteúdo.");
    }
  }

  function limpar() {
    setNicho("");
    setTema("");
    setObjetivo("Atrair clientes");
    setResultado("");
    setErro("");
    setCopiado(false);
  }

  if (verificando) {
    return (
      <main style={styles.loadingPage}>
        <div style={styles.loadingBox}>
          <div style={styles.loadingLogo}>IA</div>

          <h1 style={styles.loadingTitle}>
            IA LUCRATIVA
          </h1>

          <p style={styles.loadingText}>
            Verificando acesso...
          </p>
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
            Gerador de Conteúdo com IA
          </div>
        </div>

        <a href="/dashboard" style={styles.backButton}>
          Dashboard
        </a>
      </header>

      <section style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.badge}>🤖 IA AUTOMÁTICA</div>

          <h1 style={styles.title}>
            Crie conteúdos
            <br />
            <span style={styles.highlight}>em segundos.</span>
          </h1>

          <p style={styles.description}>
            Informe seu nicho, escolha um tema e deixe a IA LUCRATIVA
            criar uma estrutura completa de conteúdo para você.
          </p>
        </div>

        <section style={styles.card}>
          <label style={styles.label}>Seu nicho</label>

          <input
            type="text"
            placeholder="Ex: Marketing digital"
            value={nicho}
            onChange={(event) => setNicho(event.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Tema do conteúdo</label>

          <input
            type="text"
            placeholder="Ex: Como conseguir o primeiro cliente"
            value={tema}
            onChange={(event) => setTema(event.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Objetivo</label>

          <select
            value={objetivo}
            onChange={(event) => setObjetivo(event.target.value)}
            style={styles.input}
          >
            <option>Atrair clientes</option>
            <option>Gerar autoridade</option>
            <option>Aumentar vendas</option>
            <option>Gerar engajamento</option>
            <option>Conseguir seguidores</option>
          </select>

          {erro && <div style={styles.error}>{erro}</div>}

          <div style={styles.actions}>
            <button
              onClick={gerarConteudo}
              disabled={carregando}
              style={{
                ...styles.generateButton,
                opacity: carregando ? 0.7 : 1,
              }}
            >
              {carregando ? "Gerando..." : "✨ Gerar conteúdo"}
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
                  Seu conteúdo está pronto
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
          <div style={styles.tipIcon}>💡</div>

          <div>
            <strong style={styles.tipTitle}>
              Dica IA LUCRATIVA
            </strong>

            <p style={styles.tipText}>
              Quanto mais específico for o nicho e o tema,
              mais personalizada será a resposta da IA.
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

  loadingPage: {
    minHeight: "100vh",
    background: "#050505",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  loadingBox: {
    textAlign: "center",
  },

  loadingLogo: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "#ffffff",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "900",
    margin: "0 auto 20px",
  },

  loadingTitle: {
    fontSize: "24px",
    margin: "0 0 8px",
  },

  loadingText: {
    color: "#888888",
    margin: 0,
    fontSize: "14px",
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
    color: "#000000",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "14px",
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
    background: "#1a0d0d",
    border: "1px solid #4a2222",
    color: "#ff9b9b",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "20px",
    fontSize: "13px",
  },

  resultCard: {
    marginTop: "25px",
    background: "#0d0d0d",
    border: "1px solid #242424",
    borderRadius: "20px",
    padding: "30px",
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
    color: "#888888",
    fontSize: "11px",
    letterSpacing: "1px",
    fontWeight: "800",
  },

  resultTitle: {
    margin: "7px 0 0",
    fontSize: "22px",
  },

  copyButton: {
    border: "1px solid #333333",
    background: "#151515",
    color: "#ffffff",
    borderRadius: "10px",
    padding: "11px 15px",
    cursor: "pointer",
  },

  result: {
    whiteSpace: "pre-wrap",
    background: "#050505",
    border: "1px solid #222222",
    borderRadius: "12px",
    padding: "22px",
    color: "#dddddd",
    lineHeight: "1.7",
    fontSize: "14px",
  },

  tipCard: {
    display: "flex",
    gap: "15px",
    alignItems: "flex-start",
    marginTop: "25px",
    padding: "22px",
    border: "1px solid #222222",
    borderRadius: "15px",
    background: "#090909",
  },

  tipIcon: {
    fontSize: "22px",
  },

  tipTitle: {
    display: "block",
    marginBottom: "5px",
  },

  tipText: {
    margin: "0",
    color: "#888888",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  footer: {
    borderTop: "1px solid #222222",
    padding: "30px 6%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    color: "#777777",
    fontSize: "12px",
    textAlign: "center",
  },
};
