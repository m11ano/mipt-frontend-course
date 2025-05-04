import { FilmItem } from "@/domain/film/types/types";
import axios, { AxiosError } from "axios";

export async function deleteFilm(id: number): Promise<void> {
    try {
        await axios.delete<FilmItem>(`${import.meta.env.VITE_API_URL}/films/${id}`);
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw e;
        }
        throw e;
    }
}
