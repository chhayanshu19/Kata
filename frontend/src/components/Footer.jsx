export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#24344A] bg-[#0B1220] text-[#CBD3E1]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-base font-semibold tracking-tight text-white">
            Kata Motors
          </h2>

          <p className="text-sm text-[#7C8AA0] mt-1">
            Vehicle Inventory Management System
          </p>
        </div>

        <div className="text-center">
          <p className="font-medium text-xs uppercase tracking-[0.18em] text-[#B98D3E]">
            React · Django · PostgreSQL
          </p>

          <p className="mt-1.5 text-sm text-[#7C8AA0]">
            Built with React, Django REST Framework and JWT Authentication
          </p>
        </div>

        <div className="text-sm text-[#7C8AA0]">
          © {new Date().getFullYear()} Kata Motors
        </div>
      </div>
    </footer>
  );
}
