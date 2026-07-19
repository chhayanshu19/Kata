export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Dark Background */}
      <div
        className="absolute inset-0 bg-[#0B1220]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md border border-[#E4E7EC] overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#E4E7EC]">
          <h2 className="text-base font-semibold tracking-tight text-[#101828]">
            {title}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#667085] transition-all duration-150 hover:bg-[#F2F4F7] hover:text-[#101828] active:scale-90 active:bg-[#E4E7EC]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
