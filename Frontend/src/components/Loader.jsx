export default function Loader() {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-slate-700 bg-slate-800 p-5 shadow-lg"
          >
            {/* Title */}
            <div className="mb-4 h-6 w-3/4 rounded bg-slate-600"></div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-slate-600"></div>
              <div className="h-4 w-5/6 rounded bg-slate-600"></div>
              <div className="h-4 w-2/3 rounded bg-slate-600"></div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between">
              <div className="h-8 w-20 rounded-lg bg-slate-600"></div>
              <div className="h-8 w-8 rounded-full bg-slate-600"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
