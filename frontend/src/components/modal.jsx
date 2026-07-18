export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Dark Background */}
      <div
        className="absolute inset-0 bg-[#14161A]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-md shadow-2xl w-full max-w-md border-t-4 border-[#C81E3A] overflow-hidden">
        <div className="px-6 pt-6 pb-5">
          <h2 className="text-xl font-black uppercase tracking-wide text-[#14161A] mb-5">
            {title}
          </h2>

          {children}
        </div>
      </div>
    </div>
  );
}
