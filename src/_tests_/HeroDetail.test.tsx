import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import HeroDetail from "../app/components/HeroDetail";
import { Hero } from "../types";

// Creating a mock adapter for axios
const mock = new MockAdapter(axios);

// Sample hero for testing
const hero: Hero = {
  name: "Luke Skywalker",
  films: [1, 2],
  starships: [3],
};

// Sample films and starship for testing
const films = [
  { title: "A New Hope", starships: [3] },
  { title: "The Empire Strikes Back", starships: [3] },
];
const starship = { name: "X-wing" };

describe("HeroDetail Component", () => {
  it("fetches and displays hero details", async () => {
    // Setting mock responses for axios
    mock.onGet("https://sw-api.starnavi.io/films/1/").reply(200, films[0]);
    mock.onGet("https://sw-api.starnavi.io/films/2/").reply(200, films[1]);
    mock.onGet("https://sw-api.starnavi.io/starships/3/").reply(200, starship);

    render(<HeroDetail hero={hero} />);

    // Waiting for elements to render
    await waitFor(() => {
      expect(screen.getByText("Hero: Luke Skywalker")).toBeInTheDocument();
    });

    expect(screen.getByText("Film: A New Hope")).toBeInTheDocument();
    expect(
      screen.getByText("Film: The Empire Strikes Back")
    ).toBeInTheDocument();
    expect(screen.getByText("Starship: X-wing")).toBeInTheDocument();
  });
});
