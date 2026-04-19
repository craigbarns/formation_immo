export default function RootLoading() {
  return (
    <div className="formation-canvas flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-brand-navy" />
        <p className="text-sm font-medium text-zinc-500">Chargement...</p>
      </div>
    </div>
  );
}
