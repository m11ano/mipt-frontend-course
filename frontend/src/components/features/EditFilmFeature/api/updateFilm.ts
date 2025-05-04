import { FilmFormEntityState } from "@/components/entities/FilmFormEntity/model/types/types";
import { FilmItem } from "@/domain/film/types/types";
import axios from "axios";

export async function updateFilm(id: number, data: FilmFormEntityState): Promise<FilmItem> {
    if (typeof data.file === "string") {
        data.file = null;
    }
    const result = await axios.put<FilmItem>(`${import.meta.env.VITE_API_URL}/films/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return result.data;
}
