import { filmCategories } from "@/store/filmCategories";
import {
    Box,
    Button,
    Card,
    Checkbox,
    Field,
    Fieldset,
    FileUpload,
    Flex,
    Input,
    Textarea,
} from "@chakra-ui/react";

export default function FilmFormEntity() {
    return (
        <Card.Root
            padding={"50px 70px"}
            boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25)"
            borderRadius={16}
        >
            <Card.Body>
                <Fieldset.Root>
                    <Fieldset.Content gap="40px">
                        <Field.Root orientation="horizontal">
                            <Field.Label
                                fontSize={16}
                                fontWeight={400}
                                flex={3}
                            >
                                Название фильма
                            </Field.Label>
                            <Box flex={5}>
                                <Input name="name" />
                            </Box>
                        </Field.Root>

                        <Field.Root orientation="horizontal">
                            <Field.Label
                                fontSize={16}
                                fontWeight={400}
                                flex={3}
                            >
                                Жанр
                            </Field.Label>
                            <Flex flex={5} gap="20px 30px" flexWrap="wrap">
                                {filmCategories.map((category) => (
                                    <Checkbox.Root key={category.id}>
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control
                                            borderRadius={"full"}
                                            width="24px"
                                            height="24px"
                                            borderColor={category.color}
                                            _checked={{
                                                bg: category.color,
                                            }}
                                        />
                                        <Checkbox.Label
                                            fontSize={16}
                                            fontWeight={500}
                                        >
                                            {category.name}
                                        </Checkbox.Label>
                                    </Checkbox.Root>
                                ))}
                            </Flex>
                        </Field.Root>

                        <Field.Root orientation="horizontal">
                            <Field.Label
                                fontSize={16}
                                fontWeight={400}
                                flex={3}
                            >
                                Длительность
                            </Field.Label>
                            <Box flex={5}>
                                <Input
                                    name="duration"
                                    width="84px"
                                    marginRight="10px"
                                />
                                мин.
                            </Box>
                        </Field.Root>

                        <Field.Root
                            orientation="horizontal"
                            alignItems="flex-start"
                        >
                            <Field.Label
                                fontSize={16}
                                fontWeight={400}
                                flex={3}
                                marginTop="6px"
                            >
                                Описание
                            </Field.Label>
                            <Box flex={5}>
                                <Textarea name="description" height="184px" />
                            </Box>
                        </Field.Root>

                        <Field.Root orientation="horizontal">
                            <Field.Label
                                fontSize={16}
                                fontWeight={400}
                                flex={3}
                            >
                                Загрузить фото
                            </Field.Label>
                            <Box flex={5}>
                                <FileUpload.Root
                                    accept={["image/png", "image/jpeg"]}
                                >
                                    <FileUpload.HiddenInput />
                                    <FileUpload.Trigger asChild>
                                        <Button
                                            bgColor="#DEDEDE"
                                            size="lg"
                                            color="#000"
                                        >
                                            Выбрать файл
                                        </Button>
                                    </FileUpload.Trigger>
                                    <FileUpload.List />
                                </FileUpload.Root>
                            </Box>
                        </Field.Root>
                    </Fieldset.Content>
                </Fieldset.Root>
            </Card.Body>
            <Card.Footer marginTop="40px">
                <Button
                    type="submit"
                    margin="0 auto"
                    size="lg"
                    bgColor="#4A61DD"
                >
                    Добавить фильм
                </Button>
            </Card.Footer>
        </Card.Root>
    );
}
