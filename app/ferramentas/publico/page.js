"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function GeradorPublico() {
  const router = useRouter();

  const [verificando, setVerificando] = useState(true);

  const [nicho, setNicho] = useState("");
  const [produto, setProduto] = useState("");
  const [objetivo, setObjetivo] = useState("Atrair clientes");
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
              🎯 FERRAMENTA DE IA
            </div>

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

          <div style={styles.status}>
            <span style={styles.statusDot}></span>
            IA ONLINE
          </div>
        </div>

        {/* FORMULÁRIO */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <span style={styles.cardLabel}>
                CONFIGURAÇÃO
              </span>

              <h2 style={styles.cardTitle}>
                Defina seu público
              </h2>
            </div>

            <div style={styles.cardIcon}>
              🎯
            </div>
          </div>

          <div style={styles.formGrid}>

            <div style={styles.field}>
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
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Produto ou serviço
              </label>

              <input
                type="text"
                placeholder="Ex: Identidade visual para empresas"
                value={produto}
                onChange={(event) =>
                  setProduto(event.target.value)
                }
                style={styles.input}
              />
            </div>

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
              <option>Atrair clientes</option>
              <option>Gerar vendas</option>
              <option>Conseguir seguidores</option>
              <option>Gerar leads</option>
              <option>Aumentar autoridade</option>
            </select>
          </div>

          {erro && (
            <div style={styles.error}>
              <span>⚠️</span>
              {erro}
            </div>
          )}

          <div style={styles.actions}>
            <button
              onClick={gerarPublico}
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
                ? "⏳ Analisando público..."
                : "✨ Gerar análise de público"}
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
                  ✓ RESULTADO GERADO PELA IA
                </div>

                <h2 style={styles.resultTitle}>
                  Seu público foi analisado
                </h2>

                <p style={styles.resultDescription}>
                  Use esta análise para orientar seu conteúdo,
                  posicionamento e comunicação.
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

            <div style={styles.result}>
              {resultado}
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
              Dica IA LUCRATIVA
            </strong>

            <p style={styles.tipText}>
              Quanto melhor você entende as dores e desejos
              do público, mais fácil fica criar conteúdo,
              ofertas e estratégias relevantes.
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
    fontFamily: "Arial, sans-serif",
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
    maxWidth: "650px",
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
    alignItems: "center",
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
    margin: "0",
    fontSize: "22px",
    fontWeight: "800",
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
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
  },

  field: {
    width: "100%",
  },

  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#dddddd",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#050505",
    color: "#ffffff",
    border: "1px solid #303030",
    borderRadius: "10px",
    padding: "14px",
    marginBottom: "20px",
    fontSize: "14px",
    outline: "none",
  },

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "3px",
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

  error: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#190c0c",
    border: "1px solid #4a2222",
    color: "#ff9b9b",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "20px",
    fontSize: "13px",
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
    marginBottom: "25px",
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

  result: {
    whiteSpace: "pre-wrap",
    background: "#050505",
    border: "1px solid #222222",
    borderRadius: "12px",
    padding: "22px",
    color: "#dddddd",
    lineHeight: "1.75",
    fontSize: "14px",
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
