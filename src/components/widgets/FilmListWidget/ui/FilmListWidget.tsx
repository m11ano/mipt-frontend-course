import { FilmCardEntity } from "@/components/entities/FilmCardEntity";
import { filmsList } from "@/shared/mock/films";
import { filmCategories } from "@/store/filmCategories";
import { Box, Checkbox, Flex, Grid, Heading, HStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";

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

    const filmListFiltered = useMemo(() => {
        return filmsList.filter((filmItem) => {
            return checkedCategories[filmItem.categories[0]];
        });
    }, [checkedCategories]);

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
            <Grid
                margin={"40px 0 0 0"}
                templateColumns={"repeat(3, 1fr)"}
                gap="70px 60px"
            >
                {filmListFiltered.map((filmItem) => (
                    <FilmCardEntity key={filmItem.id} data={filmItem} />
                ))}
            </Grid>
        </>
    );
}
