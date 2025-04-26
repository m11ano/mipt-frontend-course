import { AddFilmFeature } from "@/components/features/AddFilmFeature";
import { Box, Heading } from "@chakra-ui/react";

export default function FilmNewPage() {
    return (
        <Box maxWidth={1170} margin={"0 auto"} padding={"50px 0 100px 0"}>
            <Heading fontWeight={700} fontSize={40}>
                Добавить фильм
            </Heading>
            <Box marginTop="60px">
                <AddFilmFeature />
            </Box>
        </Box>
    );
}
