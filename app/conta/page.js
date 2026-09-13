"use client";

import { useState } from "react";

export default function Conta() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [salvo, setSalvo] = useState(false);

  function salvarAlteracoes(e) {
    e.preventDefault();

    setSalvo(true);

    setTimeout(() => {
      setSalvo(false);
    }, 2500);
  }

  function sair() {
    window.location.href = "/login";
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        <a href="/dashboard" style={styles.back}>
          ← Voltar para o Dashboard
        </a>

        <header style={styles.header}>
          <div style={styles.avatar}>
            {nome ? nome.charAt(0).toUpperCase() : "U"}
          </div>

          <h1 style={styles.title}>
            Minha Conta
          </h1>

          <p style={styles.subtitle}>
            Gerencie seu perfil e acompanhe sua experiência na IA LUCRATIVA.
          </p>
        </header>

        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <span style={styles.tag}>
                PERFIL
              </span>

              <h2 style={styles.cardTitle}>
                Informações pessoais
              </h2>
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
            />

            <label style={styles.label}>
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={styles.input}
            />

            <button
              type="submit"
              style={styles.button}
            >
              {salvo ? "✓ Alterações salvas" : "Salvar alterações"}
            </button>

          </form>
        </section>

        <section style={styles.card}>

          <div style={styles.cardHeader}>
            <div>
              <span style={styles.tag}>
                PLANO
              </span>

              <h2 style={styles.cardTitle}>
                Seu plano
              </h2>
            </div>

            <span style={styles.free}>
              FREE
            </span>
          </div>

          <div style={styles.planBox}>

            <div>
              <h3 style={styles.planTitle}>
                IA LUCRATIVA Free
              </h3>

              <p style={styles.planText}>
                Acesso aos recursos disponíveis da plataforma.
              </p>
            </div>

            <span style={styles.planStatus}>
              Ativo
            </span>

          </div>

          <div style={styles.planFeatures}>
            <p>✓ Ferramentas disponíveis</p>
            <p>✓ Biblioteca de prompts</p>
            <p>✓ Estratégias digitais</p>
            <p>✓ Área do usuário</p>
          </div>

          <div style={styles.futureBox}>
            <strong>
              🚀 Em breve
            </strong>

            <p style={styles.futureText}>
              Novos recursos, automações, inteligência artificial avançada
              e planos premium serão adicionados futuramente.
            </p>
          </div>

        </section>

        <section style={styles.card}>

          <span style={styles.tag}>
            CONFIGURAÇÕES
          </span>

          <h2 style={styles.cardTitle}>
            Preferências
          </h2>

          <div style={styles.setting}>
            <div>
              <strong>
                Notificações
              </strong>

              <p style={styles.settingText}>
                Configuração de notificações será adicionada futuramente.
              </p>
            </div>

            <span style={styles.comingSoon}>
              Em breve
            </span>
          </div>

          <div style={styles.setting}>
            <div>
              <strong>
                Segurança
              </strong>

              <p style={styles.settingText}>
                Recursos de segurança e autenticação avançada.
              </p>
            </div>

            <span style={styles.comingSoon}>
              Em breve
            </span>
          </div>

        </section>

        <section style={styles.actions}>

          <a
            href="/dashboard"
            style={styles.dashboardButton}
          >
            ← Ir para o Dashboard
          </a>

          <button
            onClick={sair}
            style={styles.logoutButton}
          >
            🚪 Sair da plataforma
          </button>

        </section>

        <footer style={styles.footer}>
          <strong>
            IA LUCRATIVA
          </strong>

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
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "850px",
    margin: "0 auto",
  },

  back: {
    color: "#888",
    textDecoration: "none",
    fontSize: "14px",
  },

  header: {
    textAlign: "center",
    marginTop: "45px",
    marginBottom: "35px",
  },

  avatar: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "#ffffff",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 18px",
    fontSize: "25px",
    fontWeight: "900",
  },

  title: {
    fontSize: "36px",
    margin: "0 0 10px",
  },

  subtitle: {
    color: "#888",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: 0,
  },

  card: {
    background: "#101010",
    border: "1px solid #242424",
    borderRadius: "18px",
    padding: "25px",
    marginBottom: "18px",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "22px",
  },

  tag: {
    display: "block",
    color: "#666",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: "2px",
    marginBottom: "7px",
  },

  cardTitle: {
    fontSize: "21px",
    margin: 0,
  },

  status: {
    color: "#aaa",
    fontSize: "12px",
  },

  free: {
    background: "#1c1c1c",
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "7px 10px",
    fontSize: "10px",
    fontWeight: "bold",
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "8px",
    marginTop: "18px",
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

  button: {
    width: "100%",
    marginTop: "24px",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#000000",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
  },

  planBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    background: "#080808",
    border: "1px solid #222",
    borderRadius: "12px",
    padding: "18px",
  },

  planTitle: {
    margin: "0 0 6px",
    fontSize: "16px",
  },

  planText: {
    margin: 0,
    color: "#777",
    fontSize: "12px",
    lineHeight: "1.5",
  },

  planStatus: {
    color: "#aaa",
    fontSize: "12px",
    fontWeight: "bold",
  },

  planFeatures: {
    color: "#aaa",
    fontSize: "13px",
    lineHeight: "1.5",
    marginTop: "18px",
  },

  futureBox: {
    marginTop: "20px",
    padding: "16px",
    background: "#0b0b0b",
    border: "1px solid #222",
    borderRadius: "12px",
  },

  futureText: {
    color: "#777",
    fontSize: "12px",
    lineHeight: "1.6",
    margin: "8px 0 0",
  },

  setting: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    padding: "17px 0",
    borderBottom: "1px solid #202020",
  },

  settingText: {
    color: "#777",
    fontSize: "12px",
    lineHeight: "1.5",
    margin: "6px 0 0",
  },

  comingSoon: {
    color: "#666",
    fontSize: "11px",
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
    textAlign: "center",
    padding: "14px",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#000000",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "13px",
  },

  logoutButton: {
    flex: 1,
    minWidth: "200px",
    padding: "14px",
    borderRadius: "10px",
    background: "#101010",
    color: "#ffffff",
    border: "1px solid #333",
    fontWeight: "bold",
    fontSize: "13px",
    cursor: "pointer",
  },

  footer: {
    textAlign: "center",
    color: "#555",
    fontSize: "12px",
    lineHeight: "1.8",
    padding: "35px 0 20px",
  },
};
