import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";

const mockMovies = [
  { id: 1, title: "Doctor Strange" },
  { id: 2, title: "Trolls" },
  { id: 3, title: "Jack Reacher: Never Go Back" },
];

function LayoutWithNav({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

test("renders 'Home Page' inside of an <h1 />", () => {
  render(
    <MemoryRouter>
      <Home movies={mockMovies} />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Home Page");
});

test("Displays a list of movie titles", async () => {
  render(
    <MemoryRouter>
      <Home movies={mockMovies} />
    </MemoryRouter>
  );

  const titleList = await screen.findAllByRole("heading", { level: 2 });
  expect(titleList.length).toBeGreaterThan(2);
  expect(titleList[0].tagName).toBe("H2");
});

test("Displays links for each associated movie", async () => {
  render(
    <MemoryRouter>
      <Home movies={mockMovies} />
    </MemoryRouter>
  );

  const linkList = await screen.findAllByText(/View Info/i);
  expect(linkList.length).toBeGreaterThan(2);
  expect(linkList[0].href).toMatch(/\/movie\/\d+/);
});

test("renders the <NavBar /> component", () => {
  render(
    <MemoryRouter>
      <LayoutWithNav>
        <Home movies={mockMovies} />
      </LayoutWithNav>
    </MemoryRouter>
  );

  expect(document.querySelector(".navbar")).toBeInTheDocument();
});
