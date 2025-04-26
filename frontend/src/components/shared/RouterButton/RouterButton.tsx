import { forwardRef } from "react";
import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import {
    NavLink as RouterNavLink,
    NavLinkProps as RouterNavLinkProps,
} from "react-router";

type Props = Omit<ChakraButtonProps, "as"> & RouterNavLinkProps;

export const RouterButton = forwardRef<HTMLButtonElement, Props>(
    ({ children, ...props }, ref) => {
        return (
            <Button as={RouterNavLink} ref={ref} {...props}>
                {children}
            </Button>
        );
    }
);

RouterButton.displayName = "RouterButton";

export default RouterButton;
