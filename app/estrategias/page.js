"use client";

import { useState } from "react";

export default function Estrategias() {
  const [categoria, setCategoria] = useState("Todas");
  const [busca, setBusca] = useState("");

  const categorias = [
    "Todas",
    "Começar do Zero",
    "Conteúdo",
    "Vendas",
    "Instagram",
    "Negócios",
  ];

  const estrategias = [
    {
      id: 1,
      icon: "🚀",
      categoria: "Começar do Zero",
      titulo: "Saia da estaca 0",
      descricao:
        "Um caminho simples para transformar uma ideia em uma primeira oportunidade digital.",
      passos: [
        "Escolha um problema que você consegue resolver.",
        "Defina quem precisa dessa solução.",
        "Use IA para pesquisar e desenvolver sua ideia.",
        "Crie uma oferta simples.",
        "Apresente sua solução para os primeiros potenciais clientes.",
      ],
    },
    {
      id: 2,
      icon: "📱",
      categoria: "Instagram",
      titulo: "Perfil que gera oportunidades",
      descricao:
        "Estruture seu Instagram para deixar claro o que você oferece e para quem.",
      passos: [
        "Tenha uma foto ou logo profissional.",
        "Explique sua proposta na bio.",
        "Mostre o problema que você resolve.",
        "Publique conteúdo que gere autoridade.",
        "Inclua chamadas para ação.",
      ],
    },
    {
      id: 3,
      icon: "✍️",
      categoria: "Conteúdo",
      titulo: "Conteúdo estratégico",
      descricao:
        "Crie conteúdos que não servem apenas para gerar curtidas, mas também oportunidades.",
      passos: [
        "Defina um objetivo para cada publicação.",
        "Comece com um gancho forte.",
        "Entregue uma informação útil.",
        "Mostre uma solução prática.",
        "Finalize com uma chamada para ação.",
      ],
    },
    {
      id: 4,
      icon: "💰",
      categoria: "Vendas",
      titulo: "Primeiro cliente",
      descricao:
        "Uma estratégia prática para começar a prospectar seus primeiros clientes.",
      passos: [
        "Escolha um serviço simples para oferecer.",
        "Defina um público específico.",
        "Encontre potenciais clientes.",
        "Faça uma abordagem personalizada.",
        "Apresente sua solução e acompanhe o contato.",
      ],
    },
    {
      id: 5,
      icon: "🎯",
      categoria: "Negócios",
      titulo: "Encontre uma oportunidade",
      descricao:
        "Aprenda a identificar problemas que podem se transformar em produtos ou serviços.",
      passos: [
        "Observe problemas frequentes das pessoas.",
        "Escolha um problema específico.",
        "Pesquise soluções existentes.",
        "Identifique como melhorar a solução.",
        "Valide a ideia antes de investir muito.",
      ],
    },
    {
      id: 6,
      icon: "🤖",
      categoria: "Negócios",
      titulo: "Negócio com IA",
      descricao:
        "Use inteligência artificial como ferramenta para criar serviços e produtos digitais.",
      passos: [
        "Escolha uma habilidade ou área de interesse.",
        "Identifique tarefas que podem ser aceleradas com IA.",
        "Crie uma solução simples.",
        "Teste com potenciais clientes.",
        "Aprimore a solução com base no feedback.",
      ],
    },
    {
      id: 7,
      icon: "🔥",
      categoria: "Instagram",
      titulo: "Autoridade no Instagram",
      descricao:
        "Construa percepção de autoridade mesmo começando com um perfil pequeno.",
      passos: [
        "Escolha um posicionamento claro.",
        "Ensine algo útil regularmente.",
        "Compartilhe resultados e aprendizados.",
        "Responda dúvidas do seu público.",
        "Mantenha consistência nas publicações.",
      ],
    },
    {
      id: 8,
      icon: "📈",
      categoria: "Vendas",
      titulo: "Transforme seguidores em clientes",
      descricao:
        "Crie um caminho simples entre conteúdo, relacionamento e oferta.",
      passos: [
        "Publique conteúdos que resolvam problemas.",
        "Estimule comentários e mensagens.",
        "Entenda a necessidade da pessoa.",
        "Apresente uma solução adequada.",
        "Faça uma oferta clara.",
      ],
    },
  ];

  const filtradas = estrategias.filter((item) => {
    const correspondeCategoria =
      categoria === "Todas" || item.categoria === categoria;

    const texto = `${item.titulo} ${item.descricao} ${item.categoria}`.toLowerCase();

    const correspondeBusca = texto.includes(busca.toLowerCase());

    return correspondeCategoria && correspondeBusca;
  });

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.brand}>IA LUCRATIVA</div>
          <div style={styles.subtitle}>Estratégias para o digital</div>
        </div>

        <a href="/dashboard" style={styles.backButton}>
          ← Dashboard
        </a>
      </header>

      <section style={styles.hero}>
        <span style={styles.badge}>📈 ESTRATÉGIAS IA LUCRATIVA</span>

        <h1 style={styles.title}>
          Transforme conhecimento
          <br />
          em <span style={styles.highlight}>ação.</span>
        </h1>

        <p style={styles.description}>
          Estratégias práticas para começar do zero, criar conteúdo,
          encontrar clientes e desenvolver oportunidades usando inteligência
          artificial.
        </p>

        <div style={styles.searchBox}>
          <span>🔎</span>

          <input
            type="text"
            placeholder="Pesquisar estratégia..."
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
            <h2 style={styles.sectionTitle}>Estratégias disponíveis</h2>
            <p style={styles.sectionDescription}>
              Escolha uma estratégia e coloque em prática.
            </p>
          </div>

          <span style={styles.counter}>
            {filtradas.length} disponíveis
          </span>
        </div>

        <div style={styles.grid}>
          {filtradas.map((item) => (
            <article key={item.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.icon}>{item.icon}</div>

                <span style={styles.tag}>{item.categoria}</span>
              </div>

              <h3 style={styles.cardTitle}>{item.titulo}</h3>

              <p style={styles.cardDescription}>{item.descricao}</p>

              <div style={styles.steps}>
                <strong style={styles.stepsTitle}>PASSO A PASSO</strong>

                {item.passos.map((passo, index) => (
                  <div key={index} style={styles.step}>
                    <span style={styles.stepNumber}>{index + 1}</span>
                    <span style={styles.stepText}>{passo}</span>
                  </div>
                ))}
              </div>

              <button style={styles.actionButton}>
                Começar estratégia →
              </button>
            </article>
          ))}
        </div>

        {filtradas.length === 0 && (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>🔍</div>
            <h3>Nenhuma estratégia encontrada</h3>
            <p>Experimente pesquisar outro termo.</p>
          </div>
        )}
      </section>

      <section style={styles.motivation}>
        <div style={styles.motivationIcon}>⚡</div>

        <div>
          <h3 style={styles.motivationTitle}>
            Conhecimento só gera
