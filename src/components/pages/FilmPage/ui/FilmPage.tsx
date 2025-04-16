import { FilmInfoWidget } from "@/components/widgets/FilmInfoWidget";
import { filmsList } from "@/shared/mock/films";
import { Box } from "@chakra-ui/react";
import { useMemo } from "react";
import { useParams } from "react-router";

export default function FilmPage() {
    const { id } = useParams();

    const filmItem = useMemo(() => {
        return filmsList.find((film) => film.id === Number(id));
    }, [id]);

    if (!filmItem) {
        throw new Response("Film not found", { status: 404 });
    }

    return (
        <Box maxWidth={1170} margin={"0 auto"} padding={"50px 0 100px 0"}>
            <FilmInfoWidget data={filmItem} />
        </Box>
    );
}
