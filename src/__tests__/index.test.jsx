import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routeArray } from "../routes";

test('renders the Home component on route "/"', () => {
  const router = createMemoryRouter(routeArray, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
});

test('renders the Actors component on route "/actors"', () => {
  const router = createMemoryRouter(routeArray, {
    initialEntries: ["/actors"]
  });
  render(<RouterProvider router={router} />);
  expect(screen.getByText(/Actors Page/i)).toBeInTheDocument();
});

test('renders the Directors component on route "/directors"', () => {
  const router = createMemoryRouter(routeArray, {
    initialEntries: ["/directors"]
  });
  render(<RouterProvider router={router} />);
  expect(screen.getByText(/Directors Page/i)).toBeInTheDocument();
});

test('renders the Movie component on route "/movie/:id"', async () => {
  const router = createMemoryRouter(routeArray, {
    initialEntries: ["/movie/1"]
  });
  render(<RouterProvider router={router} />);
  expect(await screen.findByText(/Doctor Strange/i)).toBeInTheDocument();
});

test("renders an error page when given a bad URL", () => {
  const router = createMemoryRouter(routeArray, {
    initialEntries: ["/bad-route"]
  });
  render(<RouterProvider router={router} />);
  expect(screen.getByText(/Oops! Looks like something went wrong./i)).toBeInTheDocument();
});
