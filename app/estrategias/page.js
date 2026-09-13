"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Estrategias() {
  const router = useRouter();

  const [verificando, setVerificando] = useState(true);
  const [categoria, setCategoria] = useState("Todas");
  const [busca, setBusca] = useState("");

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

    const texto =
      `${item.titulo} ${item.descricao} ${item.categoria} ${item.passos.join(
        " "
      )}`.toLowerCase();

    const correspondeBusca = texto.includes(busca.toLowerCase());

    return correspondeCategoria && correspondeBusca;
  });

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
      {/* HERO */}
      <section style={styles.hero}>
        <span style={styles.badge}>
          📈 ESTRATÉGIAS IA LUCRATIVA
        </span>

        <h1 style={styles.title}>
          Transforme conhecimento
          <br />
          em{" "}
          <span style={styles.highlight}>
            ação.
          </span>
        </h1>

        <p style={styles.description}>
          Estratégias práticas para começar do zero,
          criar conteúdo, encontrar clientes e desenvolver
          oportunidades usando inteligência artificial.
        </p>

        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>
            🔎
          </span>

          <input
            type="text"
            placeholder="Pesquisar estratégia..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={styles.input}
          />
        </div>
      </section>

      {/* CONTEÚDO */}
      <section style={styles.container}>
        {/* CATEGORIAS */}
        <div style={styles.categories}>
          {categorias.map((item) => (
            <button
              key={item}
              onClick={() => setCategoria(item)}
              style={{
                ...styles.categoryButton,
                ...(categoria === item
                  ? styles.categoryActive
                  : {}),
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* CABEÇALHO */}
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>
              Estratégias disponíveis
            </h2>

            <p style={styles.sectionDescription}>
              Escolha uma estratégia e coloque em prática.
            </p>
          </div>

          <span style={styles.counter}>
            {filtradas.length} disponíveis
          </span>
        </div>

        {/* GRID */}
        <div style={styles.grid}>
          {filtradas.map((item) => (
            <article
              key={item.id}
              style={styles.card}
            >
              <div style={styles.cardHeader}>
                <div style={styles.icon}>
                  {item.icon}
                </div>

                <span style={styles.tag}>
                  {item.categoria}
                </span>
              </div>

              <h3 style={styles.cardTitle}>
                {item.titulo}
              </h3>

              <p style={styles.cardDescription}>
                {item.descricao}
              </p>

              <div style={styles.steps}>
                <strong style={styles.stepsTitle}>
                  PASSO A PASSO
                </strong>

                {item.passos.map((passo, index) => (
                  <div
                    key={index}
                    style={styles.step}
                  >
                    <span style={styles.stepNumber}>
                      {index + 1}
                    </span>

                    <span style={styles.stepText}>
                      {passo}
                    </span>
                  </div>
                ))}
              </div>

              <button style={styles.actionButton}>
                Começar estratégia →
              </button>
            </article>
          ))}
        </div>

        {/* ESTADO VAZIO */}
        {filtradas.length === 0 && (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>
              🔍
            </div>

            <h3 style={styles.emptyTitle}>
              Nenhuma estratégia encontrada
            </h3>

            <p style={styles.emptyText}>
              Experimente pesquisar outro termo.
            </p>
          </div>
        )}
      </section>

      {/* MOTIVAÇÃO */}
      <section style={styles.motivation}>
        <div style={styles.motivationIcon}>
          ⚡
        </div>

        <div>
          <h3 style={styles.motivationTitle}>
            Conhecimento só gera resultado quando
            colocado em prática.
          </h3>

          <p style={styles.motivationText}>
            Escolha uma estratégia, siga os passos e
            transforme pequenas ações em novas
            oportunidades no digital.
          </p>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer style={styles.footer}>
        <div style={styles.footerBrand}>
          IA LUCRATIVA
        </div>

        <div style={styles.footerText}>
          Estratégias, ferramentas e inteligência
          artificial para criar novas oportunidades.
        </div>

        <div style={styles.instagram}>
          @ia.lucrativa1
        </div>
      </footer>
    </main>
  );
}

const styles = {
  loadingPage: {
    minHeight: "100vh",
    background: "#050505",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },

  loadingBox: {
    textAlign: "center",
  },

  loadingLogo: {
    fontSize: "22px",
    fontWeight: "900",
    letterSpacing: "1px",
    color: "#00ffaa",
  },

  loadingText: {
    marginTop: "10px",
    color: "#888888",
    fontSize: "14px",
  },

  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #111814 0%, #080808 35%, #050505 100%)",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    paddingBottom: "60px",
  },

  hero: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "65px 20px 45px",
    textAlign: "center",
  },

  badge: {
    display: "inline-block",
    padding: "9px 14px",
    borderRadius: "999px",
    border: "1px solid #1f3f35",
    background: "#07130f",
    color: "#00ffaa",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  title: {
    fontSize: "clamp(38px, 7vw, 72px)",
    lineHeight: "1.02",
    margin: "22px 0",
    fontWeight: "900",
    letterSpacing: "-2px",
  },

  highlight: {
    color: "#00ffaa",
  },

  description: {
    maxWidth: "720px",
    margin: "0 auto",
    color: "#9b9b9b",
    fontSize: "16px",
    lineHeight: "1.7",
  },

  searchBox: {
    maxWidth: "620px",
    margin: "32px auto 0",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px 17px",
    borderRadius: "14px",
    border: "1px solid #292929",
    background: "#0d0d0d",
    boxSizing: "border-box",
    boxShadow:
      "0 0 25px rgba(0, 255, 170, 0.04)",
  },

  searchIcon: {
    fontSize: "16px",
  },

  input: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#ffffff",
    fontSize: "15px",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },

  categories: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "35px",
  },

  categoryButton: {
    border: "1px solid #292929",
    background: "#0d0d0d",
    color: "#999999",
    padding: "11px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "700",
  },

  categoryActive: {
    background: "#00ffaa",
    color: "#050505",
    borderColor: "#00ffaa",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "25px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "25px",
    fontWeight: "900",
  },

  sectionDescription: {
    margin: "7px 0 0",
    color: "#777777",
    fontSize: "14px",
  },

  counter: {
    color: "#00ffaa",
    fontSize: "12px",
    whiteSpace: "nowrap",
    background: "#07130f",
    border: "1px solid #1f3f35",
    borderRadius: "50px",
    padding: "7px 10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "18px",
  },

  card: {
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015))",
    border: "1px solid #242424",
    borderRadius: "18px",
    padding: "22px",
    boxSizing: "border-box",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  },

  icon: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "#07130f",
    border: "1px solid #1f3f35",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  tag: {
    fontSize: "10px",
    color: "#00ffaa",
    background: "#07130f",
    border: "1px solid #1f3f35",
    borderRadius: "999px",
    padding: "7px 10px",
    fontWeight: "800",
    textTransform: "uppercase",
  },

  cardTitle: {
    margin: "20px 0 9px",
    fontSize: "21px",
    fontWeight: "900",
  },

  cardDescription: {
    margin: 0,
    color: "#888888",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  steps: {
    marginTop: "22px",
    paddingTop: "18px",
    borderTop: "1px solid #242424",
  },

  stepsTitle: {
    display: "block",
    marginBottom: "14px",
    fontSize: "10px",
    letterSpacing: "1px",
    color: "#00ffaa",
  },

  step: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "11px",
  },

  stepNumber: {
    flexShrink: 0,
    width: "23px",
    height: "23px",
    borderRadius: "50%",
    background: "#00ffaa",
    color: "#050505",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "900",
  },

  stepText: {
    color: "#b1b1b1",
    fontSize: "13px",
    lineHeight: "1.5",
    paddingTop: "2px",
  },

  actionButton: {
    width: "100%",
    marginTop: "12px",
    padding: "13px",
    borderRadius: "10px",
    border: "1px solid #00ffaa",
    background: "#00ffaa",
    color: "#050505",
    fontSize: "13px",
    fontWeight: "900",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    padding: "70px 20px",
    border: "1px solid #242424",
    borderRadius: "18px",
    background: "#0c0c0c",
  },

  emptyIcon: {
    fontSize: "35px",
    marginBottom: "10px",
  },

  emptyTitle: {
    margin: 0,
    fontSize: "18px",
  },

  emptyText: {
    color: "#777777",
    fontSize: "14px",
  },

  motivation: {
    maxWidth: "1160px",
    margin: "45px auto 0",
    padding: "24px",
    borderRadius: "18px",
    border: "1px solid #1f3f35",
    background: "#0d0d0d",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    boxSizing: "border-box",
  },

  motivationIcon: {
    width: "50px",
    height: "50px",
    flexShrink: 0,
    borderRadius: "14px",
    background: "#00ffaa",
    color: "#050505",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "23px",
  },

  motivationTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "900",
  },

  motivationText: {
    margin: "7px 0 0",
    color: "#858585",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  footer: {
    maxWidth: "1200px",
    margin: "60px auto 0",
    padding: "0 20px",
    textAlign: "center",
    boxSizing: "border-box",
  },

  footerBrand: {
    fontSize: "17px",
    fontWeight: "900",
    letterSpacing: "1px",
    color: "#ffffff",
  },

  footerText: {
    marginTop: "8px",
    color: "#666666",
    fontSize: "12px",
  },

  instagram: {
    marginTop: "12px",
    color: "#00ffaa",
    fontSize: "12px",
    fontWeight: "700",
  },
};
