"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function GeradorOfertas() {
  const router = useRouter();

  const [verificando, setVerificando] = useState(true);
  const [produto, setProduto] = useState("");
  const [publico, setPublico] = useState("");
  const [problema, setProblema] = useState("");
  const [objetivo, setObjetivo] = useState("Gerar vendas");
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

  async function gerarOferta() {
    if (!produto.trim() || !publico.trim() || !problema.trim()) {
      setErro(
        "Preencha produto, público e problema antes de gerar."
      );
      return;
    }

    setCarregando(true);
    setResultado("");
    setErro("");
    setCopiado(false);

    const prompt = `
Você é um especialista em criação de ofertas, posicionamento e vendas digitais.

Crie uma oferta estratégica para:

Produto ou serviço:
${produto}

Público-alvo:
${publico}

Principal problema do público:
${problema}

Objetivo:
${objetivo}

Crie uma oferta completa, clara, estratégica e persuasiva.

Estruture exatamente assim:

1. POSICIONAMENTO DA OFERTA
Explique como o produto ou serviço deve ser apresentado ao público.

2. GRANDE PROMESSA
Crie uma promessa clara, específica e realista.

3. GANCHO PRINCIPAL
Crie uma frase forte para chamar atenção.

4. BENEFÍCIOS
Liste pelo menos 5 benefícios percebidos pelo cliente.

5. ESTRUTURA DA OFERTA
Explique claramente o que o cliente recebe.

6. DIFERENCIAL
Mostre por que essa oferta pode ser escolhida em vez de alternativas comuns.

7. OBJEÇÕES
Liste 5 possíveis objeções do cliente e explique como respondê-las.

8. CTA
Crie uma chamada para ação direta e adequada ao objetivo informado.

9. VERSÃO PARA INSTAGRAM
Crie um texto curto e pronto para divulgar a oferta no Instagram.

10. PRÓXIMO PASSO
Dê uma ação prática para colocar a oferta em circulação.

REGRAS:

- Use português do Brasil.
- Seja específico para o público informado.
- Evite respostas genéricas.
- Não invente características que não foram informadas.
- Evite promessas financeiras garantidas.
- Não garanta resultados.
- Priorize clareza, valor percebido e aplicação prática.
- Entregue diretamente o resultado pronto.
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
          data.erro || "Não foi possível gerar a oferta."
        );
      }

      setResultado(data.resultado);
    } catch (error) {
      setErro(
        error.message || "Ocorreu um erro ao gerar a oferta."
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
    setProduto("");
    setPublico("");
    setProblema("");
    setObjetivo("Gerar vendas");
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
            💰 IA AUTOMÁTICA
          </div>

          <h1 style={styles.title}>
            Crie ofertas
            <br />
            <span style={styles.highlight}>
              mais estratégicas.
            </span>
          </h1>

          <p style={styles.description}>
            Transforme seu produto ou serviço em uma oferta
            clara, estratégica e preparada para apresentar
            ao seu público.
          </p>
        </div>

        {/* FORMULÁRIO */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <span style={styles.cardLabel}>
                GERADOR DE OFERTAS
              </span>

              <h2 style={styles.cardTitle}>
                Configure sua oferta
              </h2>

              <p style={styles.cardDescription}>
                Quanto mais informações você fornecer,
                mais específica será a estratégia criada pela IA.
              </p>
            </div>
          </div>

          <label style={styles.label}>
            Produto ou serviço
          </label>

          <input
            type="text"
            placeholder="Ex: Gestão de Instagram"
            value={produto}
            onChange={(event) =>
              setProduto(event.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Público-alvo
          </label>

          <input
            type="text"
            placeholder="Ex: Pequenos comerciantes"
            value={publico}
            onChange={(event) =>
              setPublico(event.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Principal problema do público
          </label>

          <input
            type="text"
            placeholder="Ex: Não conseguem atrair clientes pelo Instagram"
            value={problema}
            onChange={(event) =>
              setProblema(event.target.value)
            }
            style={styles.input}
          />

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
            <option>Gerar vendas</option>
            <option>Atrair clientes</option>
            <option>Gerar leads</option>
            <option>Aumentar conversões</option>
            <option>Lançar produto</option>
          </select>

          {erro && (
            <div style={styles.error}>
              {erro}
            </div>
          )}

          <div style={styles.actions}>
            <button
              type="button"
              onClick={gerarOferta}
              disabled={carregando}
              style={{
                ...styles.generateButton,
                opacity: carregando ? 0.7 : 1,
              }}
            >
              {carregando
                ? "Criando oferta..."
                : "✨ Criar oferta"}
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
                  Sua oferta está pronta
                </h2>
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
          </section>
        )}

        {/* DICA */}
        <section style={styles.tipCard}>
          <div style={styles.tipIcon}>
            🎯
          </div>

          <div>
            <strong style={styles.tipTitle}>
              Dica IA LUCRATIVA
            </strong>

            <p style={styles.tipText}>
              Uma boa oferta não depende apenas do produto.
              Ela precisa deixar claro qual problema resolve,
              para quem é e por que vale a pena considerar.
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

  container: {
    width: "min(920px, 100%)",
    margin: "0 auto",
    padding: "20px 0 60px",
    boxSizing: "border-box",
  },

  hero: {
    textAlign: "center",
    marginBottom: "35px",
  },

  badge: {
    display: "inline-block",
    border: "1px solid rgba(0, 255, 170, 0.35)",
    borderRadius: "30px",
    padding: "8px 14px",
    fontSize: "11px",
    letterSpacing: "1px",
    color: "#00ffaa",
    marginBottom: "20px",
    background: "rgba(0, 255, 170, 0.05)",
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
    maxWidth: "650px",
    margin: "22px auto 0",
    color: "#999999",
    lineHeight: "1.7",
    fontSize: "15px",
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
    marginTop: "3px",
  },

  generateButton: {
    flex: "1",
    minWidth: "200px",
    border: "1px solid #00ffaa",
    borderRadius: "10px",
    padding: "15px 20px",
    background: "#00ffaa",
    color: "#000000",
    fontWeight: "900",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.2s",
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
  },

  copyButton: {
    border: "1px solid #333333",
    background: "#151515",
    color: "#ffffff",
    borderRadius: "10px",
    padding: "11px 15px",
    cursor: "pointer",
    fontSize: "13px",
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
    overflowX: "auto",
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
    color: "#00ffaa",
  },

  tipText: {
    margin: "0",
    color: "#888888",
    fontSize: "13px",
    lineHeight: "1.6",
  },
};
