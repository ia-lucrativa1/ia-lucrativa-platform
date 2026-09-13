"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PerfilPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [plano, setPlano] = useState("Gratuito");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function carregarPerfil() {
    try {
      setCarregando(true);
      setErro("");

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

      const { data, error } = await supabase
        .from("profiles")
        .select("nome, email, plano")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Erro ao carregar perfil:", error);
      }

      if (data) {
        setNome(data.nome || "");
        setEmail(data.email || user.email || "");
        setPlano(data.plano || "Gratuito");
      } else {
        setNome(user.user_metadata?.nome || "");
      }
    } catch (error) {
      console.error("Erro no perfil:", error);
      setErro("Não foi possível carregar seu perfil.");
    } finally {
      setCarregando(false);
    }
  }

  async function salvarPerfil(event) {
    event.preventDefault();

    if (!usuario) {
      return;
    }

    try {
      setSalvando(true);
      setMensagem("");
      setErro("");

      const { error } = await supabase
        .from("profiles")
        .upsert(
          {
            id: usuario.id,
            nome: nome.trim(),
            email: usuario.email,
            plano: plano,
          },
          {
            onConflict: "id",
          }
        );

      if (error) {
        console.error("Erro ao salvar perfil:", error);
        setErro("Não foi possível salvar as alterações.");
        return;
      }

      setMensagem("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      setErro("Ocorreu um erro ao salvar seu perfil.");
    } finally {
      setSalvando(false);
    }
  }

  async function sair() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (carregando) {
    return (
      <section style={styles.loading}>
        <div style={styles.loadingIcon}>👤</div>

        <h2>Carregando seu perfil...</h2>

        <p>
          Estamos preparando suas informações.
        </p>
      </section>
    );
  }

  return (
    <section style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.badge}>
            MINHA CONTA
          </div>

          <h1 style={styles.title}>
            Meu <span style={styles.green}>Perfil</span>
          </h1>

          <p style={styles.subtitle}>
            Gerencie suas informações e acompanhe sua conta
            dentro da plataforma IA LUCRATIVA.
          </p>
        </div>

        <Link
          href="/dashboard"
          style={styles.secondaryButton}
        >
          ← Dashboard
        </Link>
      </div>

      {mensagem && (
        <div style={styles.success}>
          ✅ {mensagem}
        </div>
      )}

      {erro && (
        <div style={styles.error}>
          ⚠️ {erro}
        </div>
      )}

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.avatar}>
              👤
            </div>

            <div>
              <h2 style={styles.cardTitle}>
                Informações pessoais
              </h2>

              <p style={styles.cardSubtitle}>
                Atualize seus dados da plataforma.
              </p>
            </div>
          </div>

          <form onSubmit={salvarPerfil}>
            <div style={styles.field}>
              <label style={styles.label}>
                Nome
              </label>

              <input
                type="text"
                value={nome}
                onChange={(event) =>
                  setNome(event.target.value)
                }
                placeholder="Digite seu nome"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                E-mail
              </label>

              <input
                type="email"
                value={email}
                disabled
                style={{
                  ...styles.input,
                  ...styles.inputDisabled,
                }}
              />

              <span style={styles.helper}>
                O e-mail da conta não pode ser alterado aqui.
              </span>
            </div>

            <button
              type="submit"
              disabled={salvando}
              style={{
                ...styles.primaryButton,
                opacity: salvando ? 0.6 : 1,
              }}
            >
              {salvando
                ? "Salvando..."
                : "Salvar alterações"}
            </button>
          </form>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.planIcon}>
              🚀
            </div>

            <div>
              <h2 style={styles.cardTitle}>
                Meu plano
              </h2>

              <p style={styles.cardSubtitle}>
                Seu acesso atual à plataforma.
              </p>
            </div>
          </div>

          <div style={styles.planBox}>
            <span style={styles.planLabel}>
              PLANO ATUAL
            </span>

            <strong style={styles.planName}>
              {plano}
            </strong>

            <p style={styles.planDescription}>
              Seu plano poderá receber novos recursos,
              ferramentas e benefícios conforme a evolução
              da IA LUCRATIVA.
            </p>
          </div>

          <div style={styles.futureBox}>
            <span>🔒</span>

            <div>
              <strong>
                Assinaturas em breve
              </strong>

              <p>
                Planos avançados poderão ser adicionados
                futuramente.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.accountCard}>
        <div>
          <h2 style={styles.accountTitle}>
            Segurança da conta
          </h2>

          <p style={styles.accountText}>
            Para proteger sua conta, encerre sua sessão
            quando estiver utilizando um dispositivo
            compartilhado.
          </p>
        </div>

        <button
          type="button"
          onClick={sair}
          style={styles.logoutButton}
        >
          Sair da conta
        </button>
      </div>
    </section>
  );
}

const styles = {
  page: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  loading: {
    minHeight: "55vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  loadingIcon: {
    width: "70px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    borderRadius: "20px",
    background: "rgba(0, 255, 170, 0.08)",
    border: "1px solid rgba(0, 255, 170, 0.15)",
    fontSize: "30px",
  },

  header: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "25px",
    marginBottom: "30px",
  },

  badge: {
    display: "inline-flex",
    padding: "7px 11px",
    marginBottom: "13px",
    borderRadius: "8px",
    background: "rgba(0, 255, 170, 0.07)",
    border: "1px solid rgba(0, 255, 170, 0.13)",
    color: "#00ffaa",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1.4px",
  },

  title: {
    color: "#ffffff",
    fontSize: "32px",
    fontWeight: "900",
    lineHeight: "1.2",
  },

  green: {
    color: "#00ffaa",
  },

  subtitle: {
    maxWidth: "700px",
    marginTop: "10px",
    color: "#7d858f",
    fontSize: "14px",
    lineHeight: "1.7",
  },

  secondaryButton: {
    minHeight: "44px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 17px",
    borderRadius: "10px",
    background: "#0b0f14",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "800",
    whiteSpace: "nowrap",
  },

  success: {
    marginBottom: "20px",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(0, 255, 170, 0.07)",
    border: "1px solid rgba(0, 255, 170, 0.15)",
    color: "#00ffaa",
    fontSize: "13px",
  },

  error: {
    marginBottom: "20px",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(255, 80, 80, 0.08)",
    border: "1px solid rgba(255, 80, 80, 0.18)",
    color: "#ff9b9b",
    fontSize: "13px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "18px",
  },

  card: {
    padding: "24px",
    borderRadius: "18px",
    background: "#090d12",
    border: "1px solid rgba(255, 255, 255, 0.07)",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "24px",
  },

  avatar: {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "13px",
    background: "rgba(0, 255, 170, 0.08)",
    fontSize: "21px",
  },

  planIcon: {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "13px",
    background: "rgba(0, 255, 170, 0.08)",
    fontSize: "21px",
  },

  cardTitle: {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "900",
  },

  cardSubtitle: {
    marginTop: "4px",
    color: "#68727d",
    fontSize: "11px",
  },

  field: {
    marginBottom: "18px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#b8c0c8",
    fontSize: "11px",
    fontWeight: "800",
  },

  input: {
    width: "100%",
    minHeight: "46px",
    padding: "0 13px",
    borderRadius: "10px",
    background: "#0d1218",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    color: "#ffffff",
    outline: "none",
    fontSize: "13px",
    boxSizing: "border-box",
  },

  inputDisabled: {
    color: "#68727d",
    cursor: "not-allowed",
  },

  helper: {
    display: "block",
    marginTop: "7px",
    color: "#59636d",
    fontSize: "10px",
  },

  primaryButton: {
    width: "100%",
    minHeight: "46px",
    marginTop: "5px",
    border: "none",
    borderRadius: "10px",
    background: "#00ffaa",
    color: "#06110d",
    fontSize: "12px",
    fontWeight: "900",
    cursor: "pointer",
  },

  planBox: {
    padding: "20px",
    borderRadius: "14px",
    background: "rgba(0, 255, 170, 0.045)",
    border: "1px solid rgba(0, 255, 170, 0.12)",
  },

  planLabel: {
    display: "block",
    color: "#68727d",
    fontSize: "9px",
    fontWeight: "900",
    letterSpacing: "1.2px",
  },

  planName: {
    display: "block",
    marginTop: "8px",
    color: "#00ffaa",
    fontSize: "25px",
    fontWeight: "900",
  },

  planDescription: {
    marginTop: "10px",
    color: "#7d858f",
    fontSize: "11px",
    lineHeight: "1.6",
  },

  futureBox: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    marginTop: "16px",
    padding: "14px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.025)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    color: "#ffffff",
    fontSize: "12px",
  },

  accountCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    marginTop: "18px",
    padding: "20px 24px",
    borderRadius: "16px",
    background: "#090d12",
    border: "1px solid rgba(255, 255, 255, 0.07)",
  },

  accountTitle: {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "900",
  },

  accountText: {
    maxWidth: "650px",
    marginTop: "6px",
    color: "#68727d",
    fontSize: "11px",
    lineHeight: "1.6",
  },

  logoutButton: {
    minHeight: "40px",
    padding: "0 15px",
    borderRadius: "9px",
    background: "rgba(255, 80, 80, 0.07)",
    border: "1px solid rgba(255, 80, 80, 0.15)",
    color: "#ff9b9b",
    fontSize: "11px",
    fontWeight: "800",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};
