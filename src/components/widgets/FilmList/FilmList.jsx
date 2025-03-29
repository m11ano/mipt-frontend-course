import FilmCard from "../../entities/FilmCard/FilmCard";

export default function FilmList() {
    return (
        <>
            <div>
                {Array.from({ length: 10 }).map((_, i) => (
                    <FilmCard key={i} />
                ))}
            </div>
        </>
    );
}
