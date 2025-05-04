import { FilmFormEntity } from "@/components/entities/FilmFormEntity";
import { FilmFormEntityState } from "@/components/entities/FilmFormEntity/model/types/types";
import { Box } from "@chakra-ui/react";
import { createFilm } from "../api/createFilm";
import { useNavigate } from "react-router";

export default function AddFilmFeature() {
    const navigate = useNavigate();

    const onSend = async (data: FilmFormEntityState) => {
        try {
            const film = await createFilm(data);
            navigate(`/film/${film.id}`);
        } catch (e: unknown) {
            if (e instanceof Error) {
                alert(e.message);
            }
        }
    };

    return (
        <Box maxWidth="770px" margin="0 auto">
            <FilmFormEntity onSend={onSend} />
        </Box>
    );
}
