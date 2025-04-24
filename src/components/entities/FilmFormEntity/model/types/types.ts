export interface FilmFormEntityState {
	name: string
	duration: number
	description: string
	file: File | string | null
	categories: string[]
}

export interface FilmFormEntityProps {
	state?: FilmFormEntityState
	onSend: (data: FilmFormEntityState) => Promise<void>
}
