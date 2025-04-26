import { Box, Button, Flex, Image, Span, VStack } from "@chakra-ui/react";
import { FilmFavoriteCardEntityProps } from "../model/types/types";
import { Link } from "react-router";
import RouterLink from "@/components/shared/RouterLink/RouterLink";
import { GoClock } from "react-icons/go";

export default function FilmFavoriteListWidget({
    data,
    onDelete,
}: FilmFavoriteCardEntityProps) {
    return (
        <Flex alignItems="center" gap="40px" maxWidth="600px">
            <Box width={90} height={90} flexShrink={0}>
                <Link to={`/film/${data.id}`}>
                    <Image
                        src={data.imageUrl}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        borderRadius="full"
                    ></Image>
                </Link>
            </Box>
            <Box width="100%">
                <VStack gap="15px" alignItems="flex-start">
                    <Box>
                        <RouterLink
                            to={`/film/${data.id}`}
                            fontSize={16}
                            fontWeight={500}
                        >
                            {data.name}
                        </RouterLink>
                    </Box>
                    <Flex gap="5px" alignItems={"center"}>
                        <GoClock size={20} />
                        <Span fontSize={14}>{data.duration} мин.</Span>
                    </Flex>
                </VStack>
            </Box>
            <Box flexShrink={0}>
                <Button
                    variant="plain"
                    _hover={{ color: "#000" }}
                    color="#858383"
                    onClick={() => onDelete(data.id)}
                >
                    Удалить
                </Button>
            </Box>
        </Flex>
    );
}
