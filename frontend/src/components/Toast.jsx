export default function Toast({ message, type, visible }) {
  if (!visible) return null;

  const colors = {
    success: {
      accent: "bg-[#1B7A5B]",
      iconBg: "bg-[#EAF3EF]",
      iconColor: "text-[#1B7A5B]",
      icon: "✓",
    },
    error: {
      accent: "bg-[#B3261E]",
      iconBg: "bg-[#FBEAEA]",
      iconColor: "text-[#B3261E]",
      icon: "✕",
    },
    warning: {
      accent: "bg-[#B98D3E]",
      iconBg: "bg-[#F5EFE1]",
      iconColor: "text-[#B98D3E]",
      icon: "!",
    },
  };

  const style = colors[type] || colors.success;

  return (
    <div className="fixed top-6 right-6 z-[9999]">
      <div className="relative bg-white shadow-lg border border-[#E4E7EC] rounded-lg pl-4 pr-5 py-3.5 flex items-center gap-3 min-w-[320px] overflow-hidden">
        <span className={`absolute left-0 top-0 h-full w-1 ${style.accent}`} />

        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${style.iconBg} ${style.iconColor} text-sm font-bold`}
        >
          {style.icon}
        </span>

        <p className="text-sm font-medium text-[#101828]">{message}</p>
      </div>
    </div>
  );
}
