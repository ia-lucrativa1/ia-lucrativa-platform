"use client";

import { useState } from "react";

export default function GeradorOfertasPage() {
  const [produto, setProduto] = useState("");
  const [publico, setPublico] = useState("");
  const [problema, setProblema] = useState("");
  const [objetivo, setObjetivo] = useState("Gerar vendas");
  const [resultado, setResultado] = useState("");
  const [copiado, setCopiado] = useState(false);

  function gerarOferta() {
    if (!produto.trim() || !publico.trim() || !problema.trim()) {
      alert("Preencha produto, público e problema antes de gerar.");
      return;
    }

    const oferta = `
OFERTA ESTRATÉGICA — IA LUCRATIVA

PRODUTO/SERVIÇO:
${produto}

PÚBLICO:
${publico}

PROBLEMA PRINCIPAL:
${problema}

OBJETIVO:
${objetivo}


━━━━━━━━━━━━━━━━━━━━
1. POSICIONAMENTO DA OFERTA
━━━━━━━━━━━━━━━━━━━━

Apresente ${produto} como uma solução prática para pessoas que
fazem parte do público "${publico}" e enfrentam o problema:

"${problema}".


━━━━━━━━━━━━━━━━━━━━
2. PROMESSA PRINCIPAL
━━━━━━━━━━━━━━━━━━━━

Uma forma simples e estratégica de ajudar ${publico} a avançar
em direção ao resultado desejado, sem complicar o processo.


━━━━━━━━━━━━━━━━━━━━
3. GANCHO
━━━━━━━━━━━━━━━━━━━━

Você ainda está enfrentando ${problema}?

Existe uma forma mais simples de começar a resolver isso.


━━━━━━━━━━━━━━━━━━━━
4. BENEFÍCIOS
━━━━━━━━━━━━━━━━━━━━

• Mais praticidade.
• Economia de tempo.
• Processo mais organizado.
• Clareza sobre o próximo passo.
• Solução direcionada ao público.
• Possibilidade de alcançar melhores resultados.


━━━━━━━━━━━━━━━━━━━━
5. ESTRUTURA DA OFERTA
━━━━━━━━━━━━━━━━━━━━

OFERTA:

${produto}

PARA QUEM:

${publico}

O QUE RESOLVE:

${problema}

O QUE O CLIENTE RECEBE:

• Solução principal.
• Orientação para aplicação.
• Material de apoio quando necessário.
• Estratégia prática.
• Próximos passos.


━━━━━━━━━━━━━━━━━━━━
6. CTA
━━━━━━━━━━━━━━━━━━━━

Quer começar a resolver esse problema?

Conheça ${produto} e descubra como essa solução pode ajudar você.


━━━━━━━━━━━━━━━━━━━━
7. VERSÃO CURTA PARA INSTAGRAM
━━━━━━━━━━━━━━━━━━━━

Você está cansado de lidar com ${problema}?

${produto} foi pensado para ${publico} que querem uma solução
mais prática e estratégica.

Quer saber como funciona?

Entre em contato e conheça a oferta.


━━━━━━━━━━━━━━━━━━━━
8. PRÓXIMO PASSO
━━━━━━━━━━━━━━━━━━━━

Não tente vender apenas o produto.

Mostre primeiro o problema.

Depois apresente a transformação possível.

Por fim, explique claramente por que ${produto} é uma boa opção
para esse público.

OBJETIVO DA OFERTA:

${objetivo}
`;

    setResultado(oferta.trim());
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
    setProduto("");
    setPublico("");
    setProblema("");
    setObjetivo("Gerar vendas");
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
              Gerador de Ofertas
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
            Gerador de Ofertas
          </h1>

          <p style={styles.description}>
            Transforme seu produto ou serviço em uma oferta mais clara,
            estratégica e direcionada para o seu público.
          </p>
        </div>

        <div style={styles.grid}>
          <section style={styles.card}>
            <div style={styles.cardTop}>
              <span style={styles.icon}>💰</span>

              <div>
                <h2 style={styles.cardTitle}>
                  Monte sua oferta
                </h2>

                <p style={styles.cardDescription}>
                  Informe os dados do seu produto ou serviço.
                </p>
              </div>
            </div>

            <div style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Produto ou serviço
                </label>

                <input
                  type="text"
                  value={produto}
                  onChange={(e) => setProduto(e.target.value)}
                  placeholder="Ex.: gestão de Instagram"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Público-alvo
                </label>

                <input
                  type="text"
                  value={publico}
                  onChange={(e) => setPublico(e.target.value)}
                  placeholder="Ex.: pequenos negócios"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Principal problema
                </label>

                <textarea
                  value={problema}
                  onChange={(e) => setProblema(e.target.value)}
                  placeholder="Qual problema seu produto resolve?"
                  style={styles.textarea}
                />
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
                  <option value="Gerar vendas">
                    Gerar vendas
                  </option>

                  <option value="Atrair clientes">
                    Atrair clientes
                  </option>

                  <option value="Gerar leads">
                    Gerar leads
                  </option>

                  <option value="Aumentar conversões">
                    Aumentar conversões
                  </option>

                  <option value="Lançar produto">
                    Lançar produto
                  </option>
                </select>
              </div>

              <button
                onClick={gerarOferta}
                style={styles.generateButton}
              >
                💰 Criar minha oferta
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
                  Oferta gerada
                </h2>

                <p style={styles.cardDescription}>
                  Sua estrutura comercial aparecerá aqui.
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
                    💰
                  </div>

                  <strong>
                    Sua oferta aparecerá aqui
                  </strong>

                  <p>
                    Preencha os campos ao lado para começar.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <section style={styles.tip}>
          <div style={styles.tipIcon}>🎯</div>

          <div>
            <strong style={styles.tipTitle}>
              Uma boa oferta começa pelo problema
            </strong>

            <p style={styles.tipText}>
              Antes de falar sobre preço ou características,
              mostre que você entende o problema do cliente e
              apresente uma solução clara.
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

  textarea: {
    width: "100%",
    minHeight: "110px",
    boxSizing: "border-box",
    resize: "vertical",
    background: "#050505",
    border: "1px solid #292929",
    color: "#ffffff",
    padding: "14px",
    borderRadius: "10px",
    outline: "none",
    fontSize: "13px",
    fontFamily: "Arial, Helvetica, sans-serif",
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
