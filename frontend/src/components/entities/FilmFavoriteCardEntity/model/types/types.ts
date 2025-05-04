import { FilmListItem } from "@/domain/film/types/types";

export interface FilmFavoriteCardEntityProps {
    data: FilmListItem;
    onDelete: (id: number) => void;
}
