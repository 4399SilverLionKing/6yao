import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">页面不存在</h1>
      <Link className="text-clay" to="/">
        返回首页
      </Link>
    </section>
  );
}
