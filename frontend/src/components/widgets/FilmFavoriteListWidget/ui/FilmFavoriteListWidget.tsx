import { FilmFavoriteCardEntity } from "@/components/entities/FilmFavoriteCardEntity";
import { FilmListItem } from "@/store/types/types";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchFavoritesFilmsList } from "../api/fetchFavoritesFilmsList";

export default function FilmFavoriteListWidget() {
    const [filmsList, setFilmsList] = useState<FilmListItem[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchFavoritesFilmsList()
            .then((data) => {
                setFilmsList(data);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, []);

    const onDelete = (id: number) => {
        setFilmsList((prev) => prev.filter((f) => f.id !== id));
    };

    return (
        <>
            {isLoading && <Box>Загрузка...</Box>}
            {isError && <Box>Произошла ошибка</Box>}
            {!isLoading && !isError && !filmsList.length && (
                <Box>Фильмы не найдены</Box>
            )}
            {!isLoading && !isError && filmsList.length ? (
                <Flex flexDir={"column"} gap="40px">
                    {filmsList.map((filmItem) => (
                        <FilmFavoriteCardEntity
                            key={filmItem.id}
                            data={filmItem}
                            onDelete={onDelete}
                        />
                    ))}
                </Flex>
            ) : null}
        </>
    );
}
