
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NotificacoesPage() {
  const router = useRouter();

  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    verificarUsuario();
  }, []);

  async function verificarUsuario() {
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

      await carregarNotificacoes(session.user.id);
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      setErro("Não foi possível carregar suas notificações.");
    } finally {
      setCarregando(false);
    }
  }

  async function carregarNotificacoes(userId) {
    const { data, error } = await supabase
      .from("notifications")
      .select("id, title, message, type, read, created_at")
      .or(`user_id.eq.${userId},user_id.is.null`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao carregar notificações:", error);
      setErro("Não foi possível carregar suas notificações.");
      return;
    }

    setNotificacoes(data || []);
  }

  async function marcarComoLida(id) {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);

    if (error) {
      console.error("Erro ao marcar notificação:", error);
      return;
    }

    setNotificacoes((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  }

  async function marcarTodasComoLidas() {
    const pendentes = notificacoes.filter(
      (item) => !item.read && item.user_id !== null
    );

    for (const item of pendentes) {
      await marcarComoLida(item.id);
    }
  }

  function formatarData(data) {
    if (!data) {
      return "";
    }

    return new Date(data).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  function iconeTipo(type) {
    if (type === "success") return "✅";
    if (type === "warning") return "⚠️";
    if (type === "update") return "🚀";
    return "🔔";
  }

  const naoLidas = notificacoes.filter(
    (item) => !item.read
  ).length;

  if (carregando) {
    return (
      <section style={styles.loading}>
        <div style={styles.loadingIcon}>🔔</div>

        <h2>Carregando notificações...</h2>

        <p>
          Estamos verificando suas novidades.
        </p>
      </section>
    );
  }

  return (
    <section style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.badge}>
            CENTRAL DE NOTIFICAÇÕES
          </div>

          <h1 style={styles.title}>
            Suas <span style={styles.green}>Notificações</span>
          </h1>

          <p style={styles.subtitle}>
            Acompanhe novidades, atualizações e avisos
            importantes da IA LUCRATIVA.
          </p>
        </div>

        <Link
          href="/"
          style={styles.secondaryButton}
        >
          ← Voltar ao início
        </Link>
      </div>

      {erro && (
        <div style={styles.error}>
          ⚠️ {erro}
        </div>
      )}

      <div style={styles.topBar}>
        <div>
          <strong style={styles.count}>
            {naoLidas}
          </strong>

          <span style={styles.countText}>
            {naoLidas === 1
              ? " notificação não lida"
              : " notificações não lidas"}
          </span>
        </div>

        {naoLidas > 0 && (
          <button
            type="button"
            onClick={marcarTodasComoLidas}
            style={styles.readAllButton}
          >
            ✓ Marcar todas como lidas
          </button>
        )}
      </div>

      {notificacoes.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🔕</div>

          <h2>Nenhuma notificação</h2>

          <p>
            Quando houver novidades ou avisos importantes,
            eles aparecerão aqui.
          </p>
        </div>
      ) : (
        <div style={styles.list}>
          {notificacoes.map((item) => (
            <article
              key={item.id}
              style={{
                ...styles.card,
                ...(item.read
                  ? styles.cardRead
                  : styles.cardUnread),
              }}
            >
              <div style={styles.iconBox}>
                {iconeTipo(item.type)}
              </div>

              <div style={styles.content}>
                <div style={styles.cardHeader}>
                  <div>
                    <h2 style={styles.notificationTitle}>
                      {item.title}
                    </h2>

                    <div style={styles.date}>
                      📅 {formatarData(item.created_at)}
                    </div>
                  </div>

                  {!item.read && (
                    <span style={styles.newBadge}>
                      NOVA
                    </span>
                  )}
                </div>

                <p style={styles.message}>
                  {item.message}
                </p>

                {!item.read && item.user_id !== null && (
                  <button
                    type="button"
                    onClick={() => marcarComoLida(item.id)}
                    style={styles.readButton}
                  >
                    ✓ Marcar como lida
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
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

  error: {
    marginBottom: "20px",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(255, 80, 80, 0.08)",
    border: "1px solid rgba(255, 80, 80, 0.18)",
    color: "#ff9b9b",
    fontSize: "13px",
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    padding: "16px 18px",
    marginBottom: "18px",
    borderRadius: "14px",
    background: "#090d12",
    border: "1px solid rgba(255, 255, 255, 0.07)",
  },

  count: {
    color: "#00ffaa",
    fontSize: "18px",
    fontWeight: "900",
  },

  countText: {
    color: "#8b939d",
    fontSize: "12px",
  },

  readAllButton: {
    minHeight: "36px",
    padding: "0 12px",
    borderRadius: "9px",
    background: "rgba(0, 255, 170, 0.06)",
    border: "1px solid rgba(0, 255, 170, 0.12)",
    color: "#00ffaa",
    fontSize: "11px",
    fontWeight: "800",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  card: {
    display: "flex",
    gap: "16px",
    padding: "20px",
    borderRadius: "16px",
    transition: "0.2s ease",
  },

  cardUnread: {
    background: "rgba(0, 255, 170, 0.045)",
    border: "1px solid rgba(0, 255, 170, 0.12)",
  },

  cardRead: {
    background: "#090d12",
    border: "1px solid rgba(255, 255, 255, 0.06)",
  },

  iconBox: {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderRadius: "13px",
    background: "rgba(0, 255, 170, 0.07)",
    fontSize: "21px",
  },

  content: {
    flex: 1,
    minWidth: 0,
  },

  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "15px",
  },

  notificationTitle: {
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "900",
  },

  date: {
    marginTop: "6px",
    color: "#626b75",
    fontSize: "10px",
  },

  newBadge: {
    padding: "5px 8px",
    borderRadius: "6px",
    background: "rgba(0, 255, 170, 0.09)",
    color: "#00ffaa",
    fontSize: "8px",
    fontWeight: "900",
    letterSpacing: "1px",
    flexShrink: 0,
  },

  message: {
    marginTop: "12px",
    color: "#aab2bb",
    fontSize: "13px",
    lineHeight: "1.65",
    whiteSpace: "pre-wrap",
  },

  readButton: {
    marginTop: "14px",
    padding: "7px 10px",
    borderRadius: "8px",
    background: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.07)",
    color: "#7f8993",
    fontSize: "10px",
    fontWeight: "800",
  },

  empty: {
    minHeight: "360px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 25px",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.07)",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.025)",
  },

  emptyIcon: {
    width: "70px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.04)",
    fontSize: "30px",
  },
};
