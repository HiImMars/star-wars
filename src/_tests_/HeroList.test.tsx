// import { render, screen, fireEvent } from "@testing-library/react";
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";
// import HeroList from "../app/components/HeroList";
// import { Hero } from "../types";

// const mock = new MockAdapter(axios);

// const heroes: Hero[] = [
//   { name: "Luke Skywalker", films: [], starships: [] },
//   { name: "Darth Vader", films: [], starships: [] },
// ];

// describe("HeroList", () => {
//   beforeEach(() => {
//     mock.reset();
//   });

//   it("renders heroes", async () => {
//     mock
//       .onGet("https://sw-api.starnavi.io/people/?page=1")
//       .reply(200, { results: heroes });

//     render(<HeroList onSelectHero={jest.fn()} />);

//     expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
//     expect(screen.getByText("Darth Vader")).toBeInTheDocument();
//   });

//   it("calls onSelectHero when a hero is clicked", async () => {
//     mock
//       .onGet("https://sw-api.starnavi.io/people/?page=1")
//       .reply(200, { results: heroes });

//     const onSelectHero = jest.fn();
//     render(<HeroList onSelectHero={onSelectHero} />);

//     const heroElement = await screen.findByText("Luke Skywalker");
//     fireEvent.click(heroElement);

//     expect(onSelectHero).toHaveBeenCalledWith(heroes[0]);
//   });
// });

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import HeroList from "../app/components/HeroList";
import { Hero } from "../types";

// Створення мок-адаптера для axios
const mock = new MockAdapter(axios);

// Зразок героїв для тестування
const heroes: Hero[] = [
  { name: "Luke Skywalker", films: [], starships: [] },
  { name: "Darth Vader", films: [], starships: [] },
];

describe("HeroList Component", () => {
  it("fetches and displays heroes", async () => {
    // Встановлення мок-відповіді для axios
    mock
      .onGet("https://sw-api.starnavi.io/people/?page=1")
      .reply(200, { results: heroes });

    render(<HeroList onSelectHero={jest.fn()} />);

    // Очікування на рендеринг елементів
    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    expect(screen.getByText("Darth Vader")).toBeInTheDocument();
  });

  it("displays error message on fetch failure", async () => {
    // Встановлення мок-відповіді для axios
    mock.onGet("https://sw-api.starnavi.io/people/?page=1").reply(500);

    render(<HeroList onSelectHero={jest.fn()} />);

    // Очікування на рендеринг елементів
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch heroes")).toBeInTheDocument();
    });
  });
});
