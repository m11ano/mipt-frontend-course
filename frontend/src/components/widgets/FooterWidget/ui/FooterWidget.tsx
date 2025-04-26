import { Box, Span } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Box as="footer" background="black">
            <Box maxWidth={1170} margin={"0 auto"} padding={"30px 0"}>
                <Span color="white" fontWeight={500}>
                    Фильмограф
                </Span>
            </Box>
        </Box>
    );
}
