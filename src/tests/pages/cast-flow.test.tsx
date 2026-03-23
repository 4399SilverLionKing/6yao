import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { beforeEach, test } from "vitest";

import { routes } from "../../app/router";

function renderRoute(initialEntries: string[]) {
  const router = createMemoryRouter(routes, { initialEntries });

  render(<RouterProvider router={router} />);
}

beforeEach(() => {
  window.sessionStorage.clear();
});

test("renders home page heading", () => {
  renderRoute(["/"]);

  expect(screen.getByRole("heading", { name: /六爻/i })).toBeInTheDocument();
});

test("submits a valid cast and navigates to result", async () => {
  const user = userEvent.setup();

  renderRoute(["/cast"]);

  await user.type(screen.getByLabelText(/起卦时间/i), "2026-03-23T10:30");

  const selects = screen.getAllByRole("combobox");

  await user.selectOptions(selects[0], "8");
  for (const select of selects.slice(1)) {
    await user.selectOptions(select, "7");
  }

  await user.click(screen.getByRole("button", { name: /开始排盘/i }));

  expect(
    await screen.findByRole("heading", { name: /排盘结果/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/辛卯月/i)).toBeInTheDocument();
  expect(screen.getByText(/丙申日/i)).toBeInTheDocument();
  expect(screen.getByText(/辰巳空/i)).toBeInTheDocument();
  expect(screen.getByText(/辛丑/)).toBeInTheDocument();
  expect(screen.getByText(/伏神/)).toBeInTheDocument();
  expect(screen.getByText(/甲寅/)).toBeInTheDocument();
});

test("requires datetime before computing the chart", async () => {
  const user = userEvent.setup();

  renderRoute(["/cast"]);

  const selects = screen.getAllByRole("combobox");

  for (const select of selects) {
    await user.selectOptions(select, "7");
  }

  await user.click(screen.getByRole("button", { name: /开始排盘/i }));

  expect(screen.getByText(/请先填写起卦时间/i)).toBeInTheDocument();
});

test("shows a recovery state when result data is missing", () => {
  renderRoute(["/result"]);

  expect(screen.getByText(/请先起卦/i)).toBeInTheDocument();
});
