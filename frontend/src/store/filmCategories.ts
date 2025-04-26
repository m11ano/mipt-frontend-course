export interface IFilmCategory {
    id: number;
    name: string;
    color: string;
    bgColor: string;
}

export const filmCategories: IFilmCategory[] = [
    {
        id: 1,
        name: "Боевик",
        color: "#ea580b",
        bgColor: "#fcf1ec",
    },
    {
        id: 2,
        name: "Триллер",
        color: "#17a34a",
        bgColor: "#e9f6e9",
    },
    {
        id: 3,
        name: "Комедия",
        color: "#2463eb",
        bgColor: "#f0eef9",
    },
    {
        id: 4,
        name: "Драма",
        color: "#18181b",
        bgColor: "#f2f1f1",
    },
];
