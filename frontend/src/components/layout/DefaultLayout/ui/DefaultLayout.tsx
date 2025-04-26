import "@/assets/styles/layout/DefaultLayout.css";

import { FooterWidget } from "@/components/widgets/FooterWidget";
import { HeaderWidget } from "@/components/widgets/HeaderWidget";
import { Outlet } from "react-router";

export default function DefaultLayout({ children }: React.PropsWithChildren) {
    return (
        <>
            <HeaderWidget />
            <main>
                <Outlet />
                {children}
            </main>
            <FooterWidget />
        </>
    );
}
