"use client";
import { useEffect, useState } from "react";
import { getCharactersByQuery } from "../api/getData";

// get single exercise session. need the sessionID
const useGetData = (searchedText: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState("");
  const [characters, setCharacters] = useState<Awaited<
    ReturnType<typeof getNamesImagesAndEpisodeNumbersWithIsSelected>
  > | null>(null);

  let getNamesImagesAndEpisodeNumbersWithIsSelected = async () => {
    try {
      setIsLoading(true);
      // await new Promise((r) => setTimeout(r, 2000));

      let characters = await getCharactersByQuery(searchedText);

      if (typeof characters == "string") {
        setIsError("No characters found");
        return;
      }

      if (characters.length > 0) {
        let charactersWithSelectedProperty = characters.map((result) => ({
          id: result.id,
          name: result.name,
          imageUrl: result.image,
          episodeCount: result.episode.length,
          isSelected: false,
        }));

        return charactersWithSelectedProperty;
      }

      console.log({ characters });
    } catch (e) {
      let errorMessage = (e as Error).message;
      console.log({ errorMessage });
      setIsError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNamesImagesAndEpisodeNumbersWithIsSelected().then((res) => {
      setCharacters(res);
    });
  }, [searchedText]);

  return { isLoading, characters, setCharacters, isError };
};
export default useGetData;
