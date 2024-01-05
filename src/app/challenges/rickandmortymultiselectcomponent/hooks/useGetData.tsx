"use client";
import { useEffect, useState } from "react";
import getData from "../api/getData";

// get single exercise session. need the sessionID
const useGetData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [characters, setCharacters] = useState<Awaited<
    ReturnType<typeof getNamesImagesAndEpisodeNumbersWithIsSelected>
  > | null>(null);

  let getNamesImagesAndEpisodeNumbersWithIsSelected = async () => {
    return (await getData()).results.map((result) => ({
      id: result.id,
      name: result.name,
      imageUrl: result.image,
      episodeCount: result.episode.length,
      isSelected: false,
    }));
  };

  useEffect(() => {
    getNamesImagesAndEpisodeNumbersWithIsSelected().then((res) =>
      setCharacters(res)
    );
  }, []);

  return { isLoading, characters, setCharacters };
};
export default useGetData;
