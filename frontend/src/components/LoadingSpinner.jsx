export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#3D4451]/30"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C81E3A] border-r-[#F2A93B] animate-spin"></div>
        <div className="absolute inset-[6px] rounded-full bg-[#14161A] flex items-center justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F2A93B]"></span>
        </div>
      </div>

      <p className="mt-5 text-[#3D4451] font-mono text-sm uppercase tracking-[0.2em]">
        {text}
      </p>
    </div>
  );
}
