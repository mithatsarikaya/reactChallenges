"use client";
import { useEffect, useState } from "react";
import allCharacterData from "../api/getData";

// get single exercise session. need the sessionID
const useGetData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState("");
  const [characters, setCharacters] = useState<Awaited<
    ReturnType<typeof getNamesImagesAndEpisodeNumbersWithIsSelected>
  > | null>(null);

  let getNamesImagesAndEpisodeNumbersWithIsSelected = async () => {
    try {
      setIsLoading(true);

      return allCharacterData.map((result) => ({
        id: result.id,
        name: result.name,
        imageUrl: result.image,
        episodeCount: result.episode.length,
        isSelected: false,
      }));
    } catch (e) {
      let errorMessage = (e as Error).message;
      setIsError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNamesImagesAndEpisodeNumbersWithIsSelected().then((res) =>
      setCharacters(res)
    );
  }, []);

  return { isLoading, characters, setCharacters, isError };
};
export default useGetData;
