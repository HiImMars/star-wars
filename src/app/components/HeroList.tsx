import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Hero } from "../../types";
import { Pagination } from "./Pagination";
import { RotatingLines } from "react-loader-spinner";

interface HeroListProps {
  onSelectHero: (hero: Hero) => void;
}

const HeroList: React.FC<HeroListProps> = ({ onSelectHero }) => {
  // State to store the list of heroes
  const [heroes, setHeroes] = useState<Hero[]>([]);

  // State to manage the current page
  const [page, setPage] = useState(1);

  // State to track loading status
  const [isLoading, setIsLoading] = useState(false);

  // State to store any error message
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    const fetchHeroes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch heroes for the current page
        const response = await axios.get(
          `https://sw-api.starnavi.io/people/?page=${page}`
        );
        setHeroes(response.data.results);
      } catch (err) {
        // Set error message if the fetch fails
        setError("Failed to fetch heroes");
        alert(error);
      } finally {
        // Set loading to false after fetch attempt
        setIsLoading(false);
      }
    };

    fetchHeroes();
  }, [page, error]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-80">
        <RotatingLines
          visible={true}
          width="96"
          strokeColor="orange"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );

  // Calculate the total number of pages
  const pageCount = Math.ceil(82 / 10);

  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-80">
      <ul className="grid grid-cols-2 gap-x-10 gap-y-4">
        {Boolean(heroes?.length) &&
          heroes.map((hero, idx) => (
            // Display the list of heroes
            <li
              key={idx}
              onClick={() => onSelectHero(hero)}
              className="text-xl font-medium cursor-pointer py-2 px-4 border border-black rounded-lg hover:text-orangeAccent hover:border-orangeAccent hover:scale-105 transition-all"
            >
              {hero.name}
            </li>
          ))}
      </ul>
      {!isLoading && (
        // Display pagination component if not loading
        <Pagination page={page} pageCount={pageCount} setPage={setPage} />
      )}
    </div>
  );
};

export default HeroList;
