"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function EstrategiasDigitaisPage() {
const router = useRouter();

const [verificando, setVerificando] = useState(true);
const [nicho, setNicho] = useState("");
const [objetivo, setObjetivo] = useState("Criar renda");
const [nivel, setNivel] = useState("Iniciante");
const [resultado, setResultado] = useState("");
const [carregando, setCarregando] = useState(false);
const [copiado, setCopiado] = useState(false);
const [erro, setErro] = useState("");

useEffect(() => {
async function verificarUsuario() {
const { data } = await supabase.auth.getSession();

  if (!data.session) {
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

async function gerarEstrategia() {
if (!nicho.trim()) {
setErro("Digite seu nicho ou área de atuação.");
return;
}

setCarregando(true);
setResultado("");
setErro("");
setCopiado(false);

const prompt = `

Crie uma estratégia digital prática e personalizada para alguém que atua no nicho de "${nicho}".

Objetivo principal: ${objetivo}
Nível de experiência: ${nivel}

A estratégia deve ser realista para quem está começando e deve mostrar como a inteligência artificial pode ajudar.

Organize exatamente nos seguintes tópicos:

1. OPORTUNIDADE
   Explique qual oportunidade existe nesse nicho.

2. POSICIONAMENTO
   Sugira um posicionamento claro e diferente.

3. PÚBLICO-ALVO
   Descreva quem pode ser atendido, sem inventar dados específicos que não foram informados.

4. PROBLEMA
   Quais problemas esse público normalmente possui?

5. SOLUÇÃO
   Qual solução pode ser oferecida utilizando inteligência artificial?

6. MODELO DE NEGÓCIO
   Mostre formas práticas de transformar essa solução em dinheiro.

7. OFERTA
   Crie uma oferta inicial simples e atrativa.

8. AQUISIÇÃO DE CLIENTES
   Mostre formas orgânicas de encontrar os primeiros clientes.

9. PRIMEIRA VENDA
   Explique passo a passo como buscar a primeira venda.

10. FERRAMENTAS DE IA
    Sugira categorias de ferramentas de IA que podem ajudar em cada etapa.

11. PLANO DE 7 DIAS
    Crie uma ação prática para cada um dos próximos 7 dias.

12. PRÓXIMO PASSO
    Finalize indicando exatamente o que a pessoa deve fazer primeiro.

Seja direto, profissional e acionável.
Evite respostas genéricas.
Dê exemplos quando forem úteis.
`;

try {
  const response = await fetch("/api/ia", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.sucesso) {
    throw new Error(
      data?.erro || "Não foi possível gerar a estratégia."
    );
  }

  setResultado(data.resultado);
} catch (error) {
  setErro(
    error.message ||
      "Ocorreu um erro ao gerar sua estratégia."
  );
} finally {
  setCarregando(false);
}

}

async function copiarResultado() {
if (!resultado) return;

try {
  await navigator.clipboard.writeText(resultado);
  setCopiado(true);

  setTimeout(() => {
    setCopiado(false);
  }, 2000);
} catch {
  setErro("Não foi possível copiar o resultado.");
}

}

function limpar() {
setNicho("");
setObjetivo("Criar renda");
setNivel("Iniciante");
setResultado("");
setErro("");
setCopiado(false);
}

if (verificando) {
return (
<main style={styles.loadingPage}>
<div style={styles.loadingBox}>
<div style={styles.loadingLogo}>IA LUCRATIVA</div>
<div style={styles.loadingText}>
Verificando acesso...
</div>
</div>
</main>
);
}

return (
<main style={styles.page}>
<header style={styles.header}>
<div>
<div style={styles.brand}>IA LUCRATIVA</div>
<div style={styles.subtitle}>Estratégias Digitais</div>
</div>

    <a href="/dashboard" style={styles.backButton}>
      Dashboard
    </a>
  </header>

  <section style={styles.container}>
    <div style={styles.hero}>
      <span style={styles.badge}>
        IA LUCRATIVA • ESTRATÉGIA
      </span>

      <h1 style={styles.title}>
        Crie sua estratégia
        <br />
        <span style={styles.highlight}>digital com IA.</span>
      </h1>

      <p style={styles.description}>
        Descubra oportunidades, monte uma oferta e tenha um
        plano prático para começar a transformar seu nicho em
        uma oportunidade digital.
      </p>
    </div>

    <section style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>
          Configure sua estratégia
        </h2>

        <p style={styles.cardDescription}>
          Quanto mais contexto você fornecer, mais personalizada
          será a estratégia.
        </p>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.field}>
          <label style={styles.label}>
            Nicho ou área de atuação
          </label>

          <input
            type="text"
            value={nicho}
            onChange={(event) => setNicho(event.target.value)}
            placeholder="Ex.: Design gráfico, estética, marketing..."
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>
            Objetivo principal
          </label>

          <select
            value={objetivo}
            onChange={(event) =>
              setObjetivo(event.target.value)
            }
            style={styles.input}
          >
            <option>Criar renda</option>
            <option>Criar um negócio</option>
            <option>Conseguir clientes</option>
            <option>Vender produtos digitais</option>
            <option>Prestar serviços</option>
            <option>Aumentar vendas</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Seu nível</label>

          <select
            value={nivel}
            onChange={(event) =>
              setNivel(event.target.value)
            }
            style={styles.input}
          >
            <option>Iniciante</option>
            <option>Intermediário</option>
            <option>Avançado</option>
          </select>
        </div>
      </div>

      {erro && (
        <div style={styles.error}>
          {erro}
        </div>
      )}

      <button
        onClick={gerarEstrategia}
        disabled={carregando}
        style={{
          ...styles.generateButton,
          opacity: carregando ? 0.7 : 1,
        }}
      >
        {carregando
          ? "Criando sua estratégia..."
          : "🚀 Gerar Estratégia com IA"}
      </button>
    </section>

    {resultado && (
      <section style={styles.resultCard}>
        <div style={styles.resultHeader}>
          <div>
            <span style={styles.resultBadge}>
              ESTRATÉGIA GERADA
            </span>

            <h2 style={styles.resultTitle}>
              Sua estratégia digital
            </h2>
          </div>

          <button
            onClick={copiarResultado}
            style={styles.copyButton}
          >
            {copiado ? "✓ Copiado" : "📋 Copiar"}
          </button>
        </div>

        <div style={styles.resultContent}>
          {resultado}
        </div>

        <div style={styles.resultActions}>
          <button
            onClick={gerarEstrategia}
            disabled={carregando}
            style={styles.secondaryButton}
          >
            🔄 Gerar novamente
          </button>

          <button
            onClick={limpar}
            style={styles.secondaryButton}
          >
            Limpar
          </button>
        </div>
      </section>
    )}

    <section style={styles.tipCard}>
      <div style={styles.tipIcon}>💡</div>

      <div>
        <h3 style={styles.tipTitle}>
          Estratégia sem execução não gera resultado.
        </h3>

        <p style={styles.tipText}>
          Use o plano de 7 dias gerado pela IA LUCRATIVA e
          transforme cada etapa em uma ação concreta.
        </p>
      </div>
    </section>
  </section>

  <footer style={styles.footer}>
    <strong>IA LUCRATIVA</strong>
    <span>
      Transforme inteligência artificial em oportunidades.
    </span>
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
fontFamily: "Arial, Helvetica, sans-serif",
},

loadingPage: {
minHeight: "100vh",
background: "#050505",
color: "#ffffff",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontFamily: "Arial, Helvetica, sans-serif",
},

loadingBox: {
textAlign: "center",
},

loadingLogo: {
fontSize: "22px",
fontWeight: "900",
letterSpacing: "1px",
},

loadingText: {
marginTop: "10px",
color: "#888888",
fontSize: "14px",
},

header: {
width: "100%",
maxWidth: "1200px",
margin: "0 auto",
padding: "22px 24px",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
gap: "20px",
boxSizing: "border-box",
borderBottom: "1px solid #1b1b1b",
},

brand: {
fontSize: "20px",
fontWeight: "900",
letterSpacing: "1px",
},

subtitle: {
marginTop: "4px",
color: "#8c8c8c",
fontSize: "13px",
},

backButton: {
textDecoration: "none",
color: "#ffffff",
border: "1px solid #333333",
borderRadius: "10px",
padding: "10px 16px",
fontSize: "14px",
fontWeight: "700",
},

container: {
width: "100%",
maxWidth: "1000px",
margin: "0 auto",
padding: "70px 24px",
boxSizing: "border-box",
},

hero: {
textAlign: "center",
marginBottom: "45px",
},

badge: {
display: "inline-block",
padding: "8px 14px",
border: "1px solid #303030",
borderRadius: "999px",
color: "#bdbdbd",
fontSize: "11px",
fontWeight: "800",
letterSpacing: "1px",
},

title: {
margin: "20px 0 15px",
fontSize: "clamp(38px, 7vw, 68px)",
lineHeight: "1.02",
letterSpacing: "-2px",
},

highlight: {
color: "#9b9b9b",
},

description: {
maxWidth: "680px",
margin: "0 auto",
color: "#9b9b9b",
fontSize: "17px",
lineHeight: "1.7",
},

card: {
background: "#0d0d0d",
border: "1px solid #202020",
borderRadius: "20px",
padding: "28px",
},

cardHeader: {
marginBottom: "25px",
},

cardTitle: {
margin: "0 0 8px",
fontSize: "24px",
},

cardDescription: {
margin: 0,
color: "#858585",
lineHeight: "1.6",
},

formGrid: {
display: "grid",
gridTemplateColumns:
"repeat(auto-fit, minmax(220px, 1fr))",
gap: "18px",
},

field: {
display: "flex",
flexDirection: "column",
gap: "8px",
},

label: {
color: "#cfcfcf",
fontSize: "13px",
fontWeight: "700",
},

input: {
width: "100%",
boxSizing: "border-box",
background: "#080808",
color: "#ffffff",
border: "1px solid #292929",
borderRadius: "11px",
padding: "14px",
fontSize: "15px",
outline: "none",
},

error: {
marginTop: "18px",
padding: "13px 15px",
borderRadius: "10px",
background: "#241010",
border: "1px solid #4a1c1c",
color: "#ffb5b5",
fontSize: "14px",
},

generateButton: {
width: "100%",
marginTop: "22px",
padding: "16px",
border: "none",
borderRadius: "12px",
background: "#ffffff",
color: "#050505",
fontSize: "15px",
fontWeight: "900",
cursor: "pointer",
},

resultCard: {
marginTop: "28px",
background: "#0d0d0d",
border: "1px solid #252525",
borderRadius: "20px",
padding: "28px",
},

resultHeader: {
display: "flex",
alignItems: "center",
justifyContent: "space-between",
gap: "20px",
flexWrap: "wrap",
paddingBottom: "20px",
borderBottom: "1px solid #222222",
},

resultBadge: {
fontSize: "11px",
fontWeight: "900",
letterSpacing: "1px",
color: "#8e8e8e",
},

resultTitle: {
margin: "7px 0 0",
fontSize: "25px",
},

copyButton: {
background: "#ffffff",
color: "#050505",
border: "none",
borderRadius: "10px",
padding: "11px 16px",
fontWeight: "800",
cursor: "pointer",
},

resultContent: {
marginTop: "24px",
whiteSpace: "pre-wrap",
color: "#dddddd",
fontSize: "15px",
lineHeight: "1.8",
overflowWrap: "anywhere",
},

resultActions: {
display: "flex",
gap: "10px",
flexWrap: "wrap",
marginTop: "25px",
},

secondaryButton: {
background: "#151515",
color: "#ffffff",
border: "1px solid #303030",
borderRadius: "10px",
padding: "11px 16px",
fontWeight: "700",
cursor: "pointer",
},

tipCard: {
marginTop: "25px",
padding: "22px",
background: "#0a0a0a",
border: "1px solid #1d1d1d",
borderRadius: "16px",
display: "flex",
alignItems: "flex-start",
gap: "15px",
},

tipIcon: {
fontSize: "24px",
},

tipTitle: {
margin: "0 0 7px",
fontSize: "16px",
},

tipText: {
margin: 0,
color: "#858585",
fontSize: "14px",
lineHeight: "1.6",
},

footer: {
borderTop: "1px solid #1b1b1b",
padding: "25px 24px",
display: "flex",
justifyContent: "center",
alignItems: "center",
gap: "15px",
flexWrap: "wrap",
color: "#777777",
fontSize: "13px",
textAlign: "center",
},
};
