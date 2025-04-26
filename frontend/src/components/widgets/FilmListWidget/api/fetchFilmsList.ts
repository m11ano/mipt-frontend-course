import { FilmListItem } from "@/store/types/types";
import axios, { AxiosError } from "axios";

export async function fetchFilmsList(): Promise<FilmListItem[]> {
    try {
        const result = await axios.get<FilmListItem[]>(
            `${import.meta.env.VITE_API_URL}/films`
        );
        return result.data;
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw e;
        }
        throw e;
    }
}
