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
import {
	Controller,
	SubmitHandler,
	useController,
	useForm,
} from 'react-hook-form'
import { GoFile } from 'react-icons/go'
import { FilmFormEntityProps, FilmFormEntityState } from '../model/types/types'

export default function FilmFormEntity({ state, onSend }: FilmFormEntityProps) {
	const initState = {
		categories: [],
		name: '',
		duration: 0,
		description: '',
		file: null,
		...state,
	}

	const isEdit = !!state

	const {
		register,
		setValue,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FilmFormEntityState>({
		defaultValues: initState,
	})

	const categoriesController = useController({
		control,
		name: 'categories',
		defaultValue: [],
		rules: {
			validate: value => value.length > 0 || 'Выберите хотя бы одну категорию',
		},
	})

	const onSubmit: SubmitHandler<FilmFormEntityState> = async data => {
		await onSend(data)
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
								<Box flex={5} overflow='hidden'>
									<Controller
										name='file'
										control={control}
										rules={{ required: 'Фото обязательно' }}
										render={({ field }) => (
											<Flex alignItems='center'>
												<Box width='50%'>
													<FileUpload.Root accept={['image/png', 'image/jpeg']}>
														<FileUpload.HiddenInput
															onChange={(
																e: React.ChangeEvent<HTMLInputElement>
															) => {
																if (e.target.files) {
																	setValue('file', e.target.files[0])
																} else {
																	setValue('file', null)
																}
															}}
														/>
														<FileUpload.Trigger asChild>
															<Button bgColor='#DEDEDE' size='lg' color='#000'>
																Выбрать файл
															</Button>
														</FileUpload.Trigger>
													</FileUpload.Root>
												</Box>
												{field.value && (
													<Box width='50%'>
														<Flex
															height='44px'
															padding='0 15px'
															border='1px solid #e4e4e7'
															borderRadius='0.25rem'
															alignItems='center'
															gap='10px'
														>
															<Box flexShrink={0}>
																<GoFile />
															</Box>
															<Box
																width='100%'
																overflow='hidden'
																whiteSpace='nowrap'
															>
																{field.value instanceof File
																	? field.value.name
																	: field.value}
															</Box>
														</Flex>
													</Box>
												)}
											</Flex>
										)}
									/>
									{errors.file && (
										<Field.ErrorText>{errors.file.message}</Field.ErrorText>
									)}
								</Box>
							</Field.Root>
						</Fieldset.Content>
					</Fieldset.Root>
				</Card.Body>
				<Card.Footer marginTop='40px'>
					<Button type='submit' margin='0 auto' size='lg' bgColor='#4A61DD'>
						{isEdit ? 'Сохранить' : 'Добавить фильм'}
					</Button>
				</Card.Footer>
			</Card.Root>
		</form>
	)
}
