export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed top-4 right-4 w-96 bg-white/80 backdrop-blur-md rounded-xl z-50" data-tauri-drag-region>
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <h1>layout default</h1>
      </footer>
    </div>
  );
}
