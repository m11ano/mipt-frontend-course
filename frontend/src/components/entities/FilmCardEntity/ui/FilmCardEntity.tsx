import RouterLink from "@/components/shared/RouterLink/RouterLink";
import { Box, Card, Flex, Image, Span } from "@chakra-ui/react";
import { Link } from "react-router";
import { FilmCardEntityProps } from "../model/types/types";
import { filmCategories, IFilmCategory } from "@/domain/film/const/filmCategories";
import { GoClock } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import { useCallback, useRef, useState } from "react";
import { setFilmIsFavorite } from "@/domain/film/api/setFilmIsFavorite";
import { AxiosError } from "axios";

const catMaps: Record<number, IFilmCategory> = {};

filmCategories.forEach((cat) => {
    catMaps[cat.id] = cat;
});

export default function FilmCardEntity({ data }: FilmCardEntityProps) {
    const [isFavorite, setIsFavorite] = useState(data.isFavorite);
    const abortRef = useRef<AbortController | null>(null);

    const toggleFavorite = useCallback(async () => {
        abortRef.current?.abort();

        const controller = new AbortController();
        abortRef.current = controller;

        setIsFavorite((prev) => !prev);

        try {
            await setFilmIsFavorite(data.id, !isFavorite, abortRef.current.signal);
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                if (e.code === "ERR_CANCELED") {
                    return;
                }
            }
            setIsFavorite((prev) => !prev);
        } finally {
            abortRef.current = null;
        }
    }, [data.id, isFavorite]);

    return (
        <Card.Root overflow="hidden" borderRadius="12px">
            <Link to={`/film/${data.id}`}>
                <Image src={data.imageUrl} alt="" width="100%" />
            </Link>
            <Card.Body gap="2">
                <Card.Title>
                    <RouterLink to={`/film/${data.id}`} fontSize={22} fontWeight={600} display={"block"}>
                        {data.name}
                    </RouterLink>
                </Card.Title>
            </Card.Body>
            <Card.Footer justifyContent="space-between" alignItems="center">
                <Flex flexWrap="wrap" gap="5px">
                    {data.categories.map((categoryId) => (
                        <Span
                            key={categoryId}
                            color={catMaps[categoryId].color}
                            bgColor={catMaps[categoryId].bgColor}
                            padding={"5px 10px"}
                            fontSize={14}
                            fontWeight={500}
                            borderRadius="full"
                            lineHeight={1}
                        >
                            {catMaps[categoryId].name}
                        </Span>
                    ))}
                </Flex>
                <Flex gap="5px" flexShrink={0} alignItems={"center"}>
                    <GoClock size={20} />
                    <Span fontSize={14}>{data.duration} мин.</Span>
                </Flex>
                <Box flexShrink={0} fontSize={0}>
                    <button onClick={toggleFavorite} style={{ cursor: "pointer" }}>
                        {!isFavorite ? <GoStar color="#F9A62B" size={24} /> : <GoStarFill color="#F9A62B" size={24} />}
                    </button>
                </Box>
            </Card.Footer>
        </Card.Root>
    );
}
