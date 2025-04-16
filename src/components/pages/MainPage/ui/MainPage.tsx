import { FilmListWidget } from "@/components/widgets/FilmListWidget";
import { Box } from "@chakra-ui/react";

export default function MainPage() {
    return (
        <Box maxWidth={1170} margin={"0 auto"} padding={"50px 0 100px 0"}>
            <FilmListWidget />
        </Box>
    );
}
