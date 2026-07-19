export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-[3px] border-[#E4E7EC]"></div>
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#B98D3E] animate-spin"></div>
      </div>

      <p className="mt-4 text-[#667085] text-sm font-medium">{text}</p>
    </div>
  );
}
