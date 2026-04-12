import { useNavigate } from 'react-router-dom';

import { CastForm } from '../components/cast/CastForm';
import { computeChartResult } from '../core';
import { saveResult } from '../lib/resultStore';

export function CastPage() {
  const navigate = useNavigate();

  function handleSubmit(input: {
    throws: number[];
    dateTime: string;
    question: string;
  }) {
    const result = computeChartResult(input);

    saveResult(result);
    navigate('/result');
  }

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-moss text-sm tracking-[0.3em] uppercase">起卦</p>
        <h1 className="text-3xl font-semibold">在线起卦</h1>
        <p className="text-ink/75 max-w-2xl">
          首版采用三枚铜钱起卦，支持手动录入和随机生成。
        </p>
      </div>
      <CastForm onSubmit={handleSubmit} />
    </section>
  );
}
