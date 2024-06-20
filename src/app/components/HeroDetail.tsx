// "use client";

// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import ReactFlow, { Node, Edge } from "react-flow-renderer";
// import { Hero, IFilm } from "@/types";

// interface HeroDetailProps {
//   hero: Hero;
// }

// const HeroDetail: React.FC<HeroDetailProps> = ({ hero }) => {
//   const [nodes, setNodes] = useState<Node[]>([]);
//   const [edges, setEdges] = useState<Edge[]>([]);
//   const isMounted = useRef(false);

//   const { films, starships: heroStarships, name } = hero || {};

//   useEffect(() => {
//     const fetchHeroDetails = async () => {
//       if (!films) return;

//       const filmsResponse = await Promise.all(
//         films.map((endpoint) =>
//           axios.get<IFilm>(`https://sw-api.starnavi.io/films/${endpoint}/`)
//         )
//       );
//       const filmsData: IFilm[] = filmsResponse.map((response) => response.data);

//       const filmsStarshipsArray = filmsData.map((item) => item.starships);

//       const usedStarshipsByHero = filmsStarshipsArray.map((arr) =>
//         arr.filter((value) => heroStarships?.includes(value))
//       );

//       console.log(usedStarshipsByHero);
//       // const newNodes: Node[] = [
//       //   {
//       //     id: name,
//       //     type: "input",
//       //     data: { label: hero.name },
//       //     position: { x: 0, y: 0 },
//       //   },
//       // ];

//       // const newEdges: Edge[] = [];

//       // filmsData.forEach((film, index) => {
//       //   const filmNode = {
//       //     id: film.title,
//       //     data: { label: film.title },
//       //     position: { x: 200, y: 100 * index },
//       //   };
//       //   newNodes.push(filmNode);

//       //   newEdges.push({
//       //     id: `e${hero.name}-${film.title}`,
//       //     source: hero.name,
//       //     target: film.title,
//       //   });

//       //   starships.forEach((url, starshipIndex) => {
//       //     axios.get(url).then((starshipResponse) => {
//       //       const starship = starshipResponse.data;
//       //       const starshipNode = {
//       //         id: starship.name,
//       //         data: { label: starship.name },
//       //         position: { x: 400, y: 100 * starshipIndex },
//       //       };
//       //       newNodes.push(starshipNode);
//       //       newEdges.push({
//       //         id: `e${film.title}-${starship.name}`,
//       //         source: film.title,
//       //         target: starship.name,
//       //       });
//       //     });
//       //   });
//       // });

//       // setNodes(newNodes);
//       // setEdges(newEdges);
//     };

//     const fetchStarships = async () => {
//       if (!heroStarships) return;
//     };

//     if (!isMounted.current) {
//       isMounted.current = true;
//       return;
//     }

//     fetchHeroDetails();
//   }, [hero]);

//   return <ReactFlow nodes={nodes} edges={edges} />;
// };

// export default HeroDetail;

//========================================================

// "use client";

// import { useEffect, useRef } from "react";
// import axios from "axios";
// import ReactFlow, {
//   useNodesState,
//   useEdgesState,
//   Node,
//   Edge,
// } from "react-flow-renderer";
// import { Hero, IFilm, IStarship } from "@/types";

// interface HeroDetailProps {
//   hero: Hero;
// }

// const HeroDetail: React.FC<HeroDetailProps> = ({ hero }) => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const isMounted = useRef(false);

//   const { films, starships: heroStarships, name: heroName } = hero || {};

//   useEffect(() => {
//     const fetchHeroDetails = async () => {
//       if (!films || !heroName) return;

//       const filmsResponse = await Promise.all(
//         films.map((endpoint) =>
//           axios.get<IFilm>(`https://sw-api.starnavi.io/films/${endpoint}/`)
//         )
//       );
//       const filmsData: IFilm[] = filmsResponse.map((response) => response.data);

//       const filmsStarshipsArray = filmsData.map((item) => item.starships);

//       const usedStarshipsByHero = filmsStarshipsArray.map((arr) =>
//         arr.filter((value) => heroStarships?.includes(value))
//       );

//       // Create nodes and edges
//       const newNodes: Node[] = [
//         {
//           id: heroName,
//           type: "input",
//           data: { label: `Hero: ${heroName}` },
//           position: { x: 0, y: 25 },
//         },
//       ];

//       const newEdges: Edge[] = [];

//       // Add film nodes and edges
//       filmsData.forEach((film, index) => {
//         const filmNode = {
//           id: film.title,
//           data: { label: `Film: ${film.title}` },
//           position: { x: 150, y: 125 + index * 150 },
//         };
//         newNodes.push(filmNode);

//         newEdges.push({
//           id: `e${heroName}-${film.title}`,
//           source: heroName,
//           target: film.title,
//         });

//         // Fetch starship details
//         usedStarshipsByHero[index].forEach((starshipId) => {
//           axios
//             .get<IStarship>(
//               `https://sw-api.starnavi.io/starships/${starshipId}/`
//             )
//             .then((response) => {
//               const starship = response.data;

//               const starshipNode = {
//                 id: starship.name,
//                 data: { label: `Starship: ${starship.name}` },
//                 position: { x: 50, y: 125 + index * 150 },
//               };
//               newNodes.push(starshipNode);
//               newEdges.push({
//                 id: `e${film.title}-${starship.name}`,
//                 source: film.title,
//                 target: starship.name,
//               });
//               setNodes([...newNodes]);
//               setEdges([...newEdges]);
//             });
//         });
//       });

//       setNodes(newNodes);
//       setEdges(newEdges);
//     };

//     if (!isMounted.current) {
//       isMounted.current = true;
//       return;
//     }

//     fetchHeroDetails();
//   }, [hero, heroName, films]);

//   return (
//     <ReactFlow
//       nodes={nodes}
//       edges={edges}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       style={{ width: "100%", height: "800px" }}
//     />
//   );
// };

// export default HeroDetail;

"use client";

import { useEffect, useMemo, useRef } from "react";
import axios from "axios";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from "react-flow-renderer";
import { Hero, IFilm, IStarship } from "@/types";

interface HeroDetailProps {
  hero: Hero;
}

const HeroDetail: React.FC<HeroDetailProps> = ({ hero }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const isMounted = useRef(false);
  const fetchedStarships = useRef<{ [key: string]: IStarship }>({});

  const { films, starships: heroStarships, name: heroName } = hero || {};

  useEffect(() => {
    const fetchHeroDetails = async () => {
      if (!films || !heroName) return;

      const filmsResponse = await Promise.all(
        films.map((endpoint) =>
          axios.get<IFilm>(`https://sw-api.starnavi.io/films/${endpoint}/`)
        )
      );
      const filmsData: IFilm[] = filmsResponse.map((response) => response.data);

      const filmsStarshipsArray = filmsData.map((item) => item.starships);

      const usedStarshipsByHero = filmsStarshipsArray.map((arr) =>
        arr.filter((value) => heroStarships?.includes(value))
      );

      // Create nodes and edges
      const newNodes: Node[] = [
        {
          id: heroName,
          type: "input",
          data: { label: `Hero: ${heroName}` },
          position: { x: 250, y: 25 },
          draggable: false,
        },
      ];

      const newEdges: Edge[] = [];

      // Add film nodes and edges
      for (let index = 0; index < filmsData.length; index++) {
        const film = filmsData[index];
        const filmNode = {
          id: film.title,
          data: { label: `Film: ${film.title}` },
          position: { x: 100 + index * 170, y: 125 },
          draggable: false,
        };
        newNodes.push(filmNode);

        newEdges.push({
          id: `e${heroName}-${film.title}`,
          source: heroName,
          target: film.title,
        });

        // Fetch starship details
        const starshipPromises = usedStarshipsByHero[index].map(
          async (starshipId) => {
            if (!fetchedStarships.current[starshipId]) {
              const response = await axios.get<IStarship>(
                `https://sw-api.starnavi.io/starships/${starshipId}/`
              );
              fetchedStarships.current[starshipId] = response.data;
            }
            return fetchedStarships.current[starshipId];
          }
        );

        const starships = await Promise.all(starshipPromises);

        // Counter for positioning starships
        let starshipIndex = 0;

        for (const starship of starships) {
          const starshipNode = {
            id: starship.name,
            data: { label: `Starship: ${starship.name}` },
            position: { x: 50 + starshipIndex * 180, y: 250 },
            draggable: false,
          };
          newNodes.push(starshipNode);
          newEdges.push({
            id: `e${film.title}-${starship.name}`,
            source: film.title,
            target: starship.name,
          });
          starshipIndex++;
        }
      }

      setNodes(newNodes);
      setEdges(newEdges);
    };

    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    fetchHeroDetails();
  }, [hero, heroName, films]);

  const memoizedNodes = useMemo(() => nodes, [nodes]);
  const memoizedEdges = useMemo(() => edges, [edges]);

  return (
    <ReactFlow
      nodes={memoizedNodes}
      edges={memoizedEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      style={{ width: "100%", height: "800px" }}
    />
  );
};

export default HeroDetail;
