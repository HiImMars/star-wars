"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReactFlow, { Node, Edge } from "react-flow-renderer";
import { Hero, IFilm } from "@/types";

interface HeroDetailProps {
  hero: Hero;
}

const HeroDetail: React.FC<HeroDetailProps> = ({ hero }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const { films, starships: heroStarships, name } = hero || {};

  useEffect(() => {
    const fetchHeroDetails = async () => {
      if (!films) return;

      const filmsResponse = await Promise.all(
        films.map((endpoint) =>
          axios.get<IFilm>(`https://sw-api.starnavi.io/films/${endpoint}/`)
        )
      );
      const filmsData: IFilm[] = filmsResponse.map((response) => response.data);

      const filmsStarshipsArray = filmsData.map((item) => item.starships);

      console.log(
        filmsStarshipsArray
          .map((arr) => arr.filter((value) => heroStarships?.includes(value)))
          .flat()
      );

      // const newNodes: Node[] = [
      //   {
      //     id: name,
      //     type: "input",
      //     data: { label: hero.name },
      //     position: { x: 0, y: 0 },
      //   },
      // ];

      // const newEdges: Edge[] = [];

      // filmsData.forEach((film, index) => {
      //   const filmNode = {
      //     id: film.title,
      //     data: { label: film.title },
      //     position: { x: 200, y: 100 * index },
      //   };
      //   newNodes.push(filmNode);

      //   newEdges.push({
      //     id: `e${hero.name}-${film.title}`,
      //     source: hero.name,
      //     target: film.title,
      //   });

      //   starships.forEach((url, starshipIndex) => {
      //     axios.get(url).then((starshipResponse) => {
      //       const starship = starshipResponse.data;
      //       const starshipNode = {
      //         id: starship.name,
      //         data: { label: starship.name },
      //         position: { x: 400, y: 100 * starshipIndex },
      //       };
      //       newNodes.push(starshipNode);
      //       newEdges.push({
      //         id: `e${film.title}-${starship.name}`,
      //         source: film.title,
      //         target: starship.name,
      //       });
      //     });
      //   });
      // });

      // setNodes(newNodes);
      // setEdges(newEdges);
    };

    fetchHeroDetails();
  }, [hero]);

  return <ReactFlow nodes={nodes} edges={edges} />;
};

export default HeroDetail;
