import { createBrowserRouter } from "react-router";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { MainPage } from "@/components/pages/MainPage";
import { FilmPage } from "@/components/pages/FilmPage";
import { FavoritesPage } from "@/components/pages/FavoritesPage";
import { ErrorPage } from "@/components/pages/ErrorPage";
import { FilmNewPage } from "@/components/pages/FilmNewPage";
import { FilmEditPage } from "@/components/pages/FilmEditPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: DefaultLayout,
        errorElement: (
            <DefaultLayout>
                <ErrorPage />
            </DefaultLayout>
        ),
        children: [
            {
                index: true,
                Component: MainPage,
            },
            {
                path: "favorites",
                Component: FavoritesPage,
            },
            {
                path: "film/:id",
                Component: FilmPage,
            },
            {
                path: "newFilm",
                Component: FilmNewPage,
            },
            {
                path: "film/:id/edit",
                Component: FilmEditPage,
            },
        ],
    },
]);
