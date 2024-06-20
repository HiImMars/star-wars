import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Hero } from "@/types";
import { Pagination } from "./Pagination";

interface HeroListProps {
  onSelectHero: (hero: Hero) => void;
}

const HeroList: React.FC<HeroListProps> = ({ onSelectHero }) => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  const isMounted = useRef(false);

  // useEffect(() => {
  //   const fetchHeroes = async () => {
  //     const response = await axios.get(
  //       `https://sw-api.starnavi.io/people/?page=${page}`
  //     );

  //     setHeroes(() => [...response.data.results]);
  //   };

  //   if (!isMounted.current) {
  //     isMounted.current = true;
  //     return;
  //   }

  //   fetchHeroes();
  // }, [page]);

  useEffect(() => {
    const fetchHeroes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://sw-api.starnavi.io/people/?page=${page}`
        );
        setHeroes(response.data.results);
      } catch (err) {
        setError("Failed to fetch heroes");
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    fetchHeroes();
  }, [page]);

  if (isLoading) return <div>Loading...</div>;

  const pageCount = Math.ceil(82 / 10);

  return (
    <div>
      <ul>
        {Boolean(heroes?.length) &&
          heroes.map((hero, idx) => (
            <li key={idx} onClick={() => onSelectHero(hero)}>
              {hero.name}
            </li>
          ))}
      </ul>
      {!isLoading && (
        <Pagination page={page} pageCount={pageCount} setPage={setPage} />
      )}
    </div>
  );
};

export default HeroList;
