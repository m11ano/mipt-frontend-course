import { forwardRef } from "react";
import {
    Link as ChakraLink,
    LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import {
    NavLink as RouterNavLink,
    NavLinkProps as RouterNavLinkProps,
} from "react-router";

type Props = Omit<ChakraLinkProps, "as"> & RouterNavLinkProps;

export const RouterLink = forwardRef<HTMLAnchorElement, Props>(
    ({ children, ...props }, ref) => {
        return (
            <ChakraLink as={RouterNavLink} ref={ref} {...props}>
                {children}
            </ChakraLink>
        );
    }
);

RouterLink.displayName = "RouterLink";

export default RouterLink;
