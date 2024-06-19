import { useEffect, useState } from "react";
import axios from "axios";
import ReactFlow, { Node, Edge } from "react-flow-renderer";

interface Hero {
  name: string;
  films: string[];
}

interface Film {
  title: string;
  starships: string[];
}

interface HeroDetailProps {
  hero: Hero;
}

const HeroDetail: React.FC<HeroDetailProps> = ({ hero }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const fetchHeroDetails = async () => {
      const filmsResponse = await Promise.all(
        hero.films.map((url) => axios.get(url))
      );
      const films: Film[] = filmsResponse.map((response) => response.data);

      const newNodes: Node[] = [
        {
          id: hero.name,
          type: "input",
          data: { label: hero.name },
          position: { x: 0, y: 0 },
        },
      ];

      const newEdges: Edge[] = [];

      films.forEach((film, index) => {
        const filmNode = {
          id: film.title,
          data: { label: film.title },
          position: { x: 200, y: 100 * index },
        };
        newNodes.push(filmNode);
        newEdges.push({
          id: `e${hero.name}-${film.title}`,
          source: hero.name,
          target: film.title,
        });

        film.starships.forEach((url, starshipIndex) => {
          axios.get(url).then((starshipResponse) => {
            const starship = starshipResponse.data;
            const starshipNode = {
              id: starship.name,
              data: { label: starship.name },
              position: { x: 400, y: 100 * starshipIndex },
            };
            newNodes.push(starshipNode);
            newEdges.push({
              id: `e${film.title}-${starship.name}`,
              source: film.title,
              target: starship.name,
            });
          });
        });
      });

      setNodes(newNodes);
      setEdges(newEdges);
    };

    fetchHeroDetails();
  }, [hero]);

  return <ReactFlow elements={[...nodes, ...edges]} />;
};

export default HeroDetail;
