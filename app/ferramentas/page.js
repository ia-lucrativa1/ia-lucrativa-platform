"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const ferramentas = [
  {
    titulo: "Gerador de Conteúdo",
    descricao:
      "Crie conteúdos estratégicos para diferentes objetivos.",
    icone: "✍️",
    link: "/ferramentas/conteudo",
  },
  {
    titulo: "Gerador de Ideias",
    descricao:
      "Encontre oportunidades e ideias para criar renda.",
    icone: "💡",
    link: "/ferramentas/ideias",
  },
  {
    titulo: "Gerador de Ofertas",
    descricao:
      "Transforme produtos e serviços em ofertas mais atrativas.",
    icone: "💰",
    link: "/ferramentas/ofertas",
  },
  {
    titulo: "Gerador de Posts",
    descricao:
      "Crie posts e carrosséis prontos para suas redes sociais.",
    icone: "📱",
    link: "/ferramentas/posts",
  },
  {
    titulo: "Gerador de Público",
    descricao:
      "Entenda melhor seu público e melhore sua comunicação.",
    icone: "🎯",
    link: "/ferramentas/publico",
  },
  {
    titulo: "Estratégias Digitais",
    descricao:
      "Crie planos estratégicos para transformar IA em oportunidades.",
    icone: "🚀",
    link: "/ferramentas/estrategias-digitais",
  },
];

export default function Ferramentas() {
  const router = useRouter();

  const [busca, setBusca] = useState("");
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    async function verificarUsuario() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
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

  if (verificando) {
    return (
      <main style={styles.loadingPage}>
        <div style={styles.loadingBox}>
          <div style={styles.loadingLogo}>IA</div>

          <h1 style={styles.loadingTitle}>
            IA LUCRATIVA
          </h1>

          <p style={styles.loadingText}>
            Verificando acesso...
          </p>
        </div>
      </main>
    );
  }

  const buscaNormalizada = busca.trim().toLowerCase();

  const ferramentasFiltradas = ferramentas.filter(
    (ferramenta) =>
      ferramenta.titulo
        .toLowerCase()
        .includes(buscaNormalizada) ||
      ferramenta.descricao
        .toLowerCase()
        .includes(buscaNormalizada)
  );

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        {/* CABEÇALHO DA PÁGINA */}
        <header style={styles.header}>

          <span style={styles.eyebrow}>
            CENTRAL DE FERRAMENTAS
          </span>

          <h1 style={styles.title}>
            Ferramentas de{" "}
            <span style={styles.highlight}>
              IA
            </span>
          </h1>

          <p style={styles.subtitle}>
            Transforme inteligência artificial em ideias,
            conteúdo, ofertas, estratégias e oportunidades.
          </p>

        </header>

        {/* BUSCA */}
        <div style={styles.searchBox}>

          <div style={styles.searchIcon}>
            🔎
          </div>

          <input
            type="text"
            placeholder="Buscar uma ferramenta..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={styles.search}
          />

          {busca && (
            <button
              type="button"
              onClick={() => setBusca("")}
              style={styles.clearButton}
              aria-label="Limpar busca"
            >
              ×
            </button>
          )}

        </div>

        {/* CONTADOR */}
        <div style={styles.counter}>
          {ferramentasFiltradas.length}{" "}
          {ferramentasFiltradas.length === 1
            ? "ferramenta disponível"
            : "ferramentas disponíveis"}
        </div>

        {/* FERRAMENTAS */}
        <section style={styles.grid}>

          {ferramentasFiltradas.map((ferramenta) => (
            <a
              key={ferramenta.titulo}
              href={ferramenta.link}
              style={styles.card}
            >

              <div style={styles.cardTop}>

                <div style={styles.icon}>
                  {ferramenta.icone}
                </div>

                <span style={styles.arrow}>
                  ↗
                </span>

              </div>

              <h2 style={styles.cardTitle}>
                {ferramenta.titulo}
              </h2>

              <p style={styles.cardText}>
                {ferramenta.descricao}
              </p>

              <div style={styles.access}>
                Acessar ferramenta
                <span>→</span>
              </div>

            </a>
          ))}

        </section>

        {/* ESTADO VAZIO */}
        {ferramentasFiltradas.length === 0 && (
          <div style={styles.empty}>

            <div style={styles.emptyIcon}>
              🔎
            </div>

            <h2 style={styles.emptyTitle}>
              Nenhuma ferramenta encontrada
            </h2>

            <p style={styles.emptyText}>
              Tente pesquisar por outro nome ou descrição.
            </p>

            <button
              type="button"
              onClick={() => setBusca("")}
              style={styles.emptyButton}
            >
              Limpar pesquisa
            </button>

          </div>
        )}

        {/* DICA */}
        <section style={styles.tip}>

          <div style={styles.tipIcon}>
            ⚡
          </div>

          <div style={styles.tipContent}>

            <span style={styles.tipLabel}>
              DICA IA LUCRATIVA
            </span>

            <h3 style={styles.tipTitle}>
              Combine diferentes ferramentas
            </h3>

            <p style={styles.tipText}>
              Use as ferramentas em conjunto para encontrar
              oportunidades, entender seu público, criar
              conteúdo, estruturar ofertas e desenvolver
              estratégias digitais.
            </p>

          </div>

        </section>

        {/* RODAPÉ */}
        <footer style={styles.footer}>

          <strong style={styles.footerBrand}>
            IA LUCRATIVA
          </strong>

          <p>
            Transforme IA em oportunidades.
          </p>

          <span>
            @ia.lucrativa1
          </span>

        </footer>

      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 35px 60px",
    background: "#050505",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "30px",
  },

  eyebrow: {
    display: "block",
    color: "#00ffaa",
    fontSize: "9px",
    fontWeight: "900",
    letterSpacing: "2px",
    marginBottom: "10px",
  },

  title: {
    margin: 0,
    fontSize: "36px",
    fontWeight: "900",
    letterSpacing: "-1px",
  },

  highlight: {
    color: "#00ffaa",
  },

  subtitle: {
    maxWidth: "680px",
    margin: "12px 0 0",
    color: "#777",
    fontSize: "14px",
    lineHeight: "1.7",
  },

  searchBox: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },

  searchIcon: {
    position: "absolute",
    left: "17px",
    fontSize: "15px",
    zIndex: 1,
  },

  search: {
    width: "100%",
    boxSizing: "border-box",
    padding: "15px 48px",
    borderRadius: "12px",
    border: "1px solid #242424",
    background: "#101010",
    color: "#ffffff",
    fontSize: "13px",
    outline: "none",
  },

  clearButton: {
    position: "absolute",
    right: "12px",
    width: "28px",
    height: "28px",
    border: "none",
    borderRadius: "50%",
    background: "#202020",
    color: "#aaa",
    fontSize: "19px",
    lineHeight: "1",
    cursor: "pointer",
  },

  counter: {
    color: "#555",
    fontSize: "10px",
    marginBottom: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },

  card: {
    display: "block",
    textDecoration: "none",
    color: "#ffffff",
    background: "#101010",
    border: "1px solid #222",
    borderRadius: "16px",
    padding: "22px",
    transition: "transform 0.2s ease, border-color 0.2s ease",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "18px",
  },

  icon: {
    width: "48px",
    height: "48px",
    borderRadius: "13px",
    background: "rgba(0,255,170,0.07)",
    border: "1px solid rgba(0,255,170,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "23px",
  },

  arrow: {
    color: "#555",
    fontSize: "18px",
  },

  cardTitle: {
    margin: "0 0 9px",
    fontSize: "17px",
    fontWeight: "800",
  },

  cardText: {
    margin: 0,
    color: "#777",
    fontSize: "12px",
    lineHeight: "1.6",
    minHeight: "39px",
  },

  access: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    paddingTop: "15px",
    borderTop: "1px solid #1d1d1d",
    color: "#00ffaa",
    fontSize: "11px",
    fontWeight: "800",
  },

  empty: {
    textAlign: "center",
    padding: "55px 20px",
    border: "1px solid #222",
    borderRadius: "16px",
    background: "#101010",
  },

  emptyIcon: {
    fontSize: "30px",
    marginBottom: "12px",
  },

  emptyTitle: {
    margin: "0 0 7px",
    fontSize: "18px",
  },

  emptyText: {
    margin: "0 0 18px",
    color: "#666",
    fontSize: "12px",
  },

  emptyButton: {
    padding: "10px 16px",
    border: "1px solid #333",
    borderRadius: "8px",
    background: "#171717",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
  },

  tip: {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    marginTop: "25px",
    padding: "20px",
    background: "rgba(0,255,170,0.035)",
    border: "1px solid rgba(0,255,170,0.12)",
    borderRadius: "15px",
  },

  tipIcon: {
    fontSize: "25px",
  },

  tipContent: {
    flex: 1,
  },

  tipLabel: {
    display: "block",
    color: "#00ffaa",
    fontSize: "8px",
    fontWeight: "900",
    letterSpacing: "1.5px",
    marginBottom: "6px",
  },

  tipTitle: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "800",
  },

  tipText: {
    margin: "7px 0 0",
    color: "#666",
    fontSize: "11px",
    lineHeight: "1.6",
  },

  footer: {
    textAlign: "center",
    color: "#444",
    fontSize: "10px",
    lineHeight: "1.8",
    padding: "40px 0 10px",
  },

  footerBrand: {
    color: "#00ffaa",
    fontSize: "12px",
  },

  loadingPage: {
    minHeight: "100vh",
    background: "#050505",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  loadingBox: {
    textAlign: "center",
    background: "#101010",
    border: "1px solid #222",
    borderRadius: "18px",
    padding: "40px",
    maxWidth: "360px",
    width: "100%",
  },

  loadingLogo: {
    width: "58px",
    height: "58px",
    borderRadius: "15px",
    background: "#00ffaa",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "19px",
    fontWeight: "900",
    margin: "0 auto 18px",
  },

  loadingTitle: {
    margin: "0 0 8px",
    fontSize: "21px",
  },

  loadingText: {
    margin: 0,
    color: "#666",
    fontSize: "12px",
  },
};
