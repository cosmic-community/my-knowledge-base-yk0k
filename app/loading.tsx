export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center gap-3">
          <div className="w-3 h-3 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-brand-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-surface-500 mt-4 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}