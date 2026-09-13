"use client";

import { useState } from "react";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logoArea}>
          <div style={styles.logo}>IA</div>
          <div>
            <h2 style={styles.brand}>IA LUCRATIVA</h2>
            <p style={styles.subtitle}>Sua inteligência para crescer.</p>
          </div>
        </div>

        <button
          style={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </header>

      {menuOpen && (
        <div style={styles.menu}>
          <p>Dashboard</p>
          <p>Ferramentas de IA</p>
          <p>Prompts</p>
          <p>Estratégias</p>
          <p>Minha conta</p>
          <p>Sair</p>
        </div>
      )}

      <section style={styles.hero}>
        <span style={styles.badge}>🤖 PLATAFORMA IA LUCRATIVA</span>

        <h1 style={styles.heroTitle}>
          Transforme IA em
          <br />
          <span style={styles.highlight}>oportunidades.</span>
        </h1>

        <p style={styles.heroText}>
          Tenha acesso a ferramentas, estratégias e recursos de
          inteligência artificial para criar, vender e crescer no digital.
        </p>

        <button style={styles.primaryButton}>
          🚀 Explorar plataforma
        </button>
      </section>

      <section style={styles.stats}>
        <div style={styles.stat}>
          <strong style={styles.statNumber}>01</strong>
          <span>Ferramentas</span>
        </div>

        <div style={styles.stat}>
          <strong style={styles.statNumber}>02</strong>
          <span>Prompts</span>
        </div>

        <div style={styles.stat}>
          <strong style={styles.statNumber}>03</strong>
          <span>Estratégias</span>
        </div>
      </section>

      <section style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.icon}>🤖</div>
          <h3>Ferramentas de IA</h3>
          <p>
            Recursos inteligentes para facilitar seu trabalho e acelerar
            seus resultados.
          </p>
          <button style={styles.cardButton}>Acessar →</button>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>💡</div>
          <h3>Prompts inteligentes</h3>
          <p>
            Comandos prontos para gerar ideias, conteúdos, ofertas e muito
            mais.
          </p>
          <button style={styles.cardButton}>Explorar →</button>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>📈</div>
          <h3>Estratégias</h3>
          <p>
            Estratégias práticas para transformar conhecimento em
            oportunidades digitais.
          </p>
          <button style={styles.cardButton}>Ver estratégias →</button>
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
    paddingBottom: "40px",
  },

  header: {
    height: "75px",
    padding: "0 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #222",
    background: "#080808",
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logo: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: "16px",
  },

  brand: {
    margin: 0,
    fontSize: "17px",
    letterSpacing: "1px",
  },

  subtitle: {
    margin: "3px 0 0",
    color: "#777",
    fontSize: "11px",
  },

  menuButton: {
    background: "transparent",
    border: "1px solid #333",
    color: "#fff",
    borderRadius: "10px",
    fontSize: "20px",
    padding: "8px 12px",
    cursor: "pointer",
  },

  menu: {
    position: "absolute",
    right: "6%",
    top: "70px",
    width: "220px",
    padding: "15px",
    background: "#111",
    border: "1px solid #292929",
    borderRadius: "14px",
    zIndex: 10,
    boxShadow: "0 15px 40px rgba(0,0,0,.5)",
  },

  hero: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "90px 6% 60px",
    textAlign: "center",
  },

  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "50px",
    border: "1px solid #333",
    color: "#aaa",
    fontSize: "11px",
    letterSpacing: "1px",
    marginBottom: "25px",
  },

  heroTitle: {
    fontSize: "clamp(42px, 8vw, 78px)",
    lineHeight: "1",
    margin: "0",
    fontWeight: "900",
    letterSpacing: "-3px",
  },

  highlight: {
    color: "#8b5cf6",
  },

  heroText: {
    maxWidth: "650px",
    margin: "25px auto",
    color: "#999",
    fontSize: "17px",
    lineHeight: "1.6",
  },

  primaryButton: {
    border: "none",
    background: "#ffffff",
    color: "#000000",
    padding: "15px 24px",
    borderRadius: "12px",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "14px",
  },

  stats: {
    maxWidth: "900px",
    margin: "0 auto 50px",
    padding: "0 6%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
  },

  stat: {
    background: "#0d0d0d",
    border: "1px solid #222",
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center",
  },

  statNumber: {
    display: "block",
    fontSize: "24px",
    marginBottom: "7px",
  },

  cards: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 6%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "18px",
  },

  card: {
    background: "#0d0d0d",
    border: "1px solid #222",
    borderRadius: "18px",
    padding: "25px",
  },

  icon: {
    fontSize: "30px",
    marginBottom: "20px",
  },

  cardButton: {
    marginTop: "15px",
    background: "transparent",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "9px",
    padding: "10px 14px",
    cursor: "pointer",
  },

  footer: {
    textAlign: "center",
    marginTop: "80px",
    padding: "30px 20px",
    borderTop: "1px solid #222",
    color: "#777",
    fontSize: "13px",
  },
};
