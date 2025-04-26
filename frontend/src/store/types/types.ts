export interface FilmListItem {
    id: number;
    name: string;
    imageUrl: string;
    categories: number[];
    duration: number;
}

export interface FilmItem {
    id: number;
    name: string;
    fullImageUrl: string;
    categories: number[];
    duration: number;
    description: string;
}
