import { type FormEvent, useState } from "react";

import { randomCast } from "../../core/divination/randomCast";
import type { CoinThrowValue } from "../../types/divination";
import { CoinThrowInput } from "./CoinThrowInput";
import { RandomCastButton } from "./RandomCastButton";

interface CastFormProps {
  onSubmit: (input: { throws: number[]; dateTime: string }) => void;
}

function defaultThrows() {
  return Array.from({ length: 6 }, () => "");
}

export function CastForm({ onSubmit }: CastFormProps) {
  const [question, setQuestion] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [throws, setThrows] = useState<string[]>(defaultThrows);
  const [error, setError] = useState("");

  function updateThrow(index: number, value: string) {
    setThrows((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
    setError("");
  }

  function applyRandomValues() {
    const values = randomCast();
    setThrows(values.map(String));
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!dateTime) {
      setError("请先填写起卦时间。");
      return;
    }

    if (throws.some((value) => value === "")) {
      setError("请先完整填写六次投掷结果。");
      return;
    }

    const values = throws.map((value) => Number(value) as CoinThrowValue);

    onSubmit({
      throws: values,
      dateTime
    });
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2 rounded-3xl border border-ink/10 bg-white/50 p-5">
        <span className="text-sm font-medium text-ink/80">占问内容</span>
        <textarea
          className="min-h-28 rounded-2xl border border-ink/10 bg-parchment/80 px-4 py-3"
          placeholder="例如：这个项目首版什么时候适合上线？"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-2 rounded-3xl border border-ink/10 bg-white/50 p-5">
        <span className="text-sm font-medium text-ink/80">起卦时间（北京时间）</span>
        <input
          aria-label="起卦时间"
          className="rounded-2xl border border-ink/10 bg-parchment/80 px-4 py-3"
          type="datetime-local"
          value={dateTime}
          onChange={(event) => {
            setDateTime(event.target.value);
            setError("");
          }}
        />
      </label>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">三枚铜钱起卦</h2>
          <p className="text-sm text-ink/70">按自下而上顺序录入六次结果。</p>
        </div>
        <RandomCastButton onGenerate={applyRandomValues} />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {throws.map((value, index) => (
          <CoinThrowInput
            key={index}
            index={index}
            value={value}
            onChange={(nextValue) => updateThrow(index, nextValue)}
          />
        ))}
      </div>

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment"
        type="submit"
      >
        开始排盘
      </button>
    </form>
  );
}
