import RouterLink from "@/components/shared/RouterLink/RouterLink";
import { Box, Card, Flex, Image, Span } from "@chakra-ui/react";
import { Link } from "react-router";
import { FilmCardEntityProps } from "../model/types/types";
import { filmCategories, IFilmCategory } from "@/store/filmCategories";
import { GoClock } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import { useState } from "react";

const catMaps: Record<number, IFilmCategory> = {};

filmCategories.forEach((cat) => {
    catMaps[cat.id] = cat;
});

export default function FilmCardEntity({ data }: FilmCardEntityProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Card.Root overflow="hidden" borderRadius="12px">
            <Link to={`/film/${data.id}`}>
                <Image src={data.imageUrl} alt="" width="100%" />
            </Link>
            <Card.Body gap="2">
                <Card.Title>
                    <RouterLink
                        to={`/film/${data.id}`}
                        fontSize={22}
                        fontWeight={600}
                        display={"block"}
                    >
                        {data.name}
                    </RouterLink>
                </Card.Title>
            </Card.Body>
            <Card.Footer justifyContent={"space-between"}>
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
                <Flex gap="5px" alignItems={"center"}>
                    <GoClock size={20} />
                    <Span fontSize={14}>{data.duration} мин.</Span>
                </Flex>
                <Box>
                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        style={{ cursor: "pointer" }}
                    >
                        {!isFavorite ? (
                            <GoStar color="#F9A62B" size={24} />
                        ) : (
                            <GoStarFill color="#F9A62B" size={24} />
                        )}
                    </button>
                </Box>
            </Card.Footer>
        </Card.Root>
    );
}
