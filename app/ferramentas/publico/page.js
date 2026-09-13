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
      <header style={styles.header}>
        <div>
          <div style={styles.logo}>
            IA LUCRATIVA
          </div>

          <div style={styles.subtitle}>
            Gerador de Público com IA
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
            🎯 IA AUTOMÁTICA
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

        <section style={styles.card}>
          <label style={styles.label}>
            Seu nicho
          </label>

          <input
            type="text"
            placeholder="Ex: Design gráfico"
            value={nicho}
            onChange={(event) => setNicho(event.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>
            Produto ou serviço
          </label>

          <input
            type="text"
            placeholder="Ex: Identidade visual para empresas"
            value={produto}
            onChange={(event) => setProduto(event.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>
            Objetivo
          </label>

          <select
            value={objetivo}
            onChange={(event) => setObjetivo(event.target.value)}
            style={styles.input}
          >
            <option>Atrair clientes</option>
            <option>Gerar vendas</option>
            <option>Conseguir seguidores</option>
            <option>Gerar leads</option>
            <option>Aumentar autoridade</option>
          </select>

          {erro && (
            <div style={styles.error}>
              {erro}
            </div>
          )}

          <div style={styles.actions}>
            <button
              onClick={gerarPublico}
              disabled={carregando}
              style={{
                ...styles.generateButton,
                opacity: carregando ? 0.7 : 1,
              }}
            >
              {carregando
                ? "Analisando público..."
                : "✨ Gerar público"}
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
                  Seu público foi analisado
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

      <footer style={styles.footer}>
        <strong>
          IA LUCRATIVA
        </strong>

        <span>
          Transformando inteligência artificial em oportunidades.
        </span>

        <span>
          @ia.lucrativa1
        </span>
      </footer>
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
    background: "#101010",
    textDecoration: "none",
    border: "1px solid #333333",
    borderRadius: "10px",
    padding: "10px 15px",
    fontSize: "13px",
    cursor: "pointer",
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
