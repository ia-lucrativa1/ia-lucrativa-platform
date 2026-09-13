"use client";

import { useState } from "react";

const ferramentas = [
  {
    titulo: "Gerador de Conteúdo",
    descricao: "Crie conteúdos estratégicos para diferentes objetivos.",
    icone: "✍️",
    link: "/ferramentas/conteudo",
  },
  {
    titulo: "Gerador de Ideias",
    descricao: "Encontre oportunidades e ideias para criar renda.",
    icone: "💡",
    link: "/ferramentas/ideias",
  },
  {
    titulo: "Gerador de Ofertas",
    descricao: "Transforme produtos e serviços em ofertas mais atrativas.",
    icone: "💰",
    link: "/ferramentas/ofertas",
  },
  {
    titulo: "Gerador de Posts",
    descricao: "Crie posts e carrosséis prontos para suas redes sociais.",
    icone: "📱",
    link: "/ferramentas/posts",
  },
  {
    titulo: "Gerador de Público",
    descricao: "Entenda melhor seu público e melhore sua comunicação.",
    icone: "🎯",
    link: "/ferramentas/publico",
  },
  {
    titulo: "Estratégias Digitais",
    descricao: "Crie planos estratégicos para transformar IA em oportunidades.",
    icone: "🚀",
    link: "/ferramentas/estrategias-digitais",
  },
];

export default function Ferramentas() {
  const [busca, setBusca] = useState("");

  const ferramentasFiltradas = ferramentas.filter((ferramenta) =>
    ferramenta.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        <a href="/dashboard" style={styles.back}>
          ← Voltar para o Dashboard
        </a>

        <header style={styles.header}>
          <div style={styles.logo}>IA</div>

          <h1 style={styles.title}>
            Ferramentas IA LUCRATIVA
          </h1>

          <p style={styles.subtitle}>
            Ferramentas práticas para transformar inteligência artificial
            em ideias, conteúdo, vendas e oportunidades.
          </p>
        </header>

        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="🔎 Buscar ferramenta..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={styles.search}
          />
        </div>

        <section style={styles.grid}>

          {ferramentasFiltradas.map((ferramenta) => (
            <a
              key={ferramenta.titulo}
              href={ferramenta.link}
              style={styles.card}
            >
              <div style={styles.icon}>
                {ferramenta.icone}
              </div>

              <h2 style={styles.cardTitle}>
                {ferramenta.titulo}
              </h2>

              <p style={styles.cardText}>
                {ferramenta.descricao}
              </p>

              <div style={styles.access}>
                Acessar ferramenta →
              </div>
            </a>
          ))}

        </section>

        {ferramentasFiltradas.length === 0 && (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>🔎</div>

            <h2 style={styles.emptyTitle}>
              Nenhuma ferramenta encontrada
            </h2>

            <p style={styles.emptyText}>
              Tente pesquisar por outro nome.
            </p>
          </div>
        )}

        <section style={styles.tip}>
          <div style={styles.tipIcon}>⚡</div>

          <div>
            <h3 style={styles.tipTitle}>
              Use a IA a seu favor
            </h3>

            <p style={styles.tipText}>
              Combine diferentes ferramentas para criar conteúdos,
              encontrar oportunidades, estruturar ofertas e desenvolver
              estratégias digitais.
            </p>
          </div>
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
    maxWidth: "1100px",
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

  logo: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "#ffffff",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "900",
    margin: "0 auto 20px",
  },

  title: {
    fontSize: "38px",
    margin: "0 0 12px",
  },

  subtitle: {
    color: "#999",
    fontSize: "16px",
    lineHeight: "1.6",
    maxWidth: "700px",
    margin: "0 auto",
  },

  searchBox: {
    marginBottom: "30px",
  },

  search: {
    width: "100%",
    boxSizing: "border-box",
    padding: "16px 18px",
    borderRadius: "12px",
    border: "1px solid #292929",
    background: "#101010",
    color: "#ffffff",
    fontSize: "15px",
    outline: "none",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },

  card: {
    display: "block",
    textDecoration: "none",
    color: "#ffffff",
    background: "#101010",
    border: "1px solid #242424",
    borderRadius: "18px",
    padding: "24px",
    transition: "0.2s",
  },

  icon: {
    fontSize: "34px",
    marginBottom: "18px",
  },

  cardTitle: {
    fontSize: "20px",
    margin: "0 0 10px",
  },

  cardText: {
    color: "#999",
    fontSize: "14px",
    lineHeight: "1.6",
    minHeight: "45px",
  },

  access: {
    marginTop: "20px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#ffffff",
  },

  empty: {
    textAlign: "center",
    padding: "60px 20px",
    border: "1px solid #242424",
    borderRadius: "18px",
    background: "#101010",
  },

  emptyIcon: {
    fontSize: "35px",
  },

  emptyTitle: {
    fontSize: "20px",
    marginBottom: "8px",
  },

  emptyText: {
    color: "#888",
  },

  tip: {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    background: "#0d0d0d",
    border: "1px solid #222",
    borderRadius: "16px",
    padding: "22px",
    marginTop: "30px",
  },

  tipIcon: {
    fontSize: "28px",
  },

  tipTitle: {
    margin: "0 0 7px",
    fontSize: "17px",
  },

  tipText: {
    margin: 0,
    color: "#999",
    lineHeight: "1.6",
    fontSize: "14px",
  },

  footer: {
    textAlign: "center",
    color: "#666",
    fontSize: "13px",
    lineHeight: "1.8",
    padding: "40px 0 20px",
  },
};
