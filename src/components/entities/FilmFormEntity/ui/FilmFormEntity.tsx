import { filmCategories } from '@/store/filmCategories'
import {
	Box,
	Button,
	Card,
	Checkbox,
	CheckboxGroup,
	Field,
	Fieldset,
	FileUpload,
	Flex,
	Input,
	NumberInput,
	Text,
	Textarea,
} from '@chakra-ui/react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'

type Inputs = {
	name: string
	duration: number
	description?: string
	file: FileList
	categories: string[]
}

export default function FilmFormEntity() {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const categoriesController = useController({
		control,
		name: 'categories',
		defaultValue: [],
		rules: {
			validate: value => value.length > 0 || 'Выберите хотя бы одну категорию',
		},
	})

	const onSubmit: SubmitHandler<Inputs> = data => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card.Root
				padding={'50px 70px'}
				boxShadow='0px 2px 2px 0px rgba(0, 0, 0, 0.25)'
				borderRadius={16}
			>
				<Card.Body>
					<Fieldset.Root>
						<Fieldset.Content gap='40px'>
							<Field.Root orientation='horizontal' invalid={!!errors.name}>
								<Field.Label fontSize={16} fontWeight={400} flex={3}>
									Название фильма
								</Field.Label>
								<Box flex={5}>
									<Input
										{...register('name', { required: 'Название обязательно' })}
									/>
									{errors.name && (
										<Field.ErrorText>{errors.name.message}</Field.ErrorText>
									)}
								</Box>
							</Field.Root>

							<Flex gap='6px' align='flex-start'>
								<Box flex={3} fontSize={16} fontWeight={400} marginTop='6px'>
									Категории
								</Box>
								<Box flex={5}>
									<CheckboxGroup
										invalid={!!errors.categories}
										value={categoriesController.field.value}
										onValueChange={categoriesController.field.onChange}
										name={categoriesController.field.name}
									>
										<Fieldset.Root invalid={!!errors.categories}>
											<Fieldset.Content
												gap='20px'
												display='flex'
												flexDir='row'
												flexWrap='wrap'
											>
												{filmCategories.map(category => (
													<Checkbox.Root
														key={String(category.id)}
														value={String(category.id)}
													>
														<Checkbox.HiddenInput />
														<Checkbox.Control
															borderRadius='full'
															width='24px'
															height='24px'
															borderColor={category.color}
															_checked={{ bg: category.color }}
														/>
														<Checkbox.Label fontSize={16} fontWeight={500}>
															{category.name}
														</Checkbox.Label>
													</Checkbox.Root>
												))}
											</Fieldset.Content>
										</Fieldset.Root>
									</CheckboxGroup>
									{errors.categories && (
										<Text color='red.500' fontSize='xs' marginTop='4px'>
											{errors.categories.message}
										</Text>
									)}
								</Box>
							</Flex>

							<Field.Root orientation='horizontal' invalid={!!errors.duration}>
								<Field.Label fontSize={16} fontWeight={400} flex={3}>
									Длительность
								</Field.Label>
								<Box flex={5}>
									<Flex alignItems='center' gap='10px'>
										<NumberInput.Root defaultValue='0' width='84px'>
											<NumberInput.Control />
											<NumberInput.Input
												{...register('duration', {
													min: { value: 1, message: 'Длительность не указана' },
												})}
											/>
										</NumberInput.Root>
										<Box>мин.</Box>
									</Flex>
									{errors.duration && (
										<Field.ErrorText>{errors.duration.message}</Field.ErrorText>
									)}
								</Box>
							</Field.Root>

							<Field.Root
								orientation='horizontal'
								alignItems='flex-start'
								invalid={!!errors.description}
							>
								<Field.Label
									fontSize={16}
									fontWeight={400}
									flex={3}
									marginTop='6px'
								>
									Описание
								</Field.Label>
								<Box flex={5}>
									<Textarea
										height='184px'
										{...register('description', {
											required: 'Описание обязательно',
										})}
									/>
									{errors.description && (
										<Field.ErrorText>
											{errors.description.message}
										</Field.ErrorText>
									)}
								</Box>
							</Field.Root>

							<Field.Root orientation='horizontal' invalid={!!errors.file}>
								<Field.Label fontSize={16} fontWeight={400} flex={3}>
									Загрузить фото
								</Field.Label>
								<Box flex={5}>
									<FileUpload.Root accept={['image/png', 'image/jpeg']}>
										<FileUpload.HiddenInput
											{...register('file', { required: 'Фото обязательно' })}
										/>
										<FileUpload.Trigger asChild>
											<Button bgColor='#DEDEDE' size='lg' color='#000'>
												Выбрать файл
											</Button>
										</FileUpload.Trigger>
										<FileUpload.List />
									</FileUpload.Root>
									{errors.description && (
										<Field.ErrorText>
											{errors.description.message}
										</Field.ErrorText>
									)}
								</Box>
							</Field.Root>
						</Fieldset.Content>
					</Fieldset.Root>
				</Card.Body>
				<Card.Footer marginTop='40px'>
					<Button type='submit' margin='0 auto' size='lg' bgColor='#4A61DD'>
						Добавить фильм
					</Button>
				</Card.Footer>
			</Card.Root>
		</form>
	)
}
