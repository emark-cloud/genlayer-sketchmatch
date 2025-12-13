import "./../styles/globals.css";

export const metadata = {
  title: "SketchMatch",
  description: "AI-judged drawing game powered by GenLayer"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
