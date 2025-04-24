import { FilmFormEntity } from '@/components/entities/FilmFormEntity'
import { FilmFormEntityState } from '@/components/entities/FilmFormEntity/model/types/types'
import { Box } from '@chakra-ui/react'
import { EditFilmFeatureProps } from '../model/types/types'

export default function EditFilmFeature({ id }: EditFilmFeatureProps) {
	console.log('Редактируем фильм', id)

	const fakeFilm: FilmFormEntityState = {
		categories: ['1'],
		name: 'Матрица',
		duration: 100,
		description: 'Описание',
		file: 'file.jpg',
	}

	const onSend = async (data: FilmFormEntityState) => {
		console.log('Сохраняем изменения в фильме', data)
	}

	return (
		<Box maxWidth='770px' margin='0 auto'>
			<FilmFormEntity state={fakeFilm} onSend={onSend} />
		</Box>
	)
}
