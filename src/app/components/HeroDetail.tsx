"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import axios from "axios";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from "react-flow-renderer";
import { debounce } from "lodash";
import { Hero, IFilm, IStarship } from "../../types";
import { RotatingLines } from "react-loader-spinner";

interface HeroDetailProps {
  hero: Hero;
}

const HeroDetail: React.FC<HeroDetailProps> = ({ hero }) => {
  // State hooks for managing nodes and edges in the graph
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // State to manage loading status and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ref to store fetched starship details to avoid redundant API calls
  const fetchedStarships = useRef<{ [key: string]: IStarship }>({});

  // Destructure necessary properties from the hero prop
  const { films, starships: heroStarships, name: heroName } = hero || {};

  // Function to fetch hero details with debouncing to avoid multiple calls
  const fetchHeroDetails = useCallback(
    debounce(
      async (films: number[], heroName: string, heroStarships: number[]) => {
        setIsLoading(true);
        setError(null);

        try {
          // Fetch film details for each film in the hero's film list
          const filmsResponse = await Promise.all(
            films.map((endpoint: number) =>
              axios.get<IFilm>(`https://sw-api.starnavi.io/films/${endpoint}/`)
            )
          );
          const filmsData: IFilm[] = filmsResponse.map(
            (response) => response.data
          );

          // Extract starship IDs used in each film
          const filmsStarshipsArray = filmsData.map((item) => item.starships);

          // Filter starships used by the hero
          const usedStarshipsByHero = filmsStarshipsArray.map((arr) =>
            arr.filter((value: number) => heroStarships?.includes(value))
          );

          // Initialize nodes with the hero node
          const newNodes: Node[] = [
            {
              id: heroName,
              type: "input",
              data: { label: `Hero: ${heroName}` },
              position: { x: 600, y: 25 },
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
              position: { x: 200 + index * 180, y: 150 },
              draggable: false,
            };
            newNodes.push(filmNode);

            newEdges.push({
              id: `e${heroName}-${film.title}`,
              source: heroName,
              target: film.title,
            });

            // Fetch starship details for each starship used by the hero in the current film
            const starshipPromises = usedStarshipsByHero[index].map(
              async (starshipId: number) => {
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

            // Add starship nodes and edges
            for (const starship of starships) {
              const starshipNode = {
                id: starship.name,
                data: { label: `Starship: ${starship.name}` },
                position: { x: 200 + starshipIndex * 180, y: 300 },
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

          // Update nodes and edges state
          setNodes(newNodes);
          setEdges(newEdges);
        } catch (err) {
          // Set error message if the fetch fails
          setError(
            "Failed to fetch hero details. Please select another hero or try later."
          );
        } finally {
          // Set loading to false after fetch attempt
          setIsLoading(false);
        }
      },
      350 // Debounce delay in milliseconds
    ),
    []
  );

  useEffect(() => {
    if (films && heroName && heroStarships) {
      fetchHeroDetails(films, heroName, heroStarships);
    }
  }, [films, heroName, heroStarships, fetchHeroDetails]);

  // Memoize nodes and edges to optimize performance
  const memoizedNodes = useMemo(() => nodes, [nodes]);
  const memoizedEdges = useMemo(() => edges, [edges]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
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
  if (error)
    return <div className="flex justify-center items-center">{error}</div>;

  return (
    <ReactFlow
      nodes={memoizedNodes}
      edges={memoizedEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      style={{
        width: "100%",
        height: "440px",
        border: "1px solid black",
        borderRadius: "12px",
      }}
    />
  );
};

export default HeroDetail;
