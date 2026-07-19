export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220] px-6">
      <div className="text-center">
        <span className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-[#B98D3E] bg-[#14202F] border border-[#24344A] px-3 py-1 rounded-full mb-5">
          Route not found
        </span>

        <h1 className="text-7xl font-semibold text-white tracking-tight">
          404
        </h1>

        <p className="mt-4 text-[#7C8AA0] font-normal max-w-sm mx-auto">
          This page took a wrong turn and isn't in our inventory.
        </p>
      </div>
    </div>
  );
}
