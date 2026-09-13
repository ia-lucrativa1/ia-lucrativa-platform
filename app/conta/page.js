"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Conta() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [plano, setPlano] = useState("free");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    async function carregarConta() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const user = session.user;

      setUsuario(user);
      setEmail(user.email || "");

      const { data: perfil, error } = await supabase
        .from("profiles")
        .select("nome, email, plano")
        .eq("id", user.id)
        .maybeSingle();

      if (!error && perfil) {
        setNome(perfil.nome || "");
        setEmail(perfil.email || user.email || "");
        setPlano(perfil.plano || "free");
      }

      setCarregando(false);
    }

    carregarConta();

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

  async function salvarAlteracoes(e) {
    e.preventDefault();

    if (!usuario) return;

    if (!nome.trim()) {
      alert("Digite seu nome.");
      return;
    }

    setSalvando(true);
    setSalvo(false);

    const { error } = await supabase
      .from("profiles")
      .update({
        nome: nome.trim(),
      })
      .eq("id", usuario.id);

    if (error) {
      console.error(error);
      alert("Não foi possível salvar as alterações.");
      setSalvando(false);
      return;
    }

    setSalvando(false);
    setSalvo(true);

    setTimeout(() => {
      setSalvo(false);
    }, 2500);
  }

  async function sair() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Não foi possível sair da conta.");
      return;
    }

    router.replace("/login");
  }

  if (carregando) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingLogo}>IA</div>

          <h2 style={styles.loadingTitle}>
            IA LUCRATIVA
          </h2>

          <p style={styles.loadingText}>
            Carregando sua conta...
          </p>
        </div>
      </div>
    );
  }

  const primeiraLetra = nome
    ? nome.charAt(0).toUpperCase()
    : email
      ? email.charAt(0).toUpperCase()
      : "U";

  const planoFormatado =
    plano.charAt(0).toUpperCase() + plano.slice(1);

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* CABEÇALHO */}
        <header style={styles.header}>

          <div style={styles.avatar}>
            {primeiraLetra}
          </div>

          <div style={styles.headerInfo}>
            <span style={styles.eyebrow}>
              MINHA CONTA
            </span>

            <h1 style={styles.title}>
              {nome
                ? `Olá, ${nome}!`
                : "Minha Conta"}
            </h1>

            <p style={styles.subtitle}>
              Gerencie seu perfil e acompanhe sua experiência
              dentro da IA LUCRATIVA.
            </p>
          </div>

        </header>

        {/* INFORMAÇÕES PESSOAIS */}
        <section style={styles.card}>

          <div style={styles.cardHeader}>

            <div>
              <span style={styles.tag}>
                PERFIL
              </span>

              <h2 style={styles.cardTitle}>
                Informações pessoais
              </h2>

              <p style={styles.cardDescription}>
                Atualize as informações do seu perfil.
              </p>
            </div>

            <span style={styles.status}>
              ● Ativo
            </span>

          </div>

          <form onSubmit={salvarAlteracoes}>

            <label style={styles.label}>
              Nome
            </label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              style={styles.input}
              disabled={salvando}
            />

            <label style={styles.label}>
              E-mail
            </label>

            <input
              type="email"
              value={email}
              disabled
              style={styles.inputDisabled}
            />

            <p style={styles.helper}>
              O e-mail da conta não pode ser alterado por aqui.
            </p>

            <button
              type="submit"
              style={{
                ...styles.button,
                opacity: salvando ? 0.7 : 1,
              }}
              disabled={salvando}
            >
              {salvando
                ? "Salvando..."
                : salvo
                  ? "✓ Alterações salvas"
                  : "Salvar alterações"}
            </button>

          </form>

        </section>

        {/* PLANO */}
        <section style={styles.card}>

          <div style={styles.cardHeader}>

            <div>
              <span style={styles.tag}>
                PLANO
              </span>

              <h2 style={styles.cardTitle}>
                Seu plano
              </h2>

              <p style={styles.cardDescription}>
                Consulte o plano associado à sua conta.
              </p>
            </div>

            <span style={styles.planBadge}>
              {planoFormatado.toUpperCase()}
            </span>

          </div>

          <div style={styles.planBox}>

            <div style={styles.planIcon}>
              ✦
            </div>

            <div style={styles.planContent}>

              <h3 style={styles.planTitle}>
                IA LUCRATIVA {planoFormatado}
              </h3>

              <p style={styles.planText}>
                Acesso aos recursos disponíveis atualmente
                na plataforma.
              </p>

            </div>

            <span style={styles.planStatus}>
              Ativo
            </span>

          </div>

          <div style={styles.planFeatures}>

            <div style={styles.feature}>
              <span style={styles.featureCheck}>✓</span>
              Ferramentas de IA
            </div>

            <div style={styles.feature}>
              <span style={styles.featureCheck}>✓</span>
              Biblioteca de prompts
            </div>

            <div style={styles.feature}>
              <span style={styles.featureCheck}>✓</span>
              Estratégias digitais
            </div>

            <div style={styles.feature}>
              <span style={styles.featureCheck}>✓</span>
              Área exclusiva do usuário
            </div>

          </div>

          <div style={styles.futureBox}>

            <div style={styles.futureTitle}>
              🚀 Novidades em desenvolvimento
            </div>

            <p style={styles.futureText}>
              A IA LUCRATIVA continuará recebendo novos
              recursos, automações, ferramentas inteligentes
              e futuros planos premium.
            </p>

          </div>

        </section>

        {/* CONFIGURAÇÕES */}
        <section style={styles.card}>

          <span style={styles.tag}>
            CONFIGURAÇÕES
          </span>

          <h2 style={styles.cardTitle}>
            Preferências
          </h2>

          <p style={styles.cardDescription}>
            Recursos adicionais serão liberados conforme
            a evolução da plataforma.
          </p>

          <div style={styles.setting}>

            <div style={styles.settingContent}>
              <strong>
                Notificações
              </strong>

              <p style={styles.settingText}>
                Controle das notificações da plataforma.
              </p>
            </div>

            <span style={styles.comingSoon}>
              Em breve
            </span>

          </div>

          <div style={styles.setting}>

            <div style={styles.settingContent}>
              <strong>
                Segurança
              </strong>

              <p style={styles.settingText}>
                Recursos avançados de segurança e autenticação.
              </p>
            </div>

            <span style={styles.comingSoon}>
              Em breve
            </span>

          </div>

        </section>

        {/* AÇÕES */}
        <section style={styles.actions}>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            style={styles.dashboardButton}
          >
            ← Ir para o Dashboard
          </button>

          <button
            type="button"
            onClick={sair}
            style={styles.logoutButton}
          >
            🚪 Sair da plataforma
          </button>

        </section>

        {/* RODAPÉ DA CONTA */}
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
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100%",
    padding: "10px 0 50px",
    boxSizing: "border-box",
    color: "#ffffff",
  },

  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
  },

  headerInfo: {
    minWidth: 0,
  },

  avatar: {
    width: "68px",
    height: "68px",
    minWidth: "68px",
    borderRadius: "18px",
    background: "#00ffaa",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    fontWeight: "900",
    boxShadow: "0 0 30px rgba(0,255,170,0.12)",
  },

  eyebrow: {
    color: "#00ffaa",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "2px",
  },

  title: {
    margin: "5px 0 7px",
    fontSize: "32px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    margin: 0,
    color: "#777",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  card: {
    background: "#101010",
    border: "1px solid #222",
    borderRadius: "18px",
    padding: "26px",
    marginBottom: "18px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "24px",
  },

  tag: {
    display: "block",
    color: "#00ffaa",
    fontSize: "9px",
    fontWeight: "900",
    letterSpacing: "2px",
    marginBottom: "8px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
  },

  cardDescription: {
    margin: "7px 0 0",
    color: "#666",
    fontSize: "12px",
    lineHeight: "1.5",
  },

  status: {
    color: "#00ffaa",
    fontSize: "11px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  planBadge: {
    background: "rgba(0,255,170,0.08)",
    border: "1px solid rgba(0,255,170,0.25)",
    color: "#00ffaa",
    borderRadius: "8px",
    padding: "7px 10px",
    fontSize: "9px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  label: {
    display: "block",
    marginTop: "18px",
    marginBottom: "8px",
    color: "#ccc",
    fontSize: "12px",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "#080808",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
  },

  inputDisabled: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #222",
    background: "#070707",
    color: "#666",
    fontSize: "14px",
    outline: "none",
  },

  helper: {
    margin: "7px 0 0",
    color: "#555",
    fontSize: "11px",
  },

  button: {
    width: "100%",
    marginTop: "24px",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#00ffaa",
    color: "#000000",
    fontWeight: "900",
    fontSize: "13px",
    cursor: "pointer",
  },

  planBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "18px",
    background: "#080808",
    border: "1px solid #222",
    borderRadius: "14px",
  },

  planIcon: {
    width: "42px",
    height: "42px",
    minWidth: "42px",
    borderRadius: "12px",
    background: "rgba(0,255,170,0.08)",
    color: "#00ffaa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "900",
  },

  planContent: {
    flex: 1,
    minWidth: 0,
  },

  planTitle: {
    margin: "0 0 5px",
    fontSize: "15px",
    fontWeight: "800",
  },

  planText: {
    margin: 0,
    color: "#666",
    fontSize: "11px",
    lineHeight: "1.5",
  },

  planStatus: {
    color: "#00ffaa",
    fontSize: "11px",
    fontWeight: "800",
    whiteSpace: "nowrap",
  },

  planFeatures: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginTop: "18px",
  },

  feature: {
    padding: "11px 12px",
    borderRadius: "9px",
    background: "#0b0b0b",
    border: "1px solid #1d1d1d",
    color: "#aaa",
    fontSize: "11px",
  },

  featureCheck: {
    color: "#00ffaa",
    marginRight: "7px",
    fontWeight: "900",
  },

  futureBox: {
    marginTop: "20px",
    padding: "16px",
    borderRadius: "12px",
    background: "rgba(0,255,170,0.035)",
    border: "1px solid rgba(0,255,170,0.12)",
  },

  futureTitle: {
    color: "#00ffaa",
    fontSize: "12px",
    fontWeight: "800",
  },

  futureText: {
    margin: "7px 0 0",
    color: "#666",
    fontSize: "11px",
    lineHeight: "1.6",
  },

  setting: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    padding: "17px 0",
    borderBottom: "1px solid #202020",
  },

  settingContent: {
    minWidth: 0,
  },

  settingText: {
    margin: "6px 0 0",
    color: "#666",
    fontSize: "11px",
    lineHeight: "1.5",
  },

  comingSoon: {
    color: "#555",
    fontSize: "10px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "25px",
  },

  dashboardButton: {
    flex: 1,
    minWidth: "200px",
    padding: "14px",
    border: "1px solid #333",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#000000",
    fontWeight: "900",
    fontSize: "12px",
    cursor: "pointer",
  },

  logoutButton: {
    flex: 1,
    minWidth: "200px",
    padding: "14px",
    border: "1px solid #333",
    borderRadius: "10px",
    background: "#101010",
    color: "#ffffff",
    fontWeight: "800",
    fontSize: "12px",
    cursor: "pointer",
  },

  footer: {
    textAlign: "center",
    color: "#444",
    fontSize: "11px",
    lineHeight: "1.8",
    padding: "30px 0 10px",
  },

  footerBrand: {
    color: "#00ffaa",
    fontSize: "13px",
  },

  loadingPage: {
    width: "100%",
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    boxSizing: "border-box",
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
    background: "#00ffaa",
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
    margin: 0,
    color: "#666",
    fontSize: "13px",
  },
};
