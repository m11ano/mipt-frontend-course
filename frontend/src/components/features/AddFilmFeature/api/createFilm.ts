import { FilmFormEntityState } from "@/components/entities/FilmFormEntity/model/types/types";
import { FilmItem } from "@/domain/film/types/types";
import axios from "axios";

export async function createFilm(data: FilmFormEntityState): Promise<FilmItem> {
    const result = await axios.post<FilmItem>(`${import.meta.env.VITE_API_URL}/films`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return result.data;
}
