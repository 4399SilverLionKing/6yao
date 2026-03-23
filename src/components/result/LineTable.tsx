import type { ChartResult } from '../../types/chartResult';

interface LineTableProps {
  result: ChartResult;
}

function formatLine(line: ChartResult['lines'][number]) {
  return `${line.throwValue} ${line.polarity === 'yang' ? '阳' : '阴'}${
    line.moving ? ' 动' : ''
  }`;
}

export function LineTable({ result }: LineTableProps) {
  const lines = [...result.lines].reverse();

  return (
    <section className="border-ink/10 rounded-3xl border bg-white/60 p-5">
      <h2 className="text-xl font-semibold">六爻结构</h2>
      <div className="border-ink/10 mt-4 overflow-hidden rounded-2xl border">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-parchment/80">
            <tr>
              <th className="px-4 py-3">爻位</th>
              <th className="px-4 py-3">纳甲</th>
              <th className="px-4 py-3">阴阳</th>
              <th className="px-4 py-3">六亲</th>
              <th className="px-4 py-3">六神</th>
              <th className="px-4 py-3">标记</th>
            </tr>
          </thead>
          <tbody>
            {lines.map(line => (
              <tr key={line.position} className="border-ink/10 border-t">
                <td className="px-4 py-3">第 {line.position} 爻</td>
                <td className="px-4 py-3">{line.ganzhi}</td>
                <td className="px-4 py-3">{formatLine(line)}</td>
                <td className="px-4 py-3">{line.relation}</td>
                <td className="px-4 py-3">{line.spirit}</td>
                <td className="px-4 py-3">
                  {line.isShi ? '世' : ''}
                  {line.isYing ? '应' : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {result.hiddenLines.length ? (
        <div className="border-ink/15 bg-parchment/70 mt-5 rounded-2xl border border-dashed p-4">
          <h3 className="text-moss text-sm font-semibold tracking-[0.25em] uppercase">
            伏神
          </h3>
          <ul className="text-ink/80 mt-3 space-y-2 text-sm">
            {result.hiddenLines.map(line => (
              <li key={`${line.position}-${line.ganzhi}`}>
                第 {line.position} 爻伏 {line.relation} {line.ganzhi}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
