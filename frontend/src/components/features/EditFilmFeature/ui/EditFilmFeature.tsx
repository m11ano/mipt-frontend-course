import { FilmFormEntity } from "@/components/entities/FilmFormEntity";
import { EditFilmFeatureProps } from "../model/types/types";
import { Box } from "@chakra-ui/react";

export default function EditFilmFeature({ id }: EditFilmFeatureProps) {
    console.log(id);

    return (
        <Box maxWidth="770px" margin="0 auto">
            <FilmFormEntity />
        </Box>
    );
}
