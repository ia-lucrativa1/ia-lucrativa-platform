"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function EstrategiasDigitaisPage() {
  const router = useRouter();

  const [verificando, setVerificando] = useState(true);
  const [nicho, setNicho] = useState("");
  const [objetivo, setObjetivo] = useState("Criar renda");
  const [nivel, setNivel] = useState("Iniciante");
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

  async function gerarEstrategia() {
    if (!nicho.trim()) {
      setErro("Digite seu nicho ou área de atuação.");
      return;
    }

    setCarregando(true);
    setResultado("");
    setErro("");
    setCopiado(false);

    const prompt = `
Crie uma estratégia digital prática e personalizada para alguém que atua no nicho de "${nicho}".

Objetivo principal: ${objetivo}
Nível de experiência: ${nivel}

A estratégia deve ser realista para quem está começando e deve mostrar como a inteligência artificial pode ajudar.

Organize exatamente nos seguintes tópicos:

1. OPORTUNIDADE
Explique qual oportunidade existe nesse nicho.

2. POSICIONAMENTO
Sugira um posicionamento claro e diferente.

3. PÚBLICO-ALVO
Descreva quem pode ser atendido, sem inventar dados específicos que não foram informados.

4. PROBLEMA
Quais problemas esse público normalmente possui?

5. SOLUÇÃO
Qual solução pode ser oferecida utilizando inteligência artificial?

6. MODELO DE NEGÓCIO
Mostre formas práticas de transformar essa solução em dinheiro.

7. OFERTA
Crie uma oferta inicial simples e atrativa.

8. AQUISIÇÃO DE CLIENTES
Mostre formas orgânicas de encontrar os primeiros clientes.

9. PRIMEIRA VENDA
Explique passo a passo como buscar a primeira venda.

10. FERRAMENTAS DE IA
Sugira categorias de ferramentas de IA que podem ajudar em cada etapa.

11. PLANO DE 7 DIAS
Crie uma ação prática para cada um dos próximos 7 dias.

12. PRÓXIMO PASSO
Finalize indicando exatamente o que a pessoa deve fazer primeiro.

Seja direto, profissional e acionável.
Evite respostas genéricas.
Dê exemplos quando forem úteis.
Use português do Brasil.
Não prometa resultados financeiros garantidos.
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
          data?.erro || "Não foi possível gerar a estratégia."
        );
      }

      setResultado(data.resultado);
    } catch (error) {
      setErro(
        error.message ||
          "Ocorreu um erro ao gerar sua estratégia."
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
    setNivel("Iniciante");
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

        {/* CABEÇALHO DA FERRAMENTA */}
        <div style={styles.toolHeader}>
          <div>
            <div style={styles.toolBadge}>
              🧠 FERRAMENTA DE IA
            </div>

            <h1 style={styles.title}>
              Crie sua estratégia
              <br />
              <span style={styles.highlight}>
                digital com IA.
              </span>
            </h1>

            <p style={styles.description}>
              Descubra oportunidades, monte uma oferta e tenha
              um plano prático para começar a transformar seu
              nicho em uma oportunidade digital.
            </p>
          </div>

          <div style={styles.status}>
            <span style={styles.statusDot}></span>
            IA ONLINE
          </div>
        </div>

        {/* CONFIGURAÇÃO */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <span style={styles.cardLabel}>
                CONFIGURAÇÃO
              </span>

              <h2 style={styles.cardTitle}>
                Configure sua estratégia
              </h2>

              <p style={styles.cardDescription}>
                Quanto mais contexto você fornecer, mais
                personalizada será a estratégia.
              </p>
            </div>

            <div style={styles.cardIcon}>
              🧠
            </div>
          </div>

          <div style={styles.formGrid}>

            <div style={styles.field}>
              <label style={styles.label}>
                Nicho ou área de atuação
              </label>

              <input
                type="text"
                value={nicho}
                onChange={(event) =>
                  setNicho(event.target.value)
                }
                placeholder="Ex.: Design gráfico, estética, marketing..."
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Objetivo principal
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
                <option>Vender produtos digitais</option>
                <option>Prestar serviços</option>
                <option>Aumentar vendas</option>
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Seu nível
              </label>

              <select
                value={nivel}
                onChange={(event) =>
                  setNivel(event.target.value)
                }
                style={styles.input}
              >
                <option>Iniciante</option>
                <option>Intermediário</option>
                <option>Avançado</option>
              </select>
            </div>

          </div>

          {erro && (
            <div style={styles.error}>
              <span>⚠️</span>
              {erro}
            </div>
          )}

          <div style={styles.actions}>
            <button
              onClick={gerarEstrategia}
              disabled={carregando}
              style={{
                ...styles.generateButton,
                opacity: carregando ? 0.65 : 1,
                cursor: carregando
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {carregando
                ? "⏳ Criando sua estratégia..."
                : "🚀 Gerar estratégia com IA"}
            </button>

            <button
              onClick={limpar}
              disabled={carregando}
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
                  ✓ ESTRATÉGIA GERADA PELA IA
                </div>

                <h2 style={styles.resultTitle}>
                  Sua estratégia digital
                </h2>

                <p style={styles.resultDescription}>
                  Transforme a análise em ações práticas para
                  desenvolver sua oportunidade.
                </p>
              </div>

              <button
                onClick={copiarResultado}
                style={styles.copyButton}
              >
                {copiado
                  ? "✓ Copiado"
                  : "📋 Copiar resultado"}
              </button>
            </div>

            <div style={styles.resultContent}>
              {resultado}
            </div>

            <div style={styles.resultActions}>
              <button
                onClick={gerarEstrategia}
                disabled={carregando}
                style={styles.secondaryButton}
              >
                🔄 Gerar novamente
              </button>

              <button
                onClick={limpar}
                style={styles.secondaryButton}
              >
                Limpar
              </button>
            </div>
          </section>
        )}

        {/* DICA */}
        <section style={styles.tipCard}>
          <div style={styles.tipIcon}>
            💡
          </div>

          <div>
            <strong style={styles.tipTitle}>
              Estratégia sem execução não gera resultado.
            </strong>

            <p style={styles.tipText}>
              Use o plano de 7 dias gerado pela IA LUCRATIVA
              e transforme cada etapa em uma ação concreta.
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
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  loadingBox: {
    textAlign: "center",
  },

  loadingLogo: {
    fontSize: "22px",
    fontWeight: "900",
    letterSpacing: "1px",
    color: "#00ffaa",
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
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  container: {
    width: "min(1000px, 100%)",
    margin: "0 auto",
    padding: "10px 0 50px",
  },

  toolHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "30px",
    marginBottom: "40px",
  },

  toolBadge: {
    display: "inline-block",
    color: "#00ffaa",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    marginBottom: "15px",
  },

  title: {
    fontSize: "clamp(36px, 6vw, 62px)",
    lineHeight: "1.05",
    margin: "0",
    fontWeight: "900",
    letterSpacing: "-1.5px",
  },

  highlight: {
    color: "#00ffaa",
  },

  description: {
    maxWidth: "680px",
    margin: "20px 0 0",
    color: "#8d8d8d",
    lineHeight: "1.7",
    fontSize: "15px",
  },

  status: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #1f3f34",
    background: "#08120f",
    color: "#00ffaa",
    borderRadius: "30px",
    padding: "9px 13px",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
    whiteSpace: "nowrap",
  },

  statusDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#00ffaa",
    boxShadow: "0 0 10px rgba(0,255,170,0.7)",
  },

  card: {
    background: "#0b0b0b",
    border: "1px solid #202020",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 15px 45px rgba(0,0,0,0.2)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "28px",
  },

  cardLabel: {
    display: "block",
    color: "#00ffaa",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    marginBottom: "7px",
  },

  cardTitle: {
    margin: "0 0 8px",
    fontSize: "23px",
    fontWeight: "800",
  },

  cardDescription: {
    margin: 0,
    color: "#777777",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  cardIcon: {
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    background: "#101010",
    border: "1px solid #242424",
    fontSize: "20px",
    flexShrink: 0,
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    color: "#cfcfcf",
    fontSize: "12px",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#050505",
    color: "#ffffff",
    border: "1px solid #303030",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "14px",
    outline: "none",
  },

  error: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "20px",
    padding: "13px 15px",
    borderRadius: "10px",
    background: "#190c0c",
    border: "1px solid #4a2222",
    color: "#ff9b9b",
    fontSize: "13px",
  },

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "22px",
  },

  generateButton: {
    flex: "1",
    minWidth: "220px",
    border: "1px solid #00ffaa",
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
    background: "#101010",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
  },

  resultCard: {
    marginTop: "25px",
    background: "#0b0b0b",
    border: "1px solid #1f3f34",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 15px 45px rgba(0,0,0,0.2)",
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    flexWrap: "wrap",
    paddingBottom: "20px",
    borderBottom: "1px solid #222222",
  },

  resultBadge: {
    color: "#00ffaa",
    fontSize: "10px",
    letterSpacing: "1.2px",
    fontWeight: "800",
  },

  resultTitle: {
    margin: "7px 0 0",
    fontSize: "23px",
  },

  resultDescription: {
    color: "#777777",
    fontSize: "13px",
    margin: "8px 0 0",
    lineHeight: "1.5",
  },

  copyButton: {
    border: "1px solid #284f43",
    background: "#0d1714",
    color: "#00ffaa",
    borderRadius: "10px",
    padding: "11px 15px",
    cursor: "pointer",
    fontWeight: "700",
  },

  resultContent: {
    marginTop: "24px",
    whiteSpace: "pre-wrap",
    color: "#dddddd",
    fontSize: "14px",
    lineHeight: "1.8",
    overflowWrap: "anywhere",
    background: "#050505",
    border: "1px solid #222222",
    borderRadius: "12px",
    padding: "22px",
  },

  resultActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "20px",
  },

  secondaryButton: {
    background: "#101010",
    color: "#ffffff",
    border: "1px solid #303030",
    borderRadius: "10px",
    padding: "11px 16px",
    fontWeight: "700",
    cursor: "pointer",
  },

  tipCard: {
    display: "flex",
    gap: "15px",
    alignItems: "flex-start",
    marginTop: "25px",
    padding: "22px",
    border: "1px solid #1d2d27",
    borderRadius: "15px",
    background: "#080d0b",
  },

  tipIcon: {
    fontSize: "22px",
  },

  tipTitle: {
    display: "block",
    marginBottom: "5px",
    color: "#00ffaa",
  },

  tipText: {
    margin: "0",
    color: "#888888",
    fontSize: "13px",
    lineHeight: "1.6",
  },
};
