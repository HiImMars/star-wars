import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Hero } from "@/types";

interface HeroListProps {
  onSelectHero: (hero: Hero) => void;
}

const HeroList: React.FC<HeroListProps> = ({ onSelectHero }) => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    const fetchHeroes = async () => {
      const response = await axios.get(
        `https://sw-api.starnavi.io/people/?page=${page}`
      );

      // setHeroes((prevState) => [...prevState, ...response.data.results]);
      setHeroes(() => [...response.data.results]);
      setHasMore(response?.data?.next !== null);
    };

    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    fetchHeroes();
  }, [page]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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
      {hasMore && (
        <button className="border border-black" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default HeroList;
