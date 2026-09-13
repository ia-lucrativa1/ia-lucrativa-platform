
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function HistoricoPage() {
  const router = useRouter();

  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [excluindo, setExcluindo] = useState(null);
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

      await carregarHistorico();
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      setErro("Não foi possível carregar seu histórico.");
    } finally {
      setCarregando(false);
    }
  }

  async function carregarHistorico() {
    const { data, error } = await supabase
      .from("ai_results")
      .select("id, tool_name, prompt, result, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao carregar histórico:", error);
      setErro("Não foi possível carregar seus resultados.");
      return;
    }

    setResultados(data || []);
  }

  async function excluirResultado(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este resultado?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setExcluindo(id);
      setErro("");

      const { error } = await supabase
        .from("ai_results")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Erro ao excluir resultado:", error);
        setErro("Não foi possível excluir este resultado.");
        return;
      }

      setResultados((listaAtual) =>
        listaAtual.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir resultado:", error);
      setErro("Ocorreu um erro ao excluir o resultado.");
    } finally {
      setExcluindo(null);
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

  if (carregando) {
    return (
      <section style={styles.loading}>
        <div style={styles.loadingIcon}>🧠</div>

        <h2>Carregando seu histórico...</h2>

        <p>
          Estamos buscando seus resultados da IA LUCRATIVA.
        </p>
      </section>
    );
  }

  return (
    <section style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.badge}>HISTÓRICO DA IA</div>

          <h1 style={styles.title}>
            Meus <span style={styles.green}>Resultados</span>
          </h1>

          <p style={styles.subtitle}>
            Consulte os resultados que você já gerou utilizando
            as ferramentas da IA LUCRATIVA.
          </p>
        </div>

        <Link href="/ferramentas" style={styles.primaryButton}>
          🤖 Usar uma ferramenta
        </Link>
      </div>

      {erro && (
        <div style={styles.error}>
          ⚠️ {erro}
        </div>
      )}

      {resultados.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>📂</div>

          <h2>Nenhum resultado ainda</h2>

          <p>
            Quando você utilizar uma ferramenta da IA LUCRATIVA,
            seus resultados poderão aparecer aqui.
          </p>

          <Link href="/ferramentas" style={styles.primaryButton}>
            Começar agora
          </Link>
        </div>
      ) : (
        <div style={styles.list}>
          <div style={styles.summary}>
            <strong>
              {resultados.length}{" "}
              {resultados.length === 1
                ? "resultado encontrado"
                : "resultados encontrados"}
            </strong>

            <span>
              Seus resultados mais recentes aparecem primeiro.
            </span>
          </div>

          {resultados.map((item) => (
            <article key={item.id} style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <div style={styles.toolName}>
                    🤖 {item.tool_name}
                  </div>

                  <div style={styles.date}>
                    📅 {formatarData(item.created_at)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => excluirResultado(item.id)}
                  disabled={excluindo === item.id}
                  style={styles.deleteButton}
                >
                  {excluindo === item.id
                    ? "Excluindo..."
                    : "🗑️ Excluir"}
                </button>
              </div>

              <div style={styles.section}>
                <div style={styles.label}>SEU COMANDO</div>

                <div style={styles.prompt}>
                  {item.prompt}
                </div>
              </div>

              <div style={styles.section}>
                <div style={styles.label}>RESULTADO DA IA</div>

                <div style={styles.result}>
                  {item.result}
                </div>
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
    maxWidth: "1200px",
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

  primaryButton: {
    minHeight: "44px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 17px",
    borderRadius: "10px",
    background: "#00ffaa",
    color: "#03110c",
    fontSize: "12px",
    fontWeight: "900",
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

  empty: {
    minHeight: "380px",
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
    background: "rgba(0, 255, 170, 0.07)",
    fontSize: "30px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  summary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    padding: "16px 18px",
    border: "1px solid rgba(255, 255, 255, 0.07)",
    borderRadius: "14px",
    background: "#090d12",
    color: "#ffffff",
    fontSize: "13px",
  },

  card: {
    padding: "22px",
    border: "1px solid rgba(255, 255, 255, 0.07)",
    borderRadius: "18px",
    background: "#090d12",
  },

  cardTop: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "20px",
    paddingBottom: "18px",
    marginBottom: "18px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
  },

  toolName: {
    color: "#00ffaa",
    fontSize: "15px",
    fontWeight: "900",
  },

  date: {
    marginTop: "7px",
    color: "#666f79",
    fontSize: "11px",
  },

  deleteButton: {
    minHeight: "36px",
    padding: "0 12px",
    borderRadius: "9px",
    background: "rgba(255, 80, 80, 0.06)",
    border: "1px solid rgba(255, 80, 80, 0.12)",
    color: "#ff9292",
    fontSize: "11px",
    fontWeight: "800",
  },

  section: {
    marginTop: "18px",
  },

  label: {
    marginBottom: "8px",
    color: "#5f6872",
    fontSize: "9px",
    fontWeight: "900",
    letterSpacing: "1.3px",
  },

  prompt: {
    padding: "14px",
    borderRadius: "11px",
    background: "#0d1218",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    color: "#b8c0c9",
    fontSize: "13px",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },

  result: {
    padding: "17px",
    borderRadius: "11px",
    background: "rgba(0, 255, 170, 0.025)",
    border: "1px solid rgba(0, 255, 170, 0.08)",
    color: "#e3e8ec",
    fontSize: "13px",
    lineHeight: "1.75",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
};
