import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import HeroList from "../app/components/HeroList";
import { Hero } from "../types";

// Creating a mock adapter for axios
const mock = new MockAdapter(axios);

// Sample heroes for testing
const heroes: Hero[] = [
  { name: "Luke Skywalker", films: [], starships: [] },
  { name: "Darth Vader", films: [], starships: [] },
];

describe("HeroList Component", () => {
  it("fetches and displays heroes", async () => {
    // Setting mock response for axios
    mock
      .onGet("https://sw-api.starnavi.io/people/?page=1")
      .reply(200, { results: heroes });

    render(<HeroList onSelectHero={jest.fn()} />);

    // Waiting for elements to render
    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    expect(screen.getByText("Darth Vader")).toBeInTheDocument();
  });

  it("displays error message on fetch failure", async () => {
    // Setting mock response for axios
    mock.onGet("https://sw-api.starnavi.io/people/?page=1").reply(500);

    render(<HeroList onSelectHero={jest.fn()} />);

    // Waiting for elements to render
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch heroes")).toBeInTheDocument();
    });
  });
});
