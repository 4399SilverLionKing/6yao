import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const features = [
  { title: '铜钱起卦', desc: '模拟三枚铜钱，逐爻手动输入正反面' },
  { title: '自动排盘', desc: '纳甲装卦、六亲、六神、世应一步到位' },
  { title: '变卦推演', desc: '自动识别动爻，生成本卦与变卦对照' },
];

export function HomePage() {
  return (
    <div className="flex flex-col items-center pt-12 pb-16 text-center">
      {/* hero */}
      <p className="text-moss text-sm tracking-[0.3em]">六爻在线工具</p>
      <h1 className="mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
        起卦 · 排盘 · 解卦
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">
        遵循增删卜易古法，三枚铜钱摇卦，自动完成纳甲装卦、六亲六神排列，助你快速得出完整卦象。
      </p>

      <Link
        to="/cast"
        className={
          'mt-8 rounded-full bg-black/10 px-7 py-3.5 text-sm font-bold'
        }
      >
        开始起卦
        <span aria-hidden="true">→</span>
      </Link>

      {/* features */}
      <div className="mt-12 grid w-full max-w-2xl justify-items-center gap-8 sm:grid-cols-3 sm:gap-6">
        {features.map(f => (
          <Card
            key={f.title}
            size="sm"
            className="w-full max-w-[14rem] border-none bg-transparent shadow-none ring-0"
          >
            <CardHeader className="items-center text-center">
              <CardTitle className="font-semibold">{f.title}</CardTitle>
              <CardDescription className="leading-relaxed">
                {f.desc}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
