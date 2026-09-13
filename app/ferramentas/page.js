"use client";

import { useState } from "react";

export default function Ferramentas() {
  const [search, setSearch] = useState("");

  const ferramentas = [
    {
      icon: "✍️",
      title: "Gerador de Conteúdo",
      description:
        "Crie posts, legendas, ideias e conteúdos para suas redes sociais usando IA.",
      button: "Criar conteúdo",
    },
    {
      icon: "💡",
      title: "Gerador de Ideias",
      description:
        "Encontre ideias de negócios, produtos, serviços e oportunidades usando inteligência artificial.",
      button: "Gerar ideias",
    },
    {
      icon: "💰",
      title: "Gerador de Ofertas",
      description:
        "Crie ofertas, propostas e argumentos para apresentar seus produtos ou serviços.",
      button: "Criar oferta",
    },
    {
      icon: "📱",
      title: "Gerador de Posts",
      description:
        "Crie estruturas completas de posts para Instagram de forma rápida e estratégica.",
      button: "Criar post",
    },
    {
      icon: "🎯",
      title: "Gerador de Público",
      description:
        "Identifique seu público-alvo e descubra como se comunicar melhor com ele.",
      button: "Encontrar público",
    },
    {
      icon: "📈",
      title: "Estratégias Digitais",
      description:
        "Descubra estratégias para começar, crescer e gerar oportunidades no digital.",
      button: "Ver estratégias",
    },
  ];

  const filtradas = ferramentas.filter((ferramenta) =>
    ferramenta.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.brand}>IA LUCRATIVA</div>
          <div style={styles.subtitle}>Ferramentas inteligentes</div>
        </div>

        <a href="/dashboard" style={styles.backButton}>
          ← Dashboard
        </a>
      </header>

      <section style={styles.hero}>
        <span style={styles.badge}>🤖 CENTRAL DE IA</span>

        <h1 style={styles.title}>
          Suas ferramentas
          <br />
          <span style={styles.highlight}>inteligentes.</span>
        </h1>

        <p style={styles.description}>
          Use inteligência artificial para criar conteúdo, encontrar ideias,
          desenvolver ofertas e transformar oportunidades em resultados.
        </p>

        <div style={styles.searchBox}>
          <span>🔎</span>

          <input
            type="text"
            placeholder="Pesquisar ferramenta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
        </div>
      </section>

      <section style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Todas as ferramentas</h2>
          <span style={styles.counter}>{filtradas.length} disponíveis</span>
        </div>

        <div style={styles.grid}>
          {filtradas.map((ferramenta, index) => (
            <div style={styles.card} key={index}>
              <div style={styles.icon}>{ferramenta.icon}</div>

              <h3 style={styles.cardTitle}>{ferramenta.title}</h3>

              <p style={styles.cardDescription}>
                {ferramenta.description}
              </p>

              <button style={styles.cardButton}>
                {ferramenta.button} →
              </button>
            </div>
          ))}
        </div>

        {filtradas.length === 0 && (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>🔍</div>
            <h3>Nenhuma ferramenta encontrada</h3>
            <p>Experimente pesquisar por outro termo.</p>
          </div>
        )}
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
    padding: "75px 6% 55px",
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
    padding: "0 6% 60px",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "22px",
  },

  counter: {
    color: "#777",
    fontSize: "12px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "18px",
  },

  card: {
    background: "#0d0d0d",
    border: "1px solid #222",
    borderRadius: "18px",
    padding: "25px",
    transition: "transform 0.2s",
  },

  icon: {
    width: "52px",
    height: "52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#171717",
    borderRadius: "14px",
    fontSize: "25px",
    marginBottom: "20px",
  },

  cardTitle: {
    margin: "0 0 10px",
    fontSize: "18px",
  },

  cardDescription: {
    color: "#888",
    fontSize: "13px",
    lineHeight: "1.6",
    minHeight: "63px",
  },

  cardButton: {
    marginTop: "18px",
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "#ffffff",
    color: "#000000",
    fontWeight: "700",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#777",
  },

  emptyIcon: {
    fontSize: "35px",
    marginBottom: "15px",
  },

  footer: {
    textAlign: "center",
    borderTop: "1px solid #222",
    padding: "30px 20px",
    color: "#777",
    fontSize: "12px",
  },
};
