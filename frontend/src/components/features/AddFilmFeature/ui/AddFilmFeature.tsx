import { FilmFormEntity } from "@/components/entities/FilmFormEntity";
import { Box } from "@chakra-ui/react";

export default function AddFilmFeature() {
    return (
        <Box maxWidth="770px" margin="0 auto">
            <FilmFormEntity />
        </Box>
    );
}
