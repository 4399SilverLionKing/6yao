interface RandomCastButtonProps {
  onGenerate: () => void;
}

export function RandomCastButton({ onGenerate }: RandomCastButtonProps) {
  return (
    <button
      className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/80"
      type="button"
      onClick={onGenerate}
    >
      一键随机生成
    </button>
  );
}

