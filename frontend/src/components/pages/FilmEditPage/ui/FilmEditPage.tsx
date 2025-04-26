import { EditFilmFeature } from "@/components/features/EditFilmFeature";
import { Box, Heading } from "@chakra-ui/react";
import { useParams } from "react-router";

export default function FilmEditPage() {
    const { id } = useParams();

    return (
        <Box maxWidth={1170} margin={"0 auto"} padding={"50px 0 100px 0"}>
            <Heading fontWeight={700} fontSize={40}>
                Редактировать фильм
            </Heading>
            <Box marginTop="60px">
                <EditFilmFeature id={Number(id)} />
            </Box>
        </Box>
    );
}
