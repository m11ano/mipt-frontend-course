import { FilmItem } from "@/domain/film/types/types";
import axios, { AxiosError } from "axios";

export async function fetchFilm(id: number): Promise<FilmItem> {
    try {
        const result = await axios.get<FilmItem>(
            `${import.meta.env.VITE_API_URL}/films/${id}`
        );
        return result.data;
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw e;
        }
        throw e;
    }
}
