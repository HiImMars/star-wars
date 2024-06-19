import { render } from "@testing-library/react";
import HeroDetail from "../app/components/HeroDetail";

const hero = {
  name: "Luke Skywalker",
  films: [
    "https://sw-api.starnavi.io/api/films/1/",
    "https://sw-api.starnavi.io/api/films/2/",
  ],
};

test("renders hero detail graph", async () => {
  render(<HeroDetail hero={hero} />);
  // You can add additional conditions for HeroDetail component testing here
});
