import { render, screen } from "@testing-library/react";
import HeroList from "../app/components/HeroList";
import "@testing-library/jest-dom/extend-expect";

test("renders hero list", async () => {
  render(<HeroList onSelectHero={() => {}} />);
  const loadMoreButton = screen.getByText(/Load More/i);
  expect(loadMoreButton).toBeInTheDocument();
});
