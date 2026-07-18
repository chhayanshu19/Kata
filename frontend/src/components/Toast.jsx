export default function Toast({ message, type, visible }) {
  if (!visible) return null;

  const colors = {
    success: {
      bg: "bg-[#3F9C63]",
      icon: "✓",
    },
    error: {
      bg: "bg-[#B23A3A]",
      icon: "✕",
    },
    warning: {
      bg: "bg-[#F2A93B]",
      icon: "!",
    },
  };

  const style = colors[type] || colors.success;

  return (
    <div className="fixed top-6 right-6 z-[9999]">
      <div
        className={`${style.bg} text-white shadow-2xl rounded-md px-5 py-4 flex items-center gap-3 min-w-[320px] animate-pulse`}
      >
        <span className="text-xl font-bold">{style.icon}</span>

        <p className="font-semibold tracking-wide">{message}</p>
      </div>
    </div>
  );
}
