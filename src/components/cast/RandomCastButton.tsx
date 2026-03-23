interface RandomCastButtonProps {
  onGenerate: () => void;
}

export function RandomCastButton({ onGenerate }: RandomCastButtonProps) {
  return (
    <button
      className="border-ink/15 text-ink/80 rounded-full border px-4 py-2 text-sm"
      type="button"
      onClick={onGenerate}
    >
      一键随机生成
    </button>
  );
}
