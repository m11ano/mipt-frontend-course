import RouterLink from "@/components/shared/RouterLink/RouterLink";
import { Box, HStack } from "@chakra-ui/react";

export default function Header() {
    return (
        <Box as="header">
            <Box maxWidth={1170} margin={"0 auto"} padding={"30px 0"}>
                <HStack gap={30}>
                    <RouterLink
                        to="/"
                        color="#4A61DD"
                        fontWeight={500}
                        style={({ isActive }) => ({
                            color: isActive ? "#4A61DD" : "#000",
                        })}
                    >
                        Главная
                    </RouterLink>
                    <RouterLink
                        to="/favorites"
                        fontWeight={500}
                        style={({ isActive }) => ({
                            color: isActive ? "#4A61DD" : "#000",
                        })}
                    >
                        Избранное
                    </RouterLink>
                    <RouterLink
                        to="/newFilm"
                        fontWeight={500}
                        style={({ isActive }) => ({
                            color: isActive ? "#4A61DD" : "#000",
                        })}
                    >
                        Добавить фильм
                    </RouterLink>
                </HStack>
            </Box>
        </Box>
    );
}
