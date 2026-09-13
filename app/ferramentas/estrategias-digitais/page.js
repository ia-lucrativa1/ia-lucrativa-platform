"use client";

import { useState } from "react";

export default function EstrategiasDigitais() {
  const [nicho, setNicho] = useState("");
  const [objetivo, setObjetivo] = useState("Criar renda");
  const [nivel, setNivel] = useState("Iniciante");
  const [resultado, setResultado] = useState("");
  const [copiado, setCopiado] = useState(false);

  function gerarEstrategia() {
    if (!nicho.trim()) {
      setResultado("Preencha o nicho antes de gerar sua estratégia.");
      return;
    }

    const estrategia = `
ESTRATÉGIA DIGITAL IA LUCRATIVA

Nicho:
${nicho}

Objetivo:
${objetivo}

Nível:
${nivel}

━━━━━━━━━━━━━━━━━━━━

1. DEFINA SUA OPORTUNIDADE

Analise o nicho ${nicho} e identifique um problema específico que as pessoas enfrentam.

Procure problemas que tenham:
• Demanda
• Urgência
• Possibilidade de solução
• Pessoas dispostas a pagar

━━━━━━━━━━━━━━━━━━━━

2. ESCOLHA SUA SOLUÇÃO

Crie uma solução simples utilizando inteligência artificial.

Você pode começar oferecendo:
• Serviços
• Conteúdo
• Consultoria
• Automação
• Produtos digitais
• Soluções personalizadas

━━━━━━━━━━━━━━━━━━━━

3. CONSTRUA SUA PRESENÇA

Crie um perfil profissional voltado para ${nicho}.

Publique conteúdos que:
• Ensinem
• Mostrem problemas
• Apresentem soluções
• Gerem autoridade
• Mostrem resultados

━━━━━━━━━━━━━━━━━━━━

4. CRIE UMA OFERTA

Transforme sua solução em uma oferta clara.

Sua oferta precisa responder:

"Qual problema eu resolvo?"

"Para quem?"

"Qual resultado posso ajudar a alcançar?"

"Por que a pessoa deveria escolher minha solução?"

━━━━━━━━━━━━━━━━━━━━

5. ATRAIA AS PRIMEIRAS PESSOAS

Comece de forma orgânica.

Utilize:
• Instagram
• WhatsApp
• Grupos
• Networking
• Google
• Indicações
• Conteúdo estratégico

━━━━━━━━━━━━━━━━━━━━

6. FAÇA SUA PRIMEIRA VENDA

Entre em contato com potenciais clientes de forma personalizada.

Evite apenas enviar uma oferta.

Primeiro:
1. Entenda o problema.
2. Mostre que identificou a necessidade.
3. Apresente sua solução.
4. Explique o benefício.
5. Faça uma chamada para ação.

━━━━━━━━━━━━━━━━━━━━

7. ESCALABILIDADE

Depois de validar a primeira solução, transforme o processo em algo repetível.

Você pode:
• Automatizar tarefas
• Criar produtos digitais
• Aumentar o número de clientes
• Criar novos serviços
• Construir uma audiência
• Criar uma operação com IA

━━━━━━━━━━━━━━━━━━━━

PLANO DE AÇÃO — 7 DIAS

DIA 1
Escolha um problema específico dentro de ${nicho}.

DIA 2
Pesquise o público e seus principais problemas.

DIA 3
Crie uma solução inicial usando IA.

DIA 4
Monte seu posicionamento e oferta.

DIA 5
Publique conteúdos relacionados ao problema.

DIA 6
Entre em contato com potenciais clientes.

DIA 7
Analise os resultados e melhore sua estratégia.

━━━━━━━━━━━━━━━━━━━━

PRÓXIMO PASSO

Não tente construir tudo de uma vez.

Comece com um problema, uma solução e uma oferta.

A execução consistente é o que transforma uma oportunidade em resultado.
`;

    setResultado(estrategia.trim());
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
    setObjetivo("Criar renda");
    setNivel("Iniciante");
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
          <div style={styles.icon}>🚀</div>

          <h1 style={styles.title}>
            Estratégias Digitais
          </h1>

          <p style={styles.subtitle}>
            Crie um plano estratégico para transformar seu conhecimento,
            habilidades e inteligência artificial em oportunidades digitais.
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
            placeholder="Ex: Design gráfico, marketing, fitness..."
          />

          <label style={styles.label}>
            Qual é o seu objetivo?
          </label>

          <select
            style={styles.input}
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
          >
            <option>Criar renda</option>
            <option>Criar um negócio</option>
            <option>Conseguir clientes</option>
            <option>Vender produtos digitais</option>
            <option>Prestar serviços</option>
            <option>Aumentar vendas</option>
          </select>

          <label style={styles.label}>
            Qual é o seu nível?
          </label>

          <select
            style={styles.input}
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
          >
            <option>Iniciante</option>
            <option>Intermediário</option>
            <option>Avançado</option>
          </select>

          <button
            style={styles.button}
            onClick={gerarEstrategia}
          >
            🚀 Gerar Estratégia
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
                Sua estratégia
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
            Estratégia não significa fazer tudo. Significa saber qual é o
            próximo passo mais importante e executá-lo com consistência.
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
    maxWidth: "680px",
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
