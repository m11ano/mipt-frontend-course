import { FilmFormEntity } from '@/components/entities/FilmFormEntity'
import { FilmFormEntityState } from '@/components/entities/FilmFormEntity/model/types/types'
import { Box } from '@chakra-ui/react'

export default function AddFilmFeature() {
	const onSend = async (data: FilmFormEntityState) => {
		console.log('Создаем новый фильм', data)
	}

	return (
		<Box maxWidth='770px' margin='0 auto'>
			<FilmFormEntity onSend={onSend} />
		</Box>
	)
}
