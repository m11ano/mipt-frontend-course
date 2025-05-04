import { Box, Button, Flex, Heading, Image, Span } from "@chakra-ui/react";
import { FilmInfoWidgetProps } from "../model/types/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { GoClock, GoStar, GoStarFill } from "react-icons/go";
import { filmCategories, IFilmCategory } from "@/domain/film/const/filmCategories";
import RouterButton from "@/components/shared/RouterButton/RouterButton";
import { FilmItem } from "@/domain/film/types/types";
import { fetchFilm } from "../../../../domain/film/api/fetchFilm";
import { setFilmIsFavorite } from "@/domain/film/api/setFilmIsFavorite";
import { AxiosError } from "axios";
import { deleteFilm } from "../api/deleteFilm";
import { useNavigate } from "react-router";

const catMaps: Record<number, IFilmCategory> = {};

filmCategories.forEach((cat) => {
    catMaps[cat.id] = cat;
});

export default function FilmFavoriteListWidget({ id }: FilmInfoWidgetProps) {
    const navigate = useNavigate();

    const [isFavorite, setIsFavorite] = useState(false);

    const [data, setData] = useState<FilmItem>();

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const abortRef = useRef<AbortController | null>(null);

    const toggleFavorite = useCallback(async () => {
        if (!data) {
            return;
        }
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
    }, [data, isFavorite]);

    useEffect(() => {
        fetchFilm(id)
            .then((data) => {
                setData(data);
                setIsFavorite(data.isFavorite);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [id]);

    const removeFilm = useCallback(async () => {
        if (confirm("Вы действительно хотите удалить фильм?")) {
            try {
                await deleteFilm(id);
                navigate("/");
            } catch (e: unknown) {
                if (e instanceof Error) {
                    alert(e.message);
                }
            }
        }
    }, [id, navigate]);

    return (
        <>
            {isLoading && <Box>Загрузка...</Box>}
            {isError && <Box>Произошла ошибка</Box>}
            {!isLoading && !isError && data && (
                <Flex gap="60px">
                    <Box width="480px" height="480px" flexShrink={0}>
                        <Image
                            src={data.fullImageUrl}
                            alt=""
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            borderRadius="16px"
                        />
                    </Box>
                    <Box paddingTop="10px" width="100%">
                        <Flex justifyContent="space-between" gap="20px">
                            <Box>
                                <Heading fontWeight={700} fontSize={40}>
                                    {data.name}
                                </Heading>
                            </Box>
                            <Box>
                                <button onClick={toggleFavorite} style={{ cursor: "pointer" }}>
                                    {!isFavorite ? (
                                        <GoStar color="#F9A62B" size={36} />
                                    ) : (
                                        <GoStarFill color="#F9A62B" size={36} />
                                    )}
                                </button>
                            </Box>
                        </Flex>
                        <Flex gap="40px" marginTop="10px">
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
                        </Flex>
                        <Box marginTop="20px" lineHeight={1.6} fontSize={16}>
                            {data.description}
                        </Box>
                        <Flex marginTop="70px" justifyContent="flex-end" gap="30px">
                            <RouterButton
                                to={`/film/${data.id}/edit`}
                                variant="outline"
                                borderColor="#DEE2F2"
                                color="#4A61DD"
                                _hover={{ bgColor: "f0f3ff" }}
                            >
                                Редактировать
                            </RouterButton>
                            <Button
                                variant="outline"
                                borderColor="#DEE2F2"
                                color="#4A61DD"
                                _hover={{ bgColor: "f0f3ff" }}
                                onClick={removeFilm}
                            >
                                Удалить
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            )}
        </>
    );
}
