import { FilmInfoWidget } from "@/components/widgets/FilmInfoWidget";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router";

export default function FilmPage() {
    const { id } = useParams();

    const filmId = Number(id) || 0;

    return (
        <Box maxWidth={1170} margin={"0 auto"} padding={"50px 0 100px 0"}>
            <FilmInfoWidget id={filmId} />
        </Box>
    );
}
