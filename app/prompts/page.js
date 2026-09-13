"use client";

import { useState } from "react";

export default function Prompts() {
  const [categoria, setCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [copiado, setCopiado] = useState(null);

  const categorias = [
    "Todos",
    "Conteúdo",
    "Vendas",
    "Negócios",
    "Marketing",
    "Instagram",
  ];

  const prompts = [
    {
      id: 1,
      categoria: "Conteúdo",
      icon: "✍️",
      titulo: "Ideias de conteúdo",
      descricao: "Gere ideias de conteúdo para qualquer nicho.",
      prompt:
        "Me dê 10 ideias de conteúdo para Instagram no nicho de [NICHO]. Para cada ideia, informe o título, o gancho inicial e o objetivo do conteúdo.",
    },
    {
      id: 2,
      categoria: "Instagram",
      icon: "📱",
      titulo: "Calendário de posts",
      descricao: "Monte um calendário estratégico de conteúdo.",
      prompt:
        "Crie um calendário de 30 dias de conteúdo para Instagram no nicho de [NICHO], alternando entre conteúdo educativo, autoridade, conexão, prova social e vendas.",
    },
    {
      id: 3,
      categoria: "Vendas",
      icon: "💰",
      titulo: "Oferta irresistível",
      descricao: "Crie uma oferta mais atrativa para seu produto.",
      prompt:
        "Crie uma oferta irresistível para o produto [PRODUTO]. Defina promessa, benefícios, diferenciais, bônus, objeções e uma chamada para ação.",
    },
    {
      id: 4,
      categoria: "Marketing",
      icon: "🎯",
      titulo: "Público-alvo",
      descricao: "Descubra e compreenda melhor seu público.",
      prompt:
        "Analise o público-alvo para [PRODUTO/SERVIÇO]. Identifique idade, interesses, dores, desejos, objeções, problemas e motivos que podem levar essa pessoa a comprar.",
    },
    {
      id: 5,
      categoria: "Negócios",
      icon: "💡",
      titulo: "Ideias de negócio",
      descricao: "Encontre oportunidades de negócios com IA.",
      prompt:
        "Me apresente 10 ideias de negócios que podem ser iniciadas com baixo investimento usando inteligência artificial. Para cada uma, explique como ganhar dinheiro e como conseguir os primeiros clientes.",
    },
    {
      id: 6,
      categoria: "Vendas",
      icon: "🗣️",
      titulo: "Mensagem para cliente",
      descricao: "Crie uma abordagem profissional para prospectar clientes.",
      prompt:
        "Crie uma mensagem curta, profissional e natural para abordar um possível cliente que trabalha com [NICHO]. Apresente o problema, minha solução e termine com uma chamada para conversa, sem parecer spam.",
    },
    {
      id: 7,
      categoria: "Instagram",
      icon: "🔥",
      titulo: "Gancho viral",
      descricao: "Crie ganchos fortes para prender atenção.",
      prompt:
        "Crie 20 ganchos curtos e fortes para conteúdos sobre [TEMA]. Os primeiros segundos devem despertar curiosidade e fazer a pessoa querer continuar lendo.",
    },
    {
      id: 8,
      categoria: "Conteúdo",
      icon: "📝",
      titulo: "Legenda profissional",
      descricao: "Crie legendas estratégicas para suas publicações.",
      prompt:
        "Crie uma legenda profissional para Instagram sobre [TEMA]. Comece com um gancho forte, desenvolva a ideia de forma simples, gere valor e finalize com uma chamada para ação.",
    },
    {
      id: 9,
      categoria: "Marketing",
      icon: "📊",
      titulo: "Análise de concorrentes",
      descricao: "Entenda como melhorar seu posicionamento.",
      prompt:
        "Analise o mercado de [NICHO]. Liste os principais tipos de concorrentes, seus pontos fortes, pontos fracos e oportunidades que eu poderia explorar para me diferenciar.",
    },
    {
      id: 10,
      categoria: "Negócios",
      icon: "🚀",
      titulo: "Plano para começar",
      descricao: "Transforme uma ideia em um plano de ação.",
      prompt:
        "Crie um plano de ação de 30 dias para começar um negócio de [TIPO DE NEGÓCIO] do zero. Organize as tarefas por semana e priorize ações que possam gerar os primeiros resultados.",
    },
  ];

  const copiarPrompt = async (prompt, id) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiado(id);

      setTimeout(() => {
        setCopiado(null);
      }, 2000);
    } catch {
      alert("Não foi possível copiar o prompt.");
    }
  };

  const promptsFiltrados = prompts.filter((item) => {
    const correspondeCategoria =
      categoria === "Todos" || item.categoria === categoria;

    const textoBusca = `${item.titulo} ${item.descricao} ${item.categoria}`.toLowerCase();

    const correspondeBusca = textoBusca.includes(busca.toLowerCase());

    return correspondeCategoria && correspondeBusca;
  });

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.brand}>IA LUCRATIVA</div>
          <div style={styles.subtitle}>Biblioteca de prompts</div>
        </div>

        <a href="/dashboard" style={styles.backButton}>
          ← Dashboard
        </a>
      </header>

      <section style={styles.hero}>
        <span style={styles.badge}>🧠 PROMPTS INTELIGENTES</span>

        <h1 style={styles.title}>
          Prompts prontos para
          <br />
          <span style={styles.highlight}>usar IA melhor.</span>
        </h1>

        <p style={styles.description}>
          Encontre comandos prontos para criar conteúdo, vender, divulgar seu
          negócio e encontrar novas oportunidades.
        </p>

        <div style={styles.searchBox}>
          <span>🔎</span>

          <input
            type="text"
            placeholder="Pesquisar prompts..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={styles.input}
          />
        </div>
      </section>

      <section style={styles.container}>
        <div style={styles.categories}>
          {categorias.map((item) => (
            <button
              key={item}
              onClick={() => setCategoria(item)}
              style={{
                ...styles.categoryButton,
                ...(categoria === item ? styles.categoryActive : {}),
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Biblioteca de prompts</h2>
            <p style={styles.sectionDescription}>
              Escolha um prompt e adapte os campos entre colchetes.
            </p>
          </div>

          <span style={styles.counter}>
            {promptsFiltrados.length} prompts
          </span>
        </div>

        <div style={styles.grid}>
          {promptsFiltrados.map((item) => (
            <article key={item.id} style={styles.card}>
              <div style={styles.cardTop}>
                <div style={styles.icon}>{item.icon}</div>

                <span style={styles.tag}>{item.categoria}</span>
              </div>

              <h3 style={styles.cardTitle}>{item.titulo}</h3>

              <p style={styles.cardDescription}>{item.descricao}</p>

              <div style={styles.promptBox}>
                <p>{item.prompt}</p>
              </div>

              <button
                onClick={() => copiarPrompt(item.prompt, item.id)}
                style={styles.copyButton}
              >
                {copiado === item.id ? "✓ Copiado!" : "📋 Copiar prompt"}
              </button>
            </article>
          ))}
        </div>

        {promptsFiltrados.length === 0 && (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>🔍</div>
            <h3>Nenhum prompt encontrado</h3>
            <p>
              Tente pesquisar outro termo ou selecione a categoria "Todos".
            </p>
          </div>
        )}
      </section>

      <section style={styles.tip}>
        <div style={styles.tipIcon}>💎</div>

        <div>
          <h3 style={styles.tipTitle}>Dica IA LUCRATIVA</h3>
          <p style={styles.tipText}>
            Quanto mais informações você fornecer para a IA, mais específica
            tende a ser a resposta. Substitua os campos entre [COLCHETES] antes
            de enviar o prompt.
          </p>
        </div>
      </section>

      <footer style={styles.footer}>
        <strong>IA LUCRATIVA</strong>
        <p>Inteligência artificial para criar novas oportunidades.</p>
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

  header: {
    minHeight: "75px",
    padding: "0 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #222",
    background: "#080808",
  },

  brand: {
    fontSize: "17px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  subtitle: {
    color: "#777",
    fontSize: "11px",
    marginTop: "4px",
  },

  backButton: {
    color: "#ffffff",
    textDecoration: "none",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13px",
  },

  hero: {
    maxWidth: "850px",
    margin: "0 auto",
    padding: "75px 6% 50px",
    textAlign: "center",
  },

  badge: {
    display: "inline-block",
    border: "1px solid #333",
    borderRadius: "50px",
    padding: "8px 14px",
    color: "#aaa",
    fontSize: "11px",
    letterSpacing: "1px",
    marginBottom: "22px",
  },

  title: {
    fontSize: "clamp(40px, 7vw, 68px)",
    lineHeight: "1",
    letterSpacing: "-3px",
    margin: 0,
    fontWeight: "900",
  },

  highlight: {
    color: "#8b5cf6",
  },

  description: {
    maxWidth: "650px",
    margin: "24px auto",
    color: "#999",
    fontSize: "16px",
    lineHeight: "1.6",
  },

  searchBox: {
    maxWidth: "550px",
    margin: "30px auto 0",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#0d0d0d",
    border: "1px solid #292929",
    borderRadius: "13px",
  },

  input: {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#ffffff",
    fontSize: "14px",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 6% 50px",
  },

  categories: {
    display: "flex",
    gap: "9px",
    overflowX: "auto",
    paddingBottom: "25px",
  },

  categoryButton: {
    whiteSpace: "nowrap",
    background: "#0d0d0d",
    color: "#aaa",
    border: "1px solid #292929",
    borderRadius: "50px",
    padding: "9px 15px",
    cursor: "pointer",
    fontSize: "12px",
  },

  categoryActive: {
    background: "#ffffff",
    color: "#000000",
    borderColor: "#ffffff",
    fontWeight: "700",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "22px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "23px",
  },

  sectionDescription: {
    color: "#777",
    fontSize: "12px",
    margin: "7px 0 0",
  },

  counter: {
    color: "#777",
    fontSize: "12px",
    whiteSpace: "nowrap",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },

  card: {
    background: "#0d0d0d",
    border: "1px solid #222",
    borderRadius: "18px",
    padding: "22px",
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "18px",
  },

  icon: {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#171717",
    borderRadius: "13px",
    fontSize: "23px",
  },

  tag: {
    color: "#aaa",
    background: "#171717",
    border: "1px solid #292929",
    borderRadius: "50px",
    padding: "6px 10px",
    fontSize: "10px",
  },

  cardTitle: {
    margin: "0 0 8px",
    fontSize: "18px",
  },

  cardDescription: {
    color: "#888",
    fontSize: "13px",
    lineHeight: "1.5",
    margin: 0,
  },

  promptBox: {
    marginTop: "18px",
    padding: "14px",
    background: "#080808",
    border: "1px solid #1f1f1f",
    borderRadius: "11px",
  },

  promptBoxText: {
    color: "#aaa",
    fontSize: "12px",
    lineHeight: "1.6",
  },

  copyButton: {
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    background: "#ffffff",
    color: "#000000",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "12px",
  },

  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#777",
  },

  emptyIcon: {
    fontSize: "35px",
    marginBottom: "12px",
  },

  tip: {
    maxWidth: "900px",
    margin: "0 auto 60px",
    padding: "22px",
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    background: "#0d0d0d",
    border: "1px solid #222",
    borderRadius: "16px",
  },

  tipIcon: {
    fontSize: "25px",
  },

  tipTitle: {
    margin: "0 0 6px",
    fontSize: "15px",
  },

  tipText: {
    margin: 0,
    color: "#888",
    fontSize: "12px",
    lineHeight: "1.6",
  },

  footer: {
    textAlign: "center",
    borderTop: "1px solid #222",
    padding: "30px 20px",
    color: "#777",
    fontSize: "12px",
  },
};
