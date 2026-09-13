"use client";

import { useState } from "react";

export default function GeradorIdeiasPage() {
  const [nicho, setNicho] = useState("");
  const [objetivo, setObjetivo] = useState("Criar renda");
  const [experiencia, setExperiencia] = useState("Iniciante");
  const [resultado, setResultado] = useState("");
  const [copiado, setCopiado] = useState(false);

  function gerarIdeias() {
    if (!nicho.trim()) {
      alert("Informe o seu nicho antes de gerar as ideias.");
      return;
    }

    const ideias = `
IDEIAS DE OPORTUNIDADES — IA LUCRATIVA

Nicho: ${nicho}
Objetivo: ${objetivo}
Nível: ${experiencia}

1. SERVIÇO COM IA

Criar serviços utilizando inteligência artificial para empresas ou
profissionais do nicho de ${nicho}.

Exemplo:
Produção de textos, conteúdos, descrições, planejamento ou materiais
personalizados.

Como começar:
• Escolha um serviço específico.
• Crie 3 exemplos demonstrativos.
• Monte uma oferta simples.
• Apresente para potenciais clientes.


2. CONTEÚDO ESPECIALIZADO

Criar um perfil ou página focada em conteúdos sobre ${nicho}.

Você pode utilizar IA para:
• Criar ideias de posts.
• Criar legendas.
• Criar calendários de conteúdo.
• Pesquisar temas.
• Criar chamadas e títulos.


3. PRODUTO DIGITAL

Transformar conhecimento relacionado a ${nicho} em um produto digital.

Possibilidades:
• E-book.
• Guia prático.
• Checklist.
• Templates.
• Aula.
• Mini curso.
• Material de apoio.


4. AUTOMAÇÃO

Criar soluções simples utilizando IA para economizar tempo de
profissionais ou empresas do nicho de ${nicho}.

Exemplos:
• Respostas automáticas.
• Organização de informações.
• Geração de conteúdo.
• Atendimento inicial.
• Criação de documentos.


5. CONSULTORIA

Oferecer orientação para pessoas ou empresas que desejam melhorar
seus resultados utilizando estratégias relacionadas a ${nicho}.

Comece com um problema específico e transforme sua solução em uma
oferta clara.


6. GESTÃO DE CONTEÚDO

Oferecer criação e planejamento de conteúdo para empresas do nicho
de ${nicho}.

Você pode combinar:
• IA.
• Design.
• Estratégia.
• Planejamento.
• Copywriting.


7. KIT DIGITAL

Criar um conjunto de materiais prontos para pessoas que trabalham
com ${nicho}.

Exemplos:
• Templates.
• Prompts.
• Checklists.
• Calendários.
• Modelos de mensagens.
• Scripts.


8. MICROAGÊNCIA

Criar uma pequena operação especializada em soluções com IA para
o nicho de ${nicho}.

Você pode começar sozinho e utilizar ferramentas de IA para
aumentar sua capacidade de entrega.


PRÓXIMO PASSO

Escolha UMA das ideias acima.

Não tente executar todas ao mesmo tempo.

Comece pela oportunidade que:
• Resolve um problema real.
• Pode ser iniciada com poucos recursos.
• Você consegue aprender rapidamente.
• Possui pessoas ou empresas dispostas a pagar.

OBJETIVO:

${objetivo}

A IA pode acelerar o processo, mas o resultado depende da execução,
da oferta e da capacidade de resolver um problema real.
`;

    setResultado(ideias.trim());
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
    setObjetivo("Criar renda");
    setExperiencia("Iniciante");
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
              Gerador de Ideias
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
            Gerador de Ideias
          </h1>

          <p style={styles.description}>
            Descubra oportunidades de negócios, serviços e produtos
            que podem ser explorados utilizando inteligência artificial.
          </p>
        </div>

        <div style={styles.grid}>
          <section style={styles.card}>
            <div style={styles.cardTop}>
              <span style={styles.icon}>💡</span>

              <div>
                <h2 style={styles.cardTitle}>
                  Encontre oportunidades
                </h2>

                <p style={styles.cardDescription}>
                  Informe algumas informações para começar.
                </p>
              </div>
            </div>

            <div style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Qual é o seu nicho?
                </label>

                <input
                  type="text"
                  value={nicho}
                  onChange={(e) => setNicho(e.target.value)}
                  placeholder="Ex.: restaurantes, estética, tecnologia..."
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Qual é o seu objetivo?
                </label>

                <select
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  style={styles.input}
                >
                  <option value="Criar renda">
                    Criar renda
                  </option>

                  <option value="Criar um negócio">
                    Criar um negócio
                  </option>

                  <option value="Conseguir clientes">
                    Conseguir clientes
                  </option>

                  <option value="Criar produto digital">
                    Criar produto digital
                  </option>

                  <option value="Criar serviços">
                    Criar serviços
                  </option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Seu nível de experiência
                </label>

                <select
                  value={experiencia}
                  onChange={(e) => setExperiencia(e.target.value)}
                  style={styles.input}
                >
                  <option value="Iniciante">
                    Iniciante
                  </option>

                  <option value="Intermediário">
                    Intermediário
                  </option>

                  <option value="Avançado">
                    Avançado
                  </option>
                </select>
              </div>

              <button
                onClick={gerarIdeias}
                style={styles.generateButton}
              >
                💡 Gerar ideias
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
                  Oportunidades
                </h2>

                <p style={styles.cardDescription}>
                  Suas ideias aparecerão aqui.
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
                    💡
                  </div>

                  <strong>
                    Encontre novas oportunidades
                  </strong>

                  <p>
                    Informe seu nicho e objetivo para gerar
                    ideias.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <section style={styles.tip}>
          <div style={styles.tipIcon}>
            🚀
          </div>

          <div>
            <strong style={styles.tipTitle}>
              Pense como um empreendedor
            </strong>

            <p style={styles.tipText}>
              Uma boa ideia resolve um problema. Depois de encontrar
              uma oportunidade, valide se existe demanda antes de
              investir tempo e dinheiro.
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
