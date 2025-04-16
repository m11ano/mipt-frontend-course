import { FilmFavoriteCardEntity } from "@/components/entities/FilmFavoriteCardEntity";
import { filmsList } from "@/shared/mock/films";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

export default function FilmFavoriteListWidget() {
    const [favoritesIDs, setFavoritesIDs] = useState<number[]>([1, 2, 3]);

    const onDelete = (id: number) => {
        setFavoritesIDs((prev) => prev.filter((f) => f !== id));
    };

    return (
        <Flex flexDir={"column"} gap="40px">
            {favoritesIDs.map((id) => (
                <FilmFavoriteCardEntity
                    key={id}
                    data={filmsList.find((f) => f.id === id)!}
                    onDelete={onDelete}
                />
            ))}
        </Flex>
    );
}
