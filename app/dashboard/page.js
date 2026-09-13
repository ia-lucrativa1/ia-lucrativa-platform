"use client";

import { useEffect, useState } from "react";
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
icone: "✍️",
titulo: "Gerador de Conteúdo",
descricao: "Crie conteúdos estratégicos com IA.",
link: "/ferramentas/conteudo",
},
{
icone: "💡",
titulo: "Gerador de Ideias",
descricao: "Encontre ideias e oportunidades.",
link: "/ferramentas/ideias",
},
{
icone: "💰",
titulo: "Gerador de Ofertas",
descricao: "Crie ofertas mais atrativas.",
link: "/ferramentas/ofertas",
},
{
icone: "📱",
titulo: "Gerador de Posts",
descricao: "Crie posts e carrosséis.",
link: "/ferramentas/posts",
},
{
icone: "🎯",
titulo: "Gerador de Público",
descricao: "Defina e entenda seu público.",
link: "/ferramentas/publico",
},
{
icone: "🚀",
titulo: "Estratégias Digitais",
descricao: "Crie planos para seus objetivos.",
link: "/ferramentas/estrategias-digitais",
},
];

if (verificando) {
return (
<main style={styles.loadingPage}>
<div style={styles.loadingCard}>
<div style={styles.loadingLogo}>IA</div>
<h2 style={styles.loadingTitle}>IA LUCRATIVA</h2>
<p style={styles.loadingText}>
Verificando sua sessão...
</p>
</div>
</main>
);
}

return (
<main style={styles.page}>
<div style={styles.container}>

    <header style={styles.navbar}>
      <a href="/dashboard" style={styles.brand}>
        <div style={styles.logo}>IA</div>

        <div>
          <strong style={styles.brandName}>
            IA LUCRATIVA
          </strong>

          <span style={styles.brandSub}>
            Plataforma de Inteligência Artificial
          </span>
        </div>
      </a>

      <nav style={styles.nav}>
        <a href="/ferramentas" style={styles.navLink}>
          Ferramentas
        </a>

        <a href="/prompts" style={styles.navLink}>
          Prompts
        </a>

        <a href="/estrategias" style={styles.navLink}>
          Estratégias
        </a>

        <a href="/conta" style={styles.navLink}>
          Minha Conta
        </a>
      </nav>
    </header>

    <section style={styles.welcome}>
      <span style={styles.welcomeText}>
        Olá{usuario?.email ? `, ${usuario.email}` : ""} 👋
      </span>
    </section>

    <section style={styles.hero}>
      <span style={styles.badge}>
        ⚡ PLATAFORMA IA LUCRATIVA
      </span>

      <h1 style={styles.heroTitle}>
        Transforme IA em
        <br />
        oportunidades.
      </h1>

      <p style={styles.heroText}>
        Tenha ferramentas, estratégias e recursos para usar
        inteligência artificial de forma prática e transformar
        ideias em resultados.
      </p>

      <a href="/ferramentas" style={styles.heroButton}>
        Explorar ferramentas →
      </a>
    </section>

    <section style={styles.stats}>

      <div style={styles.stat}>
        <strong style={styles.statNumber}>6</strong>
        <span style={styles.statLabel}>Ferramentas</span>
      </div>

      <div style={styles.stat}>
        <strong style={styles.statNumber}>10+</strong>
        <span style={styles.statLabel}>Prompts</span>
      </div>

      <div style={styles.stat}>
        <strong style={styles.statNumber}>8</strong>
        <span style={styles.statLabel}>Estratégias</span>
      </div>

      <div style={styles.stat}>
        <strong style={styles.statNumber}>24/7</strong>
        <span style={styles.statLabel}>Disponível</span>
      </div>

    </section>

    <section style={styles.section}>

      <div style={styles.sectionHeader}>
        <div>
          <span style={styles.sectionTag}>
            RECURSOS
          </span>

          <h2 style={styles.sectionTitle}>
            Suas ferramentas
          </h2>

          <p style={styles.sectionText}>
            Escolha uma ferramenta e comece a criar.
          </p>
        </div>

        <a href="/ferramentas" style={styles.viewAll}>
          Ver todas →
        </a>
      </div>

      <div style={styles.grid}>

        {ferramentas.map((ferramenta) => (
          <a
            key={ferramenta.titulo}
            href={ferramenta.link}
            style={styles.card}
          >
            <div style={styles.cardIcon}>
              {ferramenta.icone}
            </div>

            <h3 style={styles.cardTitle}>
              {ferramenta.titulo}
            </h3>

            <p style={styles.cardText}>
              {ferramenta.descricao}
            </p>

            <span style={styles.cardLink}>
              Abrir ferramenta →
            </span>
          </a>
        ))}

      </div>
    </section>

    <section style={styles.bottomGrid}>

      <a href="/prompts" style={styles.featureCard}>
        <div style={styles.featureIcon}>🧠</div>

        <div>
          <h3 style={styles.featureTitle}>
            Biblioteca de Prompts
          </h3>

          <p style={styles.featureText}>
            Encontre comandos prontos para diferentes objetivos.
          </p>

          <span style={styles.featureLink}>
            Explorar prompts →
          </span>
        </div>
      </a>

      <a href="/estrategias" style={styles.featureCard}>
        <div style={styles.featureIcon}>📈</div>

        <div>
          <h3 style={styles.featureTitle}>
            Estratégias Digitais
          </h3>

          <p style={styles.featureText}>
            Aprenda como transformar conhecimento e IA em oportunidades.
          </p>

          <span style={styles.featureLink}>
            Ver estratégias →
          </span>
        </div>
      </a>

    </section>

    <footer style={styles.footer}>
      <strong>IA LUCRATIVA</strong>
      <br />
      Transforme IA em oportunidades.
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
padding: "20px",
fontFamily: "Arial, sans-serif",
},

container: {
maxWidth: "1150px",
margin: "0 auto",
},

navbar: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
gap: "25px",
padding: "15px 0",
borderBottom: "1px solid #202020",
},

brand: {
display: "flex",
alignItems: "center",
gap: "12px",
textDecoration: "none",
color: "#ffffff",
},

logo: {
width: "44px",
height: "44px",
borderRadius: "12px",
background: "#ffffff",
color: "#000000",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontWeight: "900",
fontSize: "16px",
},

brandName: {
display: "block",
fontSize: "15px",
},

brandSub: {
display: "block",
color: "#666",
fontSize: "10px",
marginTop: "3px",
},

nav: {
display: "flex",
gap: "20px",
flexWrap: "wrap",
justifyContent: "flex-end",
},

navLink: {
color: "#aaa",
textDecoration: "none",
fontSize: "13px",
},

welcome: {
textAlign: "right",
paddingTop: "18px",
},

welcomeText: {
color: "#777",
fontSize: "12px",
},

hero: {
textAlign: "center",
padding: "65px 20px 70px",
},

badge: {
display: "inline-block",
border: "1px solid #292929",
background: "#101010",
borderRadius: "30px",
padding: "9px 15px",
color: "#aaa",
fontSize: "11px",
fontWeight: "bold",
letterSpacing: "1px",
},

heroTitle: {
fontSize: "clamp(42px, 8vw, 76px)",
lineHeight: "1.02",
margin: "25px 0 20px",
letterSpacing: "-2px",
},

heroText: {
maxWidth: "680px",
margin: "0 auto 30px",
color: "#999",
lineHeight: "1.7",
fontSize: "16px",
},

heroButton: {
display: "inline-block",
background: "#ffffff",
color: "#000000",
textDecoration: "none",
padding: "15px 22px",
borderRadius: "10px",
fontWeight: "bold",
fontSize: "14px",
},

stats: {
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
gap: "12px",
marginBottom: "80px",
},

stat: {
background: "#101010",
border: "1px solid #222",
borderRadius: "14px",
padding: "20px",
textAlign: "center",
},

statNumber: {
display: "block",
fontSize: "25px",
marginBottom: "6px",
},

statLabel: {
color: "#777",
fontSize: "12px",
},

section: {
marginBottom: "55px",
},

sectionHeader: {
display: "flex",
justifyContent: "space-between",
alignItems: "flex-end",
gap: "20px",
marginBottom: "22px",
},

sectionTag: {
color: "#666",
fontSize: "11px",
fontWeight: "bold",
letterSpacing: "2px",
},

sectionTitle: {
fontSize: "30px",
margin: "8px 0",
},

sectionText: {
color: "#777",
margin: "0",
fontSize: "14px",
},

viewAll: {
color: "#aaa",
textDecoration: "none",
fontSize: "13px",
},

grid: {
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
gap: "15px",
},

card: {
display: "block",
background: "#101010",
border: "1px solid #222",
borderRadius: "16px",
padding: "24px",
textDecoration: "none",
color: "#ffffff",
},

cardIcon: {
fontSize: "28px",
marginBottom: "18px",
},

cardTitle: {
fontSize: "17px",
margin: "0 0 8px",
},

cardText: {
color: "#777",
fontSize: "13px",
lineHeight: "1.6",
margin: "0 0 18px",
},

cardLink: {
color: "#ffffff",
fontSize: "12px",
fontWeight: "bold",
},

bottomGrid: {
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
gap: "15px",
marginBottom: "70px",
},

featureCard: {
display: "flex",
gap: "18px",
alignItems: "flex-start",
background: "#101010",
border: "1px solid #222",
borderRadius: "16px",
padding: "24px",
textDecoration: "none",
color: "#ffffff",
},

featureIcon: {
fontSize: "30px",
},

featureTitle: {
margin: "0 0 8px",
fontSize: "17px",
},

featureText: {
color: "#777",
fontSize: "13px",
lineHeight: "1.6",
margin: "0 0 15px",
},

featureLink: {
color: "#ffffff",
fontSize: "12px",
fontWeight: "bold",
},

footer: {
textAlign: "center",
borderTop: "1px solid #202020",
padding: "35px 20px",
color: "#555",
fontSize: "12px",
lineHeight: "1.8",
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

loadingCard: {
textAlign: "center",
background: "#101010",
border: "1px solid #222",
borderRadius: "18px",
padding: "40px",
maxWidth: "360px",
width: "100%",
},

loadingLogo: {
width: "55px",
height: "55px",
margin: "0 auto 20px",
borderRadius: "14px",
background: "#ffffff",
color: "#000000",
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
margin: "0",
color: "#777",
fontSize: "13px",
},
};
