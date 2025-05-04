import axios from "axios";

export async function setFilmIsFavorite(
    id: number,
    value: boolean,
    signal?: AbortSignal
) {
    await axios.request({
        method: value ? "POST" : "DELETE",
        url: `${import.meta.env.VITE_API_URL}/films/${id}/favorite`,
        signal,
    });
}
