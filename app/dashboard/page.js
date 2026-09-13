"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const router = useRouter();

  const [verificando, setVerificando] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function verificarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setUsuario(session.user);
      setVerificando(false);
    }

    verificarSessao();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/login");
        return;
      }

      setUsuario(session.user);
      setVerificando(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const ferramentas = [
    {
      numero: "01",
      icone: "✍️",
      titulo: "Gerador de Conteúdo",
      descricao:
        "Crie conteúdos estratégicos para atrair, engajar e gerar oportunidades.",
      link: "/ferramentas/conteudo",
    },
    {
      numero: "02",
      icone: "💡",
      titulo: "Gerador de Ideias",
      descricao:
        "Encontre ideias de negócios, serviços e oportunidades utilizando IA.",
      link: "/ferramentas/ideias",
    },
    {
      numero: "03",
      icone: "💰",
      titulo: "Gerador de Ofertas",
      descricao:
        "Transforme produtos e serviços em ofertas mais claras e atrativas.",
      link: "/ferramentas/ofertas",
    },
    {
      numero: "04",
      icone: "📱",
      titulo: "Gerador de Posts",
      descricao:
        "Crie posts, carrosséis, chamadas, CTAs e estruturas de conteúdo.",
      link: "/ferramentas/posts",
    },
    {
      numero: "05",
      icone: "🎯",
      titulo: "Gerador de Público",
      descricao:
        "Entenda seu público, suas dores, desejos, objeções e comunicação.",
      link: "/ferramentas/publico",
    },
    {
      numero: "06",
      icone: "🚀",
      titulo: "Estratégias Digitais",
      descricao:
        "Monte estratégias práticas para transformar conhecimento em oportunidades.",
      link: "/ferramentas/estrategias-digitais",
    },
  ];

  if (verificando) {
    return (
      <main style={styles.loadingPage}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingLogo}>IA</div>

          <h2 style={styles.loadingTitle}>
            IA LUCRATIVA
          </h2>

          <p style={styles.loadingText}>
            Verificando sua sessão...
          </p>
        </div>
      </main>
    );
  }

  return (
    <div style={styles.page}>

      {/* CABEÇALHO DO PAINEL */}
      <section style={styles.dashboardHeader}>

        <div>
          <span style={styles.sectionLabel}>
            PAINEL PRINCIPAL
          </span>

          <h1 style={styles.title}>
            Seu espaço para
            <br />
            <span style={styles.titleHighlight}>
              transformar IA em ação.
            </span>
          </h1>

          <p style={styles.description}>
            Acesse suas ferramentas, prompts e estratégias
            para transformar ideias em oportunidades.
          </p>
        </div>

        <div style={styles.userCard}>

          <div style={styles.userAvatar}>
            👤
          </div>

          <div>
            <span style={styles.userLabel}>
              USUÁRIO
            </span>

            <strong style={styles.userEmail}>
              {usuario?.email || "Usuário"}
            </strong>
          </div>

        </div>

      </section>

      {/* ACESSO RÁPIDO */}
      <section style={styles.quickSection}>

        <div style={styles.sectionHeader}>

          <div>
            <span style={styles.sectionLabel}>
              ACESSO RÁPIDO
            </span>

            <h2 style={styles.sectionTitle}>
              Comece por aqui
            </h2>

            <p style={styles.sectionText}>
              Escolha um recurso e comece a executar.
            </p>
          </div>

          <Link
            href="/ferramentas"
            style={styles.viewAll}
          >
            Ver todas →
          </Link>

        </div>

        <div style={styles.quickGrid}>

          <Link
            href="/ferramentas"
            style={styles.quickCard}
          >
            <div style={styles.quickIcon}>
              🤖
            </div>

            <div>
              <strong style={styles.quickTitle}>
                Ferramentas de IA
              </strong>

              <p style={styles.quickText}>
                Acesse todas as ferramentas inteligentes da plataforma.
              </p>
            </div>

            <span style={styles.quickArrow}>
              →
            </span>
          </Link>

          <Link
            href="/prompts"
            style={styles.quickCard}
          >
            <div style={styles.quickIcon}>
              🧠
            </div>

            <div>
              <strong style={styles.quickTitle}>
                Biblioteca de Prompts
              </strong>

              <p style={styles.quickText}>
                Use comandos prontos para acelerar seus resultados.
              </p>
            </div>

            <span style={styles.quickArrow}>
              →
            </span>
          </Link>

          <Link
            href="/estrategias"
            style={styles.quickCard}
          >
            <div style={styles.quickIcon}>
              📈
            </div>

            <div>
              <strong style={styles.quickTitle}>
                Estratégias
              </strong>

              <p style={styles.quickText}>
                Aplique estratégias práticas para seus objetivos.
              </p>
            </div>

            <span style={styles.quickArrow}>
              →
            </span>
          </Link>

        </div>

      </section>

      {/* ESTATÍSTICAS */}
      <section style={styles.stats}>

        <div style={styles.stat}>
          <strong style={styles.statNumber}>
            06
          </strong>

          <span style={styles.statLabel}>
            Ferramentas IA
          </span>
        </div>

        <div style={styles.stat}>
          <strong style={styles.statNumber}>
            10+
          </strong>

          <span style={styles.statLabel}>
            Prompts
          </span>
        </div>

        <div style={styles.stat}>
          <strong style={styles.statNumber}>
            08
          </strong>

          <span style={styles.statLabel}>
            Estratégias
          </span>
        </div>

        <div style={styles.stat}>
          <strong style={styles.statNumber}>
            24/7
          </strong>

          <span style={styles.statLabel}>
            Disponibilidade
          </span>
        </div>

      </section>

      {/* FERRAMENTAS */}
      <section style={styles.toolsSection}>

        <div style={styles.sectionHeader}>

          <div>
            <span style={styles.sectionLabel}>
              FERRAMENTAS
            </span>

            <h2 style={styles.sectionTitle}>
              Coloque a IA para trabalhar.
            </h2>

            <p style={styles.sectionText}>
              Ferramentas criadas para transformar ideias em execução.
            </p>
          </div>

          <Link
            href="/ferramentas"
            style={styles.viewAll}
          >
            Explorar todas →
          </Link>

        </div>

        <div style={styles.toolsGrid}>

          {ferramentas.map((ferramenta) => (
            <Link
              key={ferramenta.numero}
              href={ferramenta.link}
              style={styles.toolCard}
            >

              <div style={styles.toolTop}>

                <span style={styles.toolNumber}>
                  {ferramenta.numero}
                </span>

                <span style={styles.toolArrow}>
                  ↗
                </span>

              </div>

              <div style={styles.toolIcon}>
                {ferramenta.icone}
              </div>

              <h3 style={styles.toolTitle}>
                {ferramenta.titulo}
              </h3>

              <p style={styles.toolDescription}>
                {ferramenta.descricao}
              </p>

              <span style={styles.toolAction}>
                Abrir ferramenta →
              </span>

            </Link>
          ))}

        </div>

      </section>

      {/* ÁREA DE EVOLUÇÃO */}
      <section style={styles.evolutionSection}>

        <div style={styles.evolutionCard}>

          <div>
            <span style={styles.evolutionLabel}>
              IA LUCRATIVA
            </span>

            <h2 style={styles.evolutionTitle}>
              Sua jornada está apenas começando.
            </h2>

            <p style={styles.evolutionText}>
              Continue explorando a plataforma e utilize
              inteligência artificial para criar, testar,
              melhorar e executar suas ideias.
            </p>
          </div>

          <Link
            href="/conta"
            style={styles.evolutionButton}
          >
            Minha conta →
          </Link>

        </div>

      </section>

      {/* RODAPÉ */}
      <footer style={styles.footer}>

        <strong style={styles.footerBrand}>
          IA LUCRATIVA
        </strong>

        <span style={styles.footerText}>
          Transforme inteligência artificial em oportunidades.
        </span>

        <span style={styles.footerInstagram}>
          @ia.lucrativa1
        </span>

      </footer>

    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100%",
    color: "#ffffff",
    boxSizing: "border-box",
  },

  dashboardHeader: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "45px 24px 35px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "30px",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },

  sectionLabel: {
    display: "block",
    color: "#00ffaa",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1.5px",
  },

  title: {
    margin: "12px 0 15px",
    fontSize: "clamp(34px, 5vw, 58px)",
    lineHeight: "1.05",
    letterSpacing: "-2px",
    fontWeight: "900",
  },

  titleHighlight: {
    color: "#7d8783",
  },

  description: {
    maxWidth: "650px",
    margin: 0,
    color: "#777f7b",
    fontSize: "15px",
    lineHeight: "1.7",
  },

  userCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    background: "#080d0b",
    border: "1px solid rgba(0, 255, 170, 0.1)",
    borderRadius: "14px",
    minWidth: "220px",
    boxSizing: "border-box",
  },

  userAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "11px",
    background: "rgba(0, 255, 170, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },

  userLabel: {
    display: "block",
    color: "#00a879",
    fontSize: "9px",
    fontWeight: "900",
    letterSpacing: "1px",
    marginBottom: "4px",
  },

  userEmail: {
    display: "block",
    color: "#d8dedb",
    fontSize: "12px",
    fontWeight: "700",
    maxWidth: "170px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  quickSection: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "20px 24px 35px",
    boxSizing: "border-box",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "25px",
    marginBottom: "22px",
    flexWrap: "wrap",
  },

  sectionTitle: {
    margin: "9px 0 5px",
    fontSize: "28px",
    lineHeight: "1.1",
    letterSpacing: "-1px",
  },

  sectionText: {
    margin: 0,
    color: "#69736e",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  viewAll: {
    color: "#00ffaa",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "800",
  },

  quickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "12px",
  },

  quickCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    position: "relative",
    background: "#080d0b",
    border: "1px solid rgba(0, 255, 170, 0.09)",
    borderRadius: "15px",
    padding: "20px",
    color: "#ffffff",
    textDecoration: "none",
    boxSizing: "border-box",
  },

  quickIcon: {
    width: "42px",
    height: "42px",
    flexShrink: 0,
    borderRadius: "12px",
    background: "rgba(0, 255, 170, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },

  quickTitle: {
    display: "block",
    fontSize: "14px",
    marginBottom: "5px",
  },

  quickText: {
    margin: 0,
    color: "#6f7874",
    fontSize: "11px",
    lineHeight: "1.5",
  },

  quickArrow: {
    marginLeft: "auto",
    color: "#00ffaa",
    fontSize: "18px",
  },

  stats: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "20px 24px 55px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "1px",
    background: "rgba(0, 255, 170, 0.07)",
    boxSizing: "border-box",
  },

  stat: {
    minHeight: "105px",
    background: "#080d0b",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  statNumber: {
    color: "#00ffaa",
    fontSize: "27px",
    fontWeight: "900",
  },

  statLabel: {
    marginTop: "6px",
    color: "#69736e",
    fontSize: "11px",
  },

  toolsSection: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "35px 24px 75px",
    boxSizing: "border-box",
  },

  toolsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "13px",
  },

  toolCard: {
    minHeight: "285px",
    padding: "23px",
    background: "linear-gradient(145deg, #0b1110, #080c0b)",
    border: "1px solid rgba(0, 255, 170, 0.09)",
    borderRadius: "17px",
    color: "#ffffff",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },

  toolTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toolNumber: {
    color: "#00a879",
    fontSize: "11px",
    fontWeight: "900",
  },

  toolArrow: {
    color: "#00ffaa",
    fontSize: "19px",
  },

  toolIcon: {
    marginTop: "28px",
    fontSize: "27px",
  },

  toolTitle: {
    margin: "14px 0 8px",
    fontSize: "18px",
    fontWeight: "800",
  },

  toolDescription: {
    margin: 0,
    color: "#737d78",
    fontSize: "12px",
    lineHeight: "1.65",
  },

  toolAction: {
    marginTop: "auto",
    paddingTop: "22px",
    color: "#00ffaa",
    fontSize: "11px",
    fontWeight: "800",
  },

  evolutionSection: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "0 24px 75px",
    boxSizing: "border-box",
  },

  evolutionCard: {
    padding: "42px",
    borderRadius: "20px",
    border: "1px solid rgba(0, 255, 170, 0.1)",
    background:
      "radial-gradient(circle at 85% 15%, rgba(0, 255, 170, 0.08), transparent 35%), #080d0b",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },

  evolutionLabel: {
    color: "#00ffaa",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1.5px",
  },

  evolutionTitle: {
    margin: "14px 0 10px",
    fontSize: "clamp(25px, 4vw, 40px)",
    lineHeight: "1.1",
    letterSpacing: "-1px",
  },

  evolutionText: {
    maxWidth: "620px",
    margin: 0,
    color: "#737d78",
    fontSize: "13px",
    lineHeight: "1.7",
  },

  evolutionButton: {
    flexShrink: 0,
    background: "#00ffaa",
    color: "#03100b",
    textDecoration: "none",
    padding: "13px 19px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "900",
  },

  footer: {
    borderTop: "1px solid rgba(0, 255, 170, 0.08)",
    padding: "30px 24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    textAlign: "center",
    boxSizing: "border-box",
  },

  footerBrand: {
    color: "#00ffaa",
    fontSize: "13px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  footerText: {
    color: "#606a65",
    fontSize: "11px",
  },

  footerInstagram: {
    color: "#7a8580",
    fontSize: "11px",
    fontWeight: "700",
  },

  loadingPage: {
    minHeight: "100vh",
    background: "#050807",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
  },

  loadingCard: {
    textAlign: "center",
    background: "#080d0b",
    border: "1px solid rgba(0, 255, 170, 0.1)",
    borderRadius: "18px",
    padding: "40px",
    maxWidth: "360px",
    width: "100%",
    boxSizing: "border-box",
  },

  loadingLogo: {
    width: "55px",
    height: "55px",
    margin: "0 auto 20px",
    borderRadius: "14px",
    background: "#00ffaa",
    color: "#03100b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: "18px",
  },

  loadingTitle: {
    margin: "0 0 10px",
    fontSize: "20px",
  },

  loadingText: {
    margin: 0,
    color: "#69736e",
    fontSize: "13px",
  },
};
