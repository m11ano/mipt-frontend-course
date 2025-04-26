import "@/assets/styles/index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/routes";

import {
    ChakraProvider,
    createSystem,
    defaultConfig,
    defineConfig,
} from "@chakra-ui/react";

const config = defineConfig({
    theme: {},
});

const system = createSystem(defaultConfig, config);

function App() {
    return (
        <>
            <ChakraProvider value={system}>
                <RouterProvider router={router} />
            </ChakraProvider>
        </>
    );
}

export default App;
