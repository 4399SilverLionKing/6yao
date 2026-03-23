import type { ChangeEvent } from 'react';

const OPTIONS = [
  { value: '', label: '请选择' },
  { value: '6', label: '6 老阴' },
  { value: '7', label: '7 少阳' },
  { value: '8', label: '8 少阴' },
  { value: '9', label: '9 老阳' },
];

interface CoinThrowInputProps {
  index: number;
  value: string;
  onChange: (value: string) => void;
}

export function CoinThrowInput({
  index,
  value,
  onChange,
}: CoinThrowInputProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }

  return (
    <label className="border-ink/10 flex flex-col gap-2 rounded-2xl border bg-white/60 p-4">
      <span className="text-ink/80 text-sm font-medium">第 {index + 1} 爻</span>
      <select
        aria-label={`第 ${index + 1} 爻`}
        className="border-ink/15 bg-parchment rounded-xl border px-3 py-2"
        value={value}
        onChange={handleChange}
      >
        {OPTIONS.map(option => (
          <option key={option.value || 'empty'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
