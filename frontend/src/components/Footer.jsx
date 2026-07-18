export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#2A2E36] bg-[#14161A] text-[#D8D5CC]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide text-white">
            Kata Motors
          </h2>

          <p className="text-sm text-[#7C8494] mt-2">
            Vehicle Inventory Management System
          </p>
        </div>

        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#F2A93B]">
            React • Django • PostgreSQL
          </p>

          <p className="mt-2 text-sm text-[#7C8494]">
            Built with React, Django REST Framework and JWT Authentication
          </p>
        </div>

        <div className="text-sm text-[#7C8494]">
          © {new Date().getFullYear()} Kata Motors
        </div>
      </div>
    </footer>
  );
}
