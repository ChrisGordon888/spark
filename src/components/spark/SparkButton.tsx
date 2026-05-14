type SparkButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export function SparkButton({
  children,
  onClick,
  className = "",
}: SparkButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-full bg-violet-300 px-6 py-4 text-base font-bold text-black shadow-lg shadow-violet-950/40 transition hover:scale-[1.02] hover:bg-violet-200 active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}