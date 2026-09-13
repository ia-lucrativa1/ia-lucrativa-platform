"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function GeradorIdeias() {
  const router = useRouter();

  const [verificando, setVerificando] = useState(true);
  const [nicho, setNicho] = useState("");
  const [objetivo, setObjetivo] = useState("Criar renda");
  const [experiencia, setExperiencia] = useState("Iniciante");
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
      setErro(
        error.message || "Ocorreu um erro ao gerar as ideias."
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
    setObjetivo("Criar renda");
    setExperiencia("Iniciante");
    setResultado("");
    setErro("");
    setCopiado(false);
  }

  if (verificando) {
    return (
      <main style={styles.loadingPage}>
        <div style={styles.loadingBox}>
          <div style={styles.loadingLogo}>
            IA
          </div>

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
      <section style={styles.container}>

        {/* HERO */}
        <div style={styles.hero}>
          <div style={styles.badge}>
            💡 IA AUTOMÁTICA
          </div>

          <h1 style={styles.title}>
            Encontre novas
            <br />
            <span style={styles.highlight}>
              oportunidades.
            </span>
          </h1>

          <p style={styles.description}>
            Descubra ideias de negócios, serviços e produtos
            que podem ser criados utilizando inteligência
            artificial.
          </p>
        </div>

        {/* FORMULÁRIO */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <div style={styles.cardBadge}>
                FERRAMENTA DE IA
              </div>

              <h2 style={styles.cardTitle}>
                Gerador de Ideias
              </h2>

              <p style={styles.cardDescription}>
                Encontre oportunidades personalizadas para
                transformar seu conhecimento em novas possibilidades.
              </p>
            </div>

            <div style={styles.cardIcon}>
              💡
            </div>
          </div>

          <label style={styles.label}>
            Seu nicho
          </label>

          <input
            type="text"
            placeholder="Ex: Design gráfico"
            value={nicho}
            onChange={(event) =>
              setNicho(event.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Seu objetivo
          </label>

          <select
            value={objetivo}
            onChange={(event) =>
              setObjetivo(event.target.value)
            }
            style={styles.input}
          >
            <option>Criar renda</option>
            <option>Criar um negócio</option>
            <option>Conseguir clientes</option>
            <option>Criar produto digital</option>
            <option>Criar serviços</option>
          </select>

          <label style={styles.label}>
            Seu nível
          </label>

          <select
            value={experiencia}
            onChange={(event) =>
              setExperiencia(event.target.value)
            }
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
              type="button"
              onClick={gerarIdeias}
              disabled={carregando}
              style={{
                ...styles.generateButton,
                opacity: carregando ? 0.7 : 1,
                cursor: carregando
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {carregando
                ? "⏳ Gerando oportunidades..."
                : "✨ Gerar oportunidades"}
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
                  Suas oportunidades
                </h2>

                <p style={styles.resultDescription}>
                  Analise as oportunidades e escolha aquela
                  que faz mais sentido para o seu momento.
                </p>
              </div>

              <button
                type="button"
                onClick={copiarResultado}
                style={styles.copyButton}
              >
                {copiado
                  ? "✓ Copiado"
                  : "📋 Copiar resultado"}
              </button>
            </div>

            <div style={styles.result}>
              {resultado}
            </div>
          </section>
        )}

        {/* DICA */}
        <section style={styles.tipCard}>
          <div style={styles.tipIcon}>
            🚀
          </div>

          <div>
            <strong style={styles.tipTitle}>
              Dica IA LUCRATIVA
            </strong>

            <p style={styles.tipText}>
              Não tente começar todas as ideias ao mesmo
              tempo. Escolha uma oportunidade, valide e dê
              o primeiro passo.
            </p>
          </div>
        </section>

      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "transparent",
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

  container: {
    width: "min(920px, 100%)",
    margin: "0 auto",
    padding: "45px 20px 60px",
    boxSizing: "border-box",
  },

  hero: {
    textAlign: "center",
    marginBottom: "40px",
  },

  badge: {
    display: "inline-block",
    border: "1px solid #26352f",
    background: "#07100c",
    borderRadius: "30px",
    padding: "8px 14px",
    fontSize: "11px",
    letterSpacing: "1px",
    color: "#00ffaa",
    marginBottom: "20px",
    fontWeight: "800",
  },

  title: {
    fontSize: "clamp(38px, 7vw, 68px)",
    lineHeight: "1.05",
    margin: 0,
    fontWeight: "900",
    letterSpacing: "-2px",
  },

  highlight: {
    color: "#00ffaa",
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
    boxSizing: "border-box",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "30px",
  },

  cardBadge: {
    color: "#00ffaa",
    fontSize: "10px",
    letterSpacing: "1.5px",
    fontWeight: "900",
    marginBottom: "7px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "800",
  },

  cardDescription: {
    margin: "8px 0 0",
    color: "#777777",
    fontSize: "13px",
    lineHeight: "1.5",
    maxWidth: "620px",
  },

  cardIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "#07100c",
    border: "1px solid #17352a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
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
    marginTop: "5px",
  },

  generateButton: {
    flex: "1",
    minWidth: "210px",
    border: "none",
    borderRadius: "10px",
    padding: "15px 20px",
    background: "#00ffaa",
    color: "#000000",
    fontWeight: "900",
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
    fontWeight: "700",
  },

  error: {
    background: "#1a0d0d",
    border: "1px solid #4a2222",
    color: "#ff9b9b",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "20px",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  resultCard: {
    marginTop: "25px",
    background: "#0d0d0d",
    border: "1px solid #242424",
    borderRadius: "20px",
    padding: "30px",
    boxSizing: "border-box",
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
    fontWeight: "900",
  },

  resultDescription: {
    margin: "7px 0 0",
    color: "#777777",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  copyButton: {
    border: "1px solid #1d4436",
    background: "#07100c",
    color: "#00ffaa",
    borderRadius: "10px",
    padding: "11px 15px",
    cursor: "pointer",
    fontWeight: "800",
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
    boxSizing: "border-box",
    overflowWrap: "break-word",
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
    boxSizing: "border-box",
  },

  tipIcon: {
    fontSize: "22px",
    flexShrink: 0,
  },

  tipTitle: {
    display: "block",
    marginBottom: "5px",
    color: "#ffffff",
  },

  tipText: {
    margin: 0,
    color: "#888888",
    fontSize: "13px",
    lineHeight: "1.6",
  },
};
