import { FilmFavoriteListWidget } from "@/components/widgets/FilmFavoriteListWidget";
import { Box, Heading } from "@chakra-ui/react";

export default function FavoritesPage() {
    return (
        <Box maxWidth={1170} margin={"0 auto"} padding={"50px 0 100px 0"}>
            <Heading fontWeight={700} fontSize={40}>
                Избранное
            </Heading>
            <Box marginTop="40px">
                <FilmFavoriteListWidget />
            </Box>
        </Box>
    );
}
