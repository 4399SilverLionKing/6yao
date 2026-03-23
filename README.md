# 六爻在线起卦

基于 `Vite + React + TypeScript` 的六爻工具站，实现了三枚铜钱起卦、前端本地排盘和结果展示。

当前版本已经支持一轮正式排盘能力：

- 北京时间公历输入
- 月建、日辰、旬空自动换算
- 纳甲、六亲、六神、世应、伏神输出

## 本地开发

```bash
pnpm install
pnpm dev
```

## 测试

```bash
pnpm test
```

## 构建

```bash
pnpm build
```

## 部署

- 构建命令：`pnpm build`
- 输出目录：`dist`
- 部署平台：`Cloudflare Pages`

当前应用是纯静态站点，起卦和排盘都在浏览器本地完成，不依赖后端服务。
