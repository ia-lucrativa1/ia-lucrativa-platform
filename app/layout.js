import "./globals.css";

export const metadata = {
  title: "IA Lucrativa",
  description:
    "Transforme ideias em renda com Inteligência Artificial.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app-layout">

          {/* MENU LATERAL */}
          <aside className="sidebar">

            {/* LOGO */}
            <div className="logo-area">
              <div className="logo-ia">
                <span>IA</span>
                <span className="arrow">↗</span>
              </div>

              <h2>IA LUCRATIVA</h2>

              <p>
                TRANSFORME IDEIAS
                <br />
                <span>EM RENDA</span>
              </p>
            </div>

            {/* MENU PRINCIPAL */}
            <nav className="menu">

              <a href="/" className="menu-item">
                <span>⌂</span>
                Início
              </a>

              <a href="/estrategias" className="menu-item">
                <span>🧠</span>
                Treinamentos
              </a>

              <a href="/estrategias" className="menu-item">
                <span>📈</span>
                Estratégias
              </a>

              <a href="/ferramentas" className="menu-item">
                <span>🤖</span>
                Ferramentas de IA
              </a>

              <a href="/conta" className="menu-item">
                <span>💼</span>
                Meus Resultados
              </a>

              <a href="/dashboard" className="menu-item">
                <span>👥</span>
                Comunidade
              </a>

              <a href="/conta" className="menu-item">
                <span>🎧</span>
                Suporte
              </a>

              <a href="/conta" className="menu-item">
                <span>⚙️</span>
                Configurações
              </a>

            </nav>

            {/* CARD INSTAGRAM */}
            <div className="instagram-card-sidebar">

              <div className="small-logo">
                IA<span>↗</span>
              </div>

              <h3>IA LUCRATIVA</h3>

              <p>
                Mais que um curso,
                uma nova forma de
                mudar sua vida!
              </p>

              <a
                href="https://www.instagram.com/ia.lucrativa1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                📸 @ia.lucrativa1
              </a>

            </div>

          </aside>

          {/* ÁREA PRINCIPAL */}
          <main className="main-content">

            {/* CABEÇALHO */}
            <header className="top-header">

              <div className="header-welcome">
                <h1>
                  Olá,{" "}
                  <span>
                    Seja bem-vindo(a)! 👋
                  </span>
                </h1>

                <p>
                  Aqui você encontra tudo o que precisa para transformar
                  ideias em renda com o poder da Inteligência Artificial.
                </p>
              </div>

              <div className="header-actions">

                <a
                  href="https://www.instagram.com/ia.lucrativa1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram-button"
                >
                  📸 @ia.lucrativa1
                </a>

                <button
                  type="button"
                  className="notification"
                  aria-label="Notificações"
                >
                  🔔
                </button>

                <a
                  href="/conta"
                  className="profile"
                  aria-label="Minha conta"
                >
                  👤
                </a>

              </div>

            </header>

            {/* CONTEÚDO DAS PÁGINAS */}
            {children}

          </main>

        </div>
      </body>
    </html>
  );
}
