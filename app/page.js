"use client";

import Link from "next/link";

export default function HomePage() {
  const ferramentas = [
    {
      numero: "01",
      titulo: "Gerador de Conteúdo",
      descricao:
        "Crie conteúdos estratégicos para atrair, engajar e gerar oportunidades.",
      link: "/ferramentas/conteudo",
    },
    {
      numero: "02",
      titulo: "Gerador de Ideias",
      descricao:
        "Encontre ideias de negócios, serviços e oportunidades utilizando IA.",
      link: "/ferramentas/ideias",
    },
    {
      numero: "03",
      titulo: "Gerador de Ofertas",
      descricao:
        "Transforme produtos e serviços em ofertas mais claras e atrativas.",
      link: "/ferramentas/ofertas",
    },
    {
      numero: "04",
      titulo: "Gerador de Posts",
      descricao:
        "Crie posts, carrosséis, chamadas, CTAs e estruturas de conteúdo.",
      link: "/ferramentas/posts",
    },
    {
      numero: "05",
      titulo: "Gerador de Público",
      descricao:
        "Entenda seu público, suas dores, desejos, objeções e comunicação.",
      link: "/ferramentas/publico",
    },
    {
      numero: "06",
      titulo: "Estratégias Digitais",
      descricao:
        "Monte estratégias práticas para transformar conhecimento em oportunidades.",
      link: "/ferramentas/estrategias-digitais",
    },
  ];

  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroBadge}>
          <span style={styles.statusDot}></span>
          PLATAFORMA DE INTELIGÊNCIA ARTIFICIAL
        </div>

        <h1 style={styles.heroTitle}>
          Transforme
          <br />
          <span style={styles.heroHighlight}>
            IA em oportunidades.
          </span>
        </h1>

        <p style={styles.heroDescription}>
          Uma plataforma criada para ajudar você a usar inteligência
          artificial para criar conteúdo, encontrar oportunidades,
          desenvolver ofertas e construir estratégias digitais.
        </p>

        <div style={styles.heroActions}>
          <Link href="/login" style={styles.primaryButton}>
            Começar agora →
          </Link>

          <a href="#ferramentas" style={styles.secondaryButton}>
            Explorar plataforma
          </a>
        </div>

        <div style={styles.heroInfo}>
          <span>✓ Ferramentas com IA</span>
          <span>✓ Estratégias práticas</span>
          <span>✓ Feito para começar do zero</span>
        </div>
      </section>

      {/* ESTATÍSTICAS */}
      <section style={styles.statsSection}>
        <div style={styles.stat}>
          <strong style={styles.statNumber}>06</strong>
          <span style={styles.statLabel}>Ferramentas IA</span>
        </div>

        <div style={styles.stat}>
          <strong style={styles.statNumber}>10+</strong>
          <span style={styles.statLabel}>Prompts estratégicos</span>
        </div>

        <div style={styles.stat}>
          <strong style={styles.statNumber}>08</strong>
          <span style={styles.statLabel}>Estratégias</span>
        </div>

        <div style={styles.stat}>
          <strong style={styles.statNumber}>24/7</strong>
          <span style={styles.statLabel}>Disponibilidade</span>
        </div>
      </section>

      {/* FERRAMENTAS */}
      <section id="ferramentas" style={styles.toolsSection}>
        <div style={styles.sectionHeader}>
          <div>
            <span style={styles.sectionLabel}>
              PLATAFORMA
            </span>

            <h2 style={styles.sectionTitle}>
              Ferramentas para
              <br />
              <span style={styles.sectionHighlight}>
                colocar a IA para trabalhar.
              </span>
            </h2>
          </div>

          <p style={styles.sectionDescription}>
            Escolha uma ferramenta, informe o que você precisa
            e deixe a inteligência artificial ajudar na execução.
          </p>
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

              <div>
                <h3 style={styles.toolTitle}>
                  {ferramenta.titulo}
                </h3>

                <p style={styles.toolDescription}>
                  {ferramenta.descricao}
                </p>
              </div>

              <span style={styles.toolAction}>
                Abrir ferramenta →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TECNOLOGIA */}
      <section style={styles.technologySection}>
        <div style={styles.techCard}>
          <div style={styles.techBadge}>
            IA LUCRATIVA
          </div>

          <h2 style={styles.techTitle}>
            Não é apenas uma ferramenta.
            <br />
            É um sistema para executar.
          </h2>

          <p style={styles.techDescription}>
            A IA LUCRATIVA foi pensada para transformar inteligência
            artificial em ações práticas: criar, testar, melhorar,
            vender e evoluir.
          </p>

          <Link
            href="/dashboard"
            style={styles.techButton}
          >
            Conhecer meu painel →
          </Link>
        </div>
      </section>

      {/* ROADMAP */}
      <section style={styles.futureSection}>
        <div style={styles.futureBadge}>
          ROADMAP
        </div>

        <h2 style={styles.futureTitle}>
          A plataforma está apenas começando.
        </h2>

        <p style={styles.futureDescription}>
          Novas ferramentas, automações, recursos inteligentes,
          área do cliente e planos avançados farão parte da evolução
          da IA LUCRATIVA.
        </p>

        <div style={styles.futureGrid}>
          <div style={styles.futureItem}>
            <strong>IA Automática</strong>
            <span>
              Assistência inteligente dentro da plataforma.
            </span>
          </div>

          <div style={styles.futureItem}>
            <strong>Automações</strong>
            <span>
              Processos mais rápidos e inteligentes.
            </span>
          </div>

          <div style={styles.futureItem}>
            <strong>Área do Cliente</strong>
            <span>
              Seu espaço para acessar todos os recursos.
            </span>
          </div>

          <div style={styles.futureItem}>
            <strong>Planos Premium</strong>
            <span>
              Mais recursos para quem quiser evoluir.
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerBrand}>
          IA LUCRATIVA
        </div>

        <p style={styles.footerText}>
          Transforme inteligência artificial em oportunidades.
        </p>

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
    background: "transparent",
    color: "#ffffff",
  },

  hero: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "65px 24px 70px",
    textAlign: "center",
  },

  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid rgba(0, 255, 170, 0.15)",
    borderRadius: "999px",
    padding: "9px 15px",
    background: "rgba(0, 255, 170, 0.035)",
    color: "#7d8783",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#00ffaa",
    boxShadow: "0 0 10px rgba(0, 255, 170, 0.6)",
  },

  heroTitle: {
    margin: "25px 0 20px",
    fontSize: "clamp(48px, 9vw, 92px)",
    lineHeight: "0.98",
    letterSpacing: "-4px",
    fontWeight: "900",
  },

  heroHighlight: {
    color: "#00ffaa",
  },

  heroDescription: {
    maxWidth: "690px",
    margin: "0 auto",
    color: "#929a96",
    fontSize: "17px",
    lineHeight: "1.7",
  },

  heroActions: {
    marginTop: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  primaryButton: {
    background: "#00ffaa",
    color: "#03100b",
    textDecoration: "none",
    padding: "15px 24px",
    borderRadius: "11px",
    fontSize: "14px",
    fontWeight: "900",
    boxShadow: "0 0 25px rgba(0, 255, 170, 0.12)",
  },

  secondaryButton: {
    background: "#0b1110",
    color: "#ffffff",
    textDecoration: "none",
    border: "1px solid rgba(0, 255, 170, 0.14)",
    padding: "14px 23px",
    borderRadius: "11px",
    fontSize: "14px",
    fontWeight: "800",
  },

  heroInfo: {
    marginTop: "28px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    color: "#65706b",
    fontSize: "12px",
  },

  statsSection: {
    maxWidth: "1050px",
    margin: "0 auto",
    padding: "0 24px 70px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1px",
    background: "rgba(0, 255, 170, 0.08)",
  },

  stat: {
    minHeight: "125px",
    background: "#080d0b",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  statNumber: {
    color: "#00ffaa",
    fontSize: "30px",
    fontWeight: "900",
  },

  statLabel: {
    marginTop: "7px",
    color: "#6f7874",
    fontSize: "12px",
  },

  toolsSection: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "70px 24px 80px",
    boxSizing: "border-box",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "40px",
    flexWrap: "wrap",
    marginBottom: "45px",
  },

  sectionLabel: {
    color: "#00ffaa",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1.5px",
  },

  sectionTitle: {
    margin: "12px 0 0",
    fontSize: "clamp(34px, 5vw, 58px)",
    lineHeight: "1.05",
    letterSpacing: "-2px",
  },

  sectionHighlight: {
    color: "#7b8580",
  },

  sectionDescription: {
    maxWidth: "390px",
    color: "#7c8581",
    fontSize: "14px",
    lineHeight: "1.7",
    margin: 0,
  },

  toolsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "14px",
  },

  toolCard: {
    minHeight: "270px",
    padding: "25px",
    boxSizing: "border-box",
    background:
      "linear-gradient(145deg, #0b1110, #080c0b)",
    border: "1px solid rgba(0, 255, 170, 0.1)",
    borderRadius: "17px",
    color: "#ffffff",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "0.2s",
  },

  toolTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toolNumber: {
    color: "#00a879",
    fontSize: "12px",
    fontWeight: "900",
  },

  toolArrow: {
    color: "#00ffaa",
    fontSize: "20px",
  },

  toolTitle: {
    margin: "45px 0 10px",
    fontSize: "21px",
    fontWeight: "800",
  },

  toolDescription: {
    margin: 0,
    color: "#777f7b",
    fontSize: "13px",
    lineHeight: "1.7",
  },

  toolAction: {
    marginTop: "25px",
    color: "#00ffaa",
    fontSize: "12px",
    fontWeight: "800",
  },

  technologySection: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "20px 24px 80px",
    boxSizing: "border-box",
  },

  techCard: {
    border: "1px solid rgba(0, 255, 170, 0.12)",
    borderRadius: "22px",
    padding: "55px",
    background:
      "radial-gradient(circle at 80% 20%, rgba(0, 255, 170, 0.08), transparent 35%), #080d0b",
  },

  techBadge: {
    color: "#00ffaa",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1.5px",
  },

  techTitle: {
    margin: "18px 0",
    fontSize: "clamp(30px, 5vw, 52px)",
    lineHeight: "1.05",
    letterSpacing: "-2px",
  },

  techDescription: {
    maxWidth: "620px",
    color: "#7d8581",
    fontSize: "15px",
    lineHeight: "1.7",
  },

  techButton: {
    display: "inline-block",
    marginTop: "20px",
    background: "#00ffaa",
    color: "#03100b",
    textDecoration: "none",
    padding: "14px 20px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "900",
  },

  futureSection: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px 24px 80px",
    textAlign: "center",
    boxSizing: "border-box",
  },

  futureBadge: {
    color: "#00ffaa",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1.5px",
  },

  futureTitle: {
    margin: "15px 0",
    fontSize: "clamp(30px, 5vw, 48px)",
    letterSpacing: "-1.5px",
  },

  futureDescription: {
    maxWidth: "650px",
    margin: "0 auto",
    color: "#777f7b",
    fontSize: "14px",
    lineHeight: "1.7",
  },

  futureGrid: {
    marginTop: "35px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "12px",
  },

  futureItem: {
    padding: "22px",
    background: "#080d0b",
    border: "1px solid rgba(0, 255, 170, 0.09)",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    textAlign: "left",
  },

  footer: {
    borderTop: "1px solid rgba(0, 255, 170, 0.08)",
    padding: "35px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
    textAlign: "center",
  },

  footerBrand: {
    color: "#00ffaa",
    fontSize: "14px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  footerText: {
    margin: 0,
    color: "#606a65",
    fontSize: "12px",
  },

  footerInstagram: {
    color: "#808a85",
    fontSize: "12px",
    fontWeight: "700",
  },
};
