import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import HeroList from "../app/components/HeroList";
import { Hero } from "../types";

const mock = new MockAdapter(axios);

const heroes: Hero[] = [
  { name: "Luke Skywalker", films: [], starships: [] },
  { name: "Darth Vader", films: [], starships: [] },
];

describe("HeroList", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("renders heroes", async () => {
    mock
      .onGet("https://sw-api.starnavi.io/people/?page=1")
      .reply(200, { results: heroes });

    render(<HeroList onSelectHero={jest.fn()} />);

    expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Darth Vader")).toBeInTheDocument();
  });

  it("calls onSelectHero when a hero is clicked", async () => {
    mock
      .onGet("https://sw-api.starnavi.io/people/?page=1")
      .reply(200, { results: heroes });

    const onSelectHero = jest.fn();
    render(<HeroList onSelectHero={onSelectHero} />);

    const heroElement = await screen.findByText("Luke Skywalker");
    fireEvent.click(heroElement);

    expect(onSelectHero).toHaveBeenCalledWith(heroes[0]);
  });
});
