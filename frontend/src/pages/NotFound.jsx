export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#14161A] px-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-3 w-3 rounded-full bg-[#F2A93B] animate-pulse"></span>
          <span className="text-[#F2A93B] font-mono text-xs uppercase tracking-[0.3em]">
            Route Not Found
          </span>
          <span className="h-3 w-3 rounded-full bg-[#F2A93B] animate-pulse"></span>
        </div>

        <h1 className="text-8xl font-black text-white tracking-tight">404</h1>

        <p className="mt-4 text-[#7C8494] font-medium">
          This page took a wrong turn and isn't in our inventory.
        </p>
      </div>
    </div>
  );
}
