import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import HeroDetail from "../app/components/HeroDetail";
import { Hero, IFilm, IStarship } from "../types";

const mock = new MockAdapter(axios);

const hero: Hero = {
  name: "Luke Skywalker",
  films: [1, 2],
  starships: [10],
};

const films: IFilm[] = [
  { id: 1, title: "A New Hope", starships: [10] },
  { id: 2, title: "The Empire Strikes Back", starships: [11] },
];

const starship: IStarship = { name: "X-Wing", id: 1 };

describe("HeroDetail", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("renders hero details", async () => {
    mock.onGet("https://sw-api.starnavi.io/films/1/").reply(200, films[0]);
    mock.onGet("https://sw-api.starnavi.io/films/2/").reply(200, films[1]);
    mock.onGet("https://sw-api.starnavi.io/starships/10/").reply(200, starship);

    render(<HeroDetail hero={hero} />);

    expect(await screen.findByText("Hero: Luke Skywalker")).toBeInTheDocument();
    expect(await screen.findByText("Film: A New Hope")).toBeInTheDocument();
    expect(await screen.findByText("Starship: X-Wing")).toBeInTheDocument();
  });
});
