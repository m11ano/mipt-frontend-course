import { Box, Heading } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorPage() {
    const error = useRouteError();
    let errorCode: null | number = null;

    if (isRouteErrorResponse(error) || error instanceof Response) {
        errorCode = error.status;
    }

    return (
        <Box
            maxWidth={1170}
            margin={"0 auto"}
            padding={"30px 0"}
            textAlign={"center"}
        >
            <Heading>
                {!errorCode ? (
                    <>Произошла неизвестная ошибка</>
                ) : (
                    <>Произошла ошибка, код {errorCode}</>
                )}
            </Heading>
        </Box>
    );
}
