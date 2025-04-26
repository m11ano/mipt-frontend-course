import { FilmListItem } from "@/store/types/types";

export interface FilmFavoriteCardEntityProps {
    data: FilmListItem;
    onDelete: (id: number) => void;
}
