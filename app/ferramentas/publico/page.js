"use client";

import { useState } from "react";

export default function GeradorPublico() {
  const [nicho, setNicho] = useState("");
  const [produto, setProduto] = useState("");
  const [objetivo, setObjetivo] = useState("Atrair clientes");
  const [resultado, setResultado] = useState("");
  const [copiado, setCopiado] = useState(false);

  function gerarPublico() {
    if (!nicho.trim() || !produto.trim()) {
      setResultado("Preencha o nicho e o produto/serviço antes de gerar.");
      return;
    }

    const publico = `
PÚBLICO-ALVO IA LUCRATIVA

Nicho:
${nicho}

Produto/Serviço:
${produto}

Objetivo:
${objetivo}

1. PERFIL PRINCIPAL

Pessoas interessadas em ${nicho} que procuram maneiras de melhorar seus resultados, economizar tempo, resolver problemas ou alcançar novos objetivos utilizando soluções práticas.

2. CARACTERÍSTICAS

• Interesse em ${nicho}
• Busca por soluções simples e práticas
• Interesse em tecnologia e inovação
• Desejo de obter melhores resultados
• Pode estar começando ou buscando evolução
• Valoriza praticidade e economia de tempo

3. PRINCIPAIS DORES

• Falta de conhecimento
• Dificuldade para encontrar soluções
• Falta de tempo
• Medo de investir errado
• Dificuldade para conseguir resultados
• Não saber por onde começar

4. DESEJOS

• Conseguir resultados mais rapidamente
• Aprender algo novo
• Economizar tempo
• Aumentar oportunidades
• Ter mais segurança para agir
• Encontrar uma solução acessível

5. GATILHOS DE COMUNICAÇÃO

Utilize mensagens relacionadas a:

• Facilidade
• Transformação
• Resultado
• Economia de tempo
• Oportunidade
• Praticidade
• Começar do zero

6. IDEIAS DE CONTEÚDO

• "3 erros que impedem você de evoluir em ${nicho}"
• "Como começar em ${nicho} mesmo sendo iniciante"
• "5 estratégias simples para melhorar seus resultados"
• "O que ninguém te conta sobre ${nicho}"
• "Como economizar tempo usando tecnologia"
• "Passo a passo para sair do zero"

7. POSICIONAMENTO

Mostre que ${produto} pode ajudar o público a resolver um problema específico de maneira simples, prática e acessível.

8. CTA

"Quer descobrir como começar? Conheça a solução e dê o primeiro passo hoje."

PRÓXIMO PASSO:

Crie conteúdos direcionados para esse público e teste diferentes mensagens para descobrir quais geram mais interação, leads e clientes.
`;

    setResultado(publico.trim());
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
    } catch {
      setCopiado(false);
    }
  }

  function limpar() {
    setNicho("");
    setProduto("");
    setObjetivo("Atrair clientes");
    setResultado("");
    setCopiado(false);
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        <a href="/dashboard" style={styles.back}>
          ← Voltar para o Dashboard
        </a>

        <section style={styles.header}>
          <div style={styles.icon}>🎯</div>

          <h1 style={styles.title}>
            Gerador de Público
          </h1>

          <p style={styles.subtitle}>
            Descubra quem é o seu público e como criar uma comunicação mais estratégica.
          </p>
        </section>

        <section style={styles.card}>

          <label style={styles.label}>
            Qual é o seu nicho?
          </label>

          <input
            style={styles.input}
            value={nicho}
            onChange={(e) => setNicho(e.target.value)}
            placeholder="Ex: Marketing digital"
          />

          <label style={styles.label}>
            Qual produto ou serviço você oferece?
          </label>

          <input
            style={styles.input}
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
            placeholder="Ex: Consultoria de marketing"
          />

          <label style={styles.label}>
            Qual é o seu principal objetivo?
          </label>

          <select
            style={styles.input}
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
          >
            <option>Atrair clientes</option>
            <option>Gerar vendas</option>
            <option>Conseguir seguidores</option>
            <option>Gerar leads</option>
            <option>Aumentar autoridade</option>
          </select>

          <button
            style={styles.button}
            onClick={gerarPublico}
          >
            🎯 Gerar Público
          </button>

          <button
            style={styles.clearButton}
            onClick={limpar}
          >
            Limpar
          </button>

        </section>

        {resultado && (
          <section style={styles.resultCard}>

            <div style={styles.resultHeader}>
              <h2 style={styles.resultTitle}>
                Público gerado
              </h2>

              <button
                style={styles.copyButton}
                onClick={copiarResultado}
              >
                {copiado ? "✓ Copiado" : "Copiar"}
              </button>
            </div>

            <pre style={styles.result}>
              {resultado}
            </pre>

          </section>
        )}

        <section style={styles.tip}>
          <strong>💡 Dica IA LUCRATIVA</strong>
          <p style={styles.tipText}>
            Quanto melhor você conhecer o seu público, mais fácil será criar
            conteúdos, ofertas e estratégias que realmente geram conexão.
          </p>
        </section>

        <footer style={styles.footer}>
          IA LUCRATIVA • Transforme IA em oportunidades.
          <br />
          @ia.lucrativa1
        </footer>

      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050505",
    color: "#ffffff",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  back: {
    color: "#aaa",
    textDecoration: "none",
    fontSize: "14px",
  },

  header: {
    textAlign: "center",
    marginTop: "45px",
    marginBottom: "35px",
  },

  icon: {
    fontSize: "42px",
    marginBottom: "15px",
  },

  title: {
    fontSize: "38px",
    margin: "0 0 12px",
  },

  subtitle: {
    color: "#aaa",
    fontSize: "16px",
    lineHeight: "1.6",
    maxWidth: "650px",
    margin: "0 auto",
  },

  card: {
    background: "#101010",
    border: "1px solid #242424",
    borderRadius: "18px",
    padding: "25px",
    marginBottom: "25px",
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "8px",
    marginTop: "18px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "#080808",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
  },

  button: {
    width: "100%",
    marginTop: "25px",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#000000",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },

  clearButton: {
    width: "100%",
    marginTop: "10px",
    padding: "12px",
    border: "1px solid #333",
    borderRadius: "10px",
    background: "transparent",
    color: "#aaa",
    fontWeight: "bold",
    cursor: "pointer",
  },

  resultCard: {
    background: "#101010",
    border: "1px solid #242424",
    borderRadius: "18px",
    padding: "25px",
    marginBottom: "25px",
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  resultTitle: {
    margin: 0,
    fontSize: "21px",
  },

  copyButton: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#181818",
    color: "#fff",
    cursor: "pointer",
  },

  result: {
    whiteSpace: "pre-wrap",
    fontFamily: "Arial, sans-serif",
    color: "#ddd",
    lineHeight: "1.7",
    fontSize: "14px",
    margin: 0,
  },

  tip: {
    background: "#0d0d0d",
    border: "1px solid #222",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "35px",
  },

  tipText: {
    color: "#aaa",
    lineHeight: "1.6",
    marginBottom: 0,
  },

  footer: {
    textAlign: "center",
    color: "#666",
    fontSize: "13px",
    lineHeight: "1.8",
    paddingBottom: "30px",
  },
};
