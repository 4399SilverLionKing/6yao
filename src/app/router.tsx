import { Outlet, createBrowserRouter, type RouteObject } from "react-router-dom";

import { AppShell } from "../components/layout/AppShell";
import { CastPage } from "../pages/CastPage";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ResultPage } from "../pages/ResultPage";

function RootLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "cast",
        element: <CastPage />
      },
      {
        path: "result",
        element: <ResultPage />
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  }
];

export const router = createBrowserRouter(routes);

