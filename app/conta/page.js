"use client";

import { useState } from "react";

export default function ContaPage() {
  const [nome, setNome] = useState("Usuário IA Lucrativa");
  const [email, setEmail] = useState("usuario@email.com");
  const [salvo, setSalvo] = useState(false);

  function salvarAlteracoes() {
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
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logoArea}>
          <div style={styles.logoBox}>IA</div>

          <div>
            <div style={styles.brand}>IA LUCRATIVA</div>
            <div style={styles.subtitle}>Minha conta</div>
          </div>
        </div>

        <a href="/dashboard" style={styles.backButton}>
          ← Dashboard
        </a>
      </header>

      {/* CONTENT */}
      <section style={styles.container}>
        <div style={styles.titleArea}>
          <span style={styles.eyebrow}>MINHA CONTA</span>

          <h1 style={styles.title}>
            Gerencie seu perfil.
          </h1>

          <p style={styles.description}>
            Configure suas informações e acompanhe sua conta dentro da
            plataforma IA LUCRATIVA.
          </p>
        </div>

        {/* PERFIL */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Perfil</h2>
              <p style={styles.cardDescription}>
                Atualize suas informações pessoais.
              </p>
            </div>

            <div style={styles.avatar}>IA</div>
          </div>

          <div style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Nome</label>

              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={styles.input}
                placeholder="Digite seu nome"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>E-mail</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="Digite seu e-mail"
              />
            </div>

            <button
              onClick={salvarAlteracoes}
              style={styles.primaryButton}
            >
              {salvo ? "✓ Alterações salvas" : "Salvar alterações"}
            </button>
          </div>
        </section>

        {/* PLANO */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Seu plano</h2>

              <p style={styles.cardDescription}>
                Informações sobre seu acesso à plataforma.
              </p>
            </div>

            <div style={styles.planBadge}>GRÁTIS</div>
          </div>

          <div style={styles.planBox}>
            <div>
              <span style={styles.planLabel}>Plano atual</span>

              <strong style={styles.planName}>
                IA LUCRATIVA Free
              </strong>

              <p style={styles.planText}>
                Acesso às funcionalidades disponíveis atualmente.
              </p>
            </div>

            <span style={styles.activeBadge}>
              ● Ativo
            </span>
          </div>

          <div style={styles.futureBox}>
            <span style={styles.futureIcon}>🚀</span>

            <div>
              <strong style={styles.futureTitle}>
                Planos premium em breve
              </strong>

              <p style={styles.futureText}>
                No futuro você poderá desbloquear ferramentas,
                automações, recursos avançados de IA e muito mais.
              </p>
            </div>
          </div>
        </section>

        {/* STATUS */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Status da conta</h2>

          <div style={styles.statusList}>
            <div style={styles.statusItem}>
              <span>Conta</span>

              <strong style={styles.statusActive}>
                Ativa
              </strong>
            </div>

            <div style={styles.statusItem}>
              <span>Acesso à plataforma</span>

              <strong style={styles.statusActive}>
                Liberado
              </strong>
            </div>

            <div style={styles.statusItem}>
              <span>Plano</span>

              <strong>Free</strong>
            </div>
          </div>
        </section>

        {/* CONFIGURAÇÕES */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Configurações</h2>

          <p style={styles.cardDescription}>
            Algumas configurações avançadas serão disponibilizadas
            conforme a plataforma evoluir.
          </p>

          <div style={styles.settingsList}>
            <div style={styles.setting}>
              <div>
                <strong style={styles.settingTitle}>
                  Notificações
                </strong>

                <p style={styles.settingText}>
                  Receber novidades e atualizações da IA LUCRATIVA.
                </p>
              </div>

              <span style={styles.comingSoon}>
                Em breve
              </span>
            </div>

            <div style={styles.setting}>
              <div>
                <strong style={styles.settingTitle}>
                  Assinatura
                </strong>

                <p style={styles.settingText}>
                  Gerencie seu plano e pagamentos.
                </p>
              </div>

              <span style={styles.comingSoon}>
                Em breve
              </span>
            </div>

            <div style={styles.setting}>
              <div>
                <strong style={styles.settingTitle}>
                  Segurança
                </strong>

                <p style={styles.settingText}>
                  Alteração de senha e opções de segurança.
                </p>
              </div>

              <span style={styles.comingSoon}>
                Em breve
              </span>
            </div>
          </div>
        </section>

        {/* SAIR */}
        <section style={styles.logoutCard}>
          <div>
            <h2 style={styles.logoutTitle}>
              Sair da conta
            </h2>

            <p style={styles.logoutText}>
              Você poderá entrar novamente através da página de login.
            </p>
          </div>

          <button
            onClick={sair}
            style={styles.logoutButton}
          >
            Sair
          </button>
        </section>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <strong>IA LUCRATIVA</strong>

        <span>
          Crie. Automatize. Lucre.
        </span>

        <span>
          @ia.lucrativa1
        </span>
      </footer>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050505",
    color: "#ffffff",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },

  header: {
    minHeight: "76px",
    padding: "0 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #1b1b1b",
    background: "#070707",
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logoBox: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#050505",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: "14px",
  },

  brand: {
    fontSize: "15px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  subtitle: {
    marginTop: "3px",
    fontSize: "11px",
    color: "#777777",
  },

  backButton: {
    textDecoration: "none",
    color: "#ffffff",
    border: "1px solid #292929",
    padding: "10px 15px",
    borderRadius: "9px",
    fontSize: "13px",
    fontWeight: "700",
  },

  container: {
    width: "min(100% - 32px, 950px)",
    margin: "0 auto",
    padding: "60px 0",
  },

  titleArea: {
    marginBottom: "35px",
  },

  eyebrow: {
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
    color: "#8b8b8b",
  },

  title: {
    margin: "10px 0",
    fontSize: "clamp(32px, 6vw, 54px)",
    lineHeight: "1.05",
    letterSpacing: "-2px",
  },

  description: {
    maxWidth: "650px",
    color: "#9a9a9a",
    lineHeight: "1.7",
    fontSize: "15px",
  },

  card: {
    background: "#0b0b0b",
    border: "1px solid #202020",
    borderRadius: "18px",
    padding: "25px",
    marginBottom: "20px",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
  },

  cardTitle: {
    margin: "0 0 7px",
    fontSize: "21px",
  },

  cardDescription: {
    margin: 0,
    color: "#777777",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#ffffff",
    color: "#050505",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: "13px",
    flexShrink: 0,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "12px",
    color: "#aaaaaa",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#050505",
    border: "1px solid #292929",
    color: "#ffffff",
    padding: "14px",
    borderRadius: "10px",
    outline: "none",
    fontSize: "14px",
  },

  primaryButton: {
    marginTop: "5px",
    border: "none",
    background: "#ffffff",
    color: "#050505",
    padding: "14px 18px",
    borderRadius: "10px",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "13px",
  },

  planBadge: {
    background: "#181818",
    border: "1px solid #303030",
    padding: "7px 10px",
    borderRadius: "20px",
    fontSize: "10px",
    fontWeight: "800",
    color: "#aaaaaa",
  },

  planBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    borderRadius: "13px",
    background: "#101010",
    border: "1px solid #252525",
  },

  planLabel: {
    display: "block",
    color: "#777777",
    fontSize: "11px",
    marginBottom: "6px",
  },

  planName: {
    display: "block",
    fontSize: "18px",
  },

  planText: {
    margin: "7px 0 0",
    color: "#777777",
    fontSize: "12px",
  },

  activeBadge: {
    whiteSpace: "nowrap",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "700",
  },

  futureBox: {
    display: "flex",
    gap: "15px",
    marginTop: "15px",
    padding: "18px",
    borderRadius: "13px",
    border: "1px dashed #292929",
    background: "#080808",
  },

  futureIcon: {
    fontSize: "20px",
  },

  futureTitle: {
    display: "block",
    fontSize: "14px",
    marginBottom: "5px",
  },

  futureText: {
    margin: 0,
    color: "#777777",
    fontSize: "12px",
    lineHeight: "1.6",
  },

  statusList: {
    marginTop: "20px",
    borderTop: "1px solid #202020",
  },

  statusItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #202020",
    fontSize: "13px",
    color: "#999999",
  },

  statusActive: {
    color: "#ffffff",
  },

  settingsList: {
    marginTop: "20px",
  },

  setting: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "17px 0",
    borderTop: "1px solid #202020",
  },

  settingTitle: {
    display: "block",
    fontSize: "14px",
    marginBottom: "5px",
  },

  settingText: {
    margin: 0,
    color: "#777777",
    fontSize: "12px",
    lineHeight: "1.5",
  },

  comingSoon: {
    whiteSpace: "nowrap",
    fontSize: "10px",
    color: "#777777",
    border: "1px solid #292929",
    padding: "6px 9px",
    borderRadius: "20px",
  },

  logoutCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "22px 25px",
    border: "1px solid #202020",
    borderRadius: "18px",
    background: "#090909",
  },

  logoutTitle: {
    margin: "0 0 5px",
    fontSize: "16px",
  },

  logoutText: {
    margin: 0,
    color: "#777777",
    fontSize: "12px",
  },

  logoutButton: {
    background: "transparent",
    color: "#ffffff",
    border: "1px solid #383838",
    padding: "10px 18px",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: "700",
  },

  footer: {
    padding: "30px 6%",
    borderTop: "1px solid #1b1b1b",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
    color: "#666666",
    fontSize: "11px",
  },
};
