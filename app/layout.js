import "./globals.css";

export const metadata = {
  title: "IA LUCRATIVA | Inteligência Artificial para o Digital",
  description:
    "IA LUCRATIVA é uma plataforma de inteligência artificial para criar oportunidades, conteúdos, estratégias, ofertas e negócios no digital.",
  keywords: [
    "IA LUCRATIVA",
    "inteligência artificial",
    "IA para negócios",
    "renda extra",
    "negócios digitais",
    "marketing digital",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
