import { FilmFormEntity } from "@/components/entities/FilmFormEntity";
import { FilmFormEntityState } from "@/components/entities/FilmFormEntity/model/types/types";
import { Box } from "@chakra-ui/react";
import { EditFilmFeatureProps } from "../model/types/types";
import { useEffect, useState } from "react";
import { fetchFilm } from "@/domain/film/api/fetchFilm";
import { updateFilm } from "../api/updateFilm";
import { useNavigate } from "react-router";

export default function EditFilmFeature({ id }: EditFilmFeatureProps) {
    const navigate = useNavigate();

    const [data, setData] = useState<FilmFormEntityState>();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchFilm(id)
            .then((data) => {
                const formState: FilmFormEntityState = {
                    categories: data.categories.map((i) => i.toString()),
                    name: data.name,
                    duration: data.duration,
                    description: data.description,
                    file: null,
                };

                if (data.fullImageUrl) {
                    formState.file = data.fullImageUrl.split("/").pop()!;
                }

                setData(formState);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [id]);

    const onSend = async (data: FilmFormEntityState) => {
        try {
            const film = await updateFilm(id, data);
            navigate(`/film/${film.id}`);
        } catch (e: unknown) {
            if (e instanceof Error) {
                alert(e.message);
            }
        }
    };

    return (
        <Box maxWidth="770px" margin="0 auto">
            {isLoading && <Box>Загрузка...</Box>}
            {isError && <Box>Произошла ошибка</Box>}
            {!isLoading && !isError && data && <FilmFormEntity state={data} onSend={onSend} />}
        </Box>
    );
}
