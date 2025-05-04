import { FilmCardEntity } from "@/components/entities/FilmCardEntity";
import { filmCategories } from "@/domain/film/const/filmCategories";
import { FilmListItem } from "@/domain/film/types/types";
import { Box, Checkbox, Flex, Grid, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { fetchFilmsList } from "../api/fetchFilmsList";

export default function FilmListWidget() {
    const [checkedCategories, setCheckedCategories] = useState<
        Record<number, boolean>
    >(
        () =>
            Object.fromEntries(
                filmCategories.map((category) => [category.id, true])
            ) as Record<number, boolean>
    );

    const toggleCategory = (id: number) => {
        setCheckedCategories((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const [filmsList, setFilmsList] = useState<FilmListItem[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchFilmsList()
            .then((data) => {
                setFilmsList(data);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, []);

    const filmListFiltered = useMemo(() => {
        return filmsList.filter((filmItem) => {
            return checkedCategories[filmItem.categories[0]];
        });
    }, [filmsList, checkedCategories]);

    return (
        <>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Box>
                    <Heading fontWeight={700} fontSize={40}>
                        Фильмы
                    </Heading>
                </Box>
                <HStack gap={30}>
                    {filmCategories.map((category) => (
                        <Checkbox.Root
                            key={category.id}
                            checked={checkedCategories[category.id]}
                            onCheckedChange={() => toggleCategory(category.id)}
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control
                                borderRadius={"full"}
                                width="24px"
                                height="24px"
                                borderColor={category.color}
                                _checked={{
                                    bg: category.color,
                                }}
                            />
                            <Checkbox.Label fontSize={16} fontWeight={500}>
                                {category.name}
                            </Checkbox.Label>
                        </Checkbox.Root>
                    ))}
                </HStack>
            </Flex>
            <Box marginTop="40px">
                {isLoading && <Box>Загрузка...</Box>}
                {isError && <Box>Произошла ошибка</Box>}
                {!isLoading && !isError && !filmListFiltered.length && (
                    <Box>Фильмы не найдены</Box>
                )}
                {!isLoading && !isError && filmListFiltered.length ? (
                    <Grid templateColumns={"repeat(3, 1fr)"} gap="70px 60px">
                        {filmListFiltered.map((filmItem) => (
                            <FilmCardEntity key={filmItem.id} data={filmItem} />
                        ))}
                    </Grid>
                ) : null}
            </Box>
        </>
    );
}
