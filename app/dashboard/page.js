export default function Dashboard() {
  const ferramentas = [
    {
      titulo: "IA Automática",
      descricao: "Converse com a IA LUCRATIVA e transforme ideias em ações.",
      link: "/ia",
      destaque: true,
    },
    {
      titulo: "Ideias de Negócios",
      descricao: "Encontre oportunidades de negócios usando IA.",
      link: "/ferramentas",
    },
    {
      titulo: "Criador de Conteúdo",
      descricao: "Crie ideias, posts, legendas e estratégias.",
      link: "/ferramentas",
    },
    {
      titulo: "Estratégias de Vendas",
      descricao: "Crie ofertas e estratégias para vender no digital.",
      link: "/ferramentas",
    },
  ];

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.logo}>IA LUCRATIVA</div>
          <p style={styles.welcome}>Painel do usuário</p>
        </div>

        <a href="/" style={styles.logout}>
          Sair
        </a>
      </header>

      <section style={styles.hero}>
        <span style={styles.tag}>🚀 PLATAFORMA IA LUCRATIVA</span>

        <h1>
          Transforme suas ideias em
          <span style={styles.highlight}> oportunidades.</span>
        </h1>

        <p>
          Tenha ferramentas de inteligência artificial para criar conteúdo,
          encontrar oportunidades, vender e desenvolver seu negócio digital.
        </p>

        <a href="/ia" style={styles.mainButton}>
          🤖 Usar IA Automática
        </a>
      </section>

      <section style={styles.stats}>
        <div style={styles.stat}>
          <strong>0</strong>
          <span>Projetos criados</span>
        </div>

        <div style={styles.stat}>
          <strong>0</strong>
          <span>Consultas à IA</span>
        </div>

        <div style={styles.stat}>
          <strong>0</strong>
          <span>Favoritos</span>
        </div>
      </section>

      <section>
        <div style={styles.sectionTitle}>
          <h2>Ferramentas</h2>
          <a href="/ferramentas">Ver todas →</a>
        </div>

        <div style={styles.grid}>
          {ferramentas.map((ferramenta) => (
            <a
              key={ferramenta.titulo}
              href={ferramenta.link}
              style={{
                ...styles.tool,
                ...(ferramenta.destaque ? styles.featured : {}),
              }}
            >
              <span style={styles.icon}>
                {ferramenta.destaque ? "🤖" : "✦"}
              </span>

              <h3>{ferramenta.titulo}</h3>

              <p>{ferramenta.descricao}</p>

              <span style={styles.access}>Acessar →</span>
            </a>
          ))}
        </div>
      </section>

      <section style={styles.bottomGrid}>
        <a href="/afiliados" style={styles.smallCard}>
          <span>💰</span>
          <div>
            <h3>Área de Afiliados</h3>
            <p>Divulgue a IA LUCRATIVA e acompanhe seus resultados.</p>
          </div>
        </a>

        <a href="/historico" style={styles.smallCard}>
          <span>🕐</span>
          <div>
            <h3>Histórico</h3>
            <p>Consulte suas criações e conversas anteriores.</p>
          </div>
        </a>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "28px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "55px",
  },

  logo: {
    color: "#00e5ff",
    fontSize: "20px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  welcome: {
    color: "#75828b",
    marginTop: "5px",
  },

  logout: {
    color: "#9aa7ae",
    border: "1px solid #25343d",
    padding: "10px 18px",
    borderRadius: "10px",
  },

  hero: {
    padding: "45px 35px",
    borderRadius: "25px",
    background:
      "radial-gradient(circle at top right, #10303a, #0a1015 55%, #070a0d)",
    border: "1px solid #1b3139",
    marginBottom: "25px",
  },

  tag: {
    color: "#00e5ff",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  hero h1: {
    fontSize: "clamp(32px, 6vw, 58px)",
    lineHeight: "1.05",
    margin: "18px 0",
    maxWidth: "800px",
  },

  highlight: {
    color: "#00e5ff",
  },

  hero p: {
    color: "#9aa8af",
    maxWidth: "700px",
    lineHeight: "1.7",
    marginBottom: "28px",
  },

  mainButton: {
    display: "inline-block",
    background: "#00e5ff",
    color: "#031014",
    fontWeight: "800",
    padding: "14px 22px",
    borderRadius: "12px",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    marginBottom: "45px",
  },

  stat: {
    background: "#0b1015",
    border: "1px solid #1b2931",
    padding: "22px",
    borderRadius: "16px",
  },

  stat strong: {
    display: "block",
    fontSize: "28px",
    marginBottom: "5px",
  },

  stat span: {
    color: "#7d8b93",
    fontSize: "14px",
  },

  sectionTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  sectionTitle a: {
    color: "#00e5ff",
    fontSize: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  tool: {
    display: "block",
    background: "#0b1015",
    border: "1px solid #1b2931",
    borderRadius: "18px",
    padding: "25px",
  },

  featured: {
    border: "1px solid #00e5ff",
    background: "#0b171c",
  },

  icon: {
    fontSize: "26px",
  },

  tool h3: {
    margin: "15px 0 8px",
  },

  tool p: {
    color: "#7d8b93",
    lineHeight: "1.5",
    fontSize: "14px",
    minHeight: "65px",
  },

  access: {
    display: "inline-block",
    color: "#00e5ff",
    marginTop: "15px",
    fontWeight: "700",
    fontSize: "14px",
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "15px",
    marginTop: "35px",
  },

  smallCard: {
    display: "flex",
    gap: "18px",
    alignItems: "flex-start",
    background: "#0b1015",
    border: "1px solid #1b2931",
    borderRadius: "18px",
    padding: "22px",
  },

  smallCard span: {
    fontSize: "28px",
  },

  smallCard p: {
    color: "#7d8b93",
    fontSize: "14px",
    marginTop: "7px",
    lineHeight: "1.5",
  },
};
