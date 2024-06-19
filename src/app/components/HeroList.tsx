import { useState, useEffect } from "react";
import axios from "axios";

interface Hero {
  name: string;
  films: string[];
}

interface HeroListProps {
  onSelectHero: (hero: Hero) => void;
}

const HeroList: React.FC<HeroListProps> = ({ onSelectHero }) => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchHeroes = async () => {
      const response = await axios.get(
        `https://sw-api.starnavi.io/api/people?page=${page}`
      );
      setHeroes((prevHeroes) => [...prevHeroes, ...response.data.results]);
      setHasMore(response.data.next !== null);
    };

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
        {heroes.map((hero) => (
          <li key={hero.name} onClick={() => onSelectHero(hero)}>
            {hero.name}
          </li>
        ))}
      </ul>
      {hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default HeroList;
