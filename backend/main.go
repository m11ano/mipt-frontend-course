package main

import (
	"mime/multipart"
	"strings"

	"github.com/disintegration/imaging"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/google/uuid"

	"fmt"
	"os"
	"path/filepath"
	"strconv"
)

type FilmItem struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	FullImageUrl string `json:"fullImageUrl"`
	ImageUrl     string `json:"imageUrl"`
	Categories   []int  `json:"categories"`
	Duration     int    `json:"duration"`
	Description  string `json:"description"`
	IsFavorite   bool   `json:"isFavorite"`
}

var apiPrefix = GetenvWithDefault("API_PREFIX", "/api")
var serverUrl = GetenvWithDefault("DOMAIN_URI", "http://127.0.0.1"+GetenvWithDefault("HTTP_PORT", ":3001")+apiPrefix)

var (
	films = []FilmItem{
		{ID: 1, Name: "Матрица", ImageUrl: serverUrl + "/uploads/1-preview.png", FullImageUrl: serverUrl + "/uploads/1-img.png", Categories: []int{1}, Duration: 136, Description: `«Матрица» — научно-фантастический боевик, поставленный братьями Вачовски по собственному сценарию и спродюсированный Джоэлом Сильвером. Главные роли исполнили Киану Ривз, Лоренс Фишберн,Керри-Энн Мосс и Хьюго Уивинг. Фильм вышел на экраны в США 31 марта 1999 года и послужил созданию одноимённой медиафраншизы, в которую вошли ещё три фильма, комиксы, компьютерные игры и аниме. Фильм изображает будущее, в котором реальность, существующая для большинства людей, является в действительности симуляцией типа «мозг в колбе»,созданной разумными машинами, чтобы подчинить и усмирить человеческое население, в то время как тепло и электрическая активность их тел используются машинами в качестве источника энергии. Привлечённый повстанцами против машин хакер по кличке Нео оказывается в новом, пугающем реальном мире. Он проходит выбор — вернуться к существованию в симуляции, либо начать повстанческую борьбу против машин, в которую также вовлечены другие люди, освободившиеся из «мира снов» и выбравшиеся в реальность. Он выбирает борьбу.`},
		{ID: 2, Name: "Безумный Макс", ImageUrl: serverUrl + "/uploads/2-preview.png", FullImageUrl: serverUrl + "/uploads/2-img.png", Categories: []int{1}, Duration: 120, Description: `Преследуемый призраками прошлого Макс уверен, что лучший способ выжить — скитаться в одиночестве. Но он попадает в плен и вынужденно присоединяется к бунтарям, бегущим через пустыню от тирании Несмертного Джо. Они забрали у него кое-что очень ценное, и разъярённый диктатор бросает все силы в погоню за мятежниками.`},
		{ID: 3, Name: "Джентельмены", ImageUrl: serverUrl + "/uploads/3-preview.png", FullImageUrl: serverUrl + "/uploads/3-img.png", Categories: []int{4}, Duration: 113, Description: `Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца, и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей лондонского криминального мира — партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.`},
		{ID: 4, Name: "Отступники", ImageUrl: serverUrl + "/uploads/4-preview.png", FullImageUrl: serverUrl + "/uploads/4-img.jpg", Categories: []int{2}, Duration: 151, Description: `Два лучших выпускника полицейской академии оказались по разные стороны баррикады: один из них — агент мафии в рядах правоохранительных органов, другой — «крот», внедрённый в мафию. Каждый считает своим долгом обнаружить и уничтожить противника.`},
		{ID: 5, Name: "Гладиатор", ImageUrl: serverUrl + "/uploads/5-preview.png", FullImageUrl: serverUrl + "/uploads/5-img.png", Categories: []int{1}, Duration: 155, Description: `Римская империя. Бесстрашного и благородного генерала Максимуса боготворят солдаты, а старый император Марк Аврелий безгранично доверяет ему и относится как к сыну. Однако опытный воин, готовый сразиться с любым противником в честном бою, оказывается бессильным перед коварными придворными интригами. Коммод, сын Марка Аврелия, убивает отца, который планировал сделать преемником не его, а Максимуса, и захватывает власть. Решив избавиться от опасного соперника, который к тому же отказывается присягнуть ему на верность, Коммод отдаёт приказ убить Максимуса и всю его семью. Чудом выжив, но не сумев спасти близких, Максимус попадает в плен к работорговцу, который продаёт его организатору гладиаторских боёв Проксимо. Так легендарный полководец становится гладиатором. Но вскоре ему представится шанс встретиться со своим смертельным врагом лицом к лицу.`},
		{ID: 6, Name: "Однажды в Голливуде", ImageUrl: serverUrl + "/uploads/6-preview.png", FullImageUrl: serverUrl + "/uploads/6-img.jpg", Categories: []int{4}, Duration: 161, Description: `1969 год, золотой век Голливуда уже закончился. Известный актёр Рик Далтон и его дублер Клифф Бут пытаются найти свое место в стремительно меняющемся мире киноиндустрии.`},
		{ID: 7, Name: "Предложение", ImageUrl: serverUrl + "/uploads/7-preview.png", FullImageUrl: serverUrl + "/uploads/7-img.jpg", Categories: []int{3}, Duration: 60, Description: `История создания культового фильма «Крестный отец».`},
		{ID: 8, Name: "Малышка на миллион", ImageUrl: serverUrl + "/uploads/8-preview.png", FullImageUrl: serverUrl + "/uploads/8-img.jpg", Categories: []int{4}, Duration: 132, Description: `Тренеру по боксу Фрэнку Данну так и не удалось воспитать чемпиона. Он владеет спортивным залом в Лос-Анджелесе, где всё ещё проводит тренировки. Дочь не отвечает на его письма, а его лучший боец подписал контракт с другим менеджером. Неожиданно в жизни Фрэнка появляется Мэгги Фицжеральд, 31-летняя официантка, мечтающая стать боксером. Фрэнк не желает тренировать женщину, но упорство Мэгги заставляет его передумать. Впереди - их главное сражение, требующее собрать в кулак всю волю и мужество.`},
		{ID: 9, Name: "Ларри Краун", ImageUrl: serverUrl + "/uploads/9-preview.png", FullImageUrl: serverUrl + "/uploads/9-img.jpg", Categories: []int{3}, Duration: 98, Description: `До своего увольнения приветливый и любезный Ларри Краун был преуспевающим командным руководителем крупной компании, в которой он работал после службы на флоте. Под тяжестью ипотеки и будучи в неясности от того, что делать с внезапно появившимися свободными днями, Ларри направляется в местный колледж, чтобы начать все сначала.`},
	}
	nextID = 10
)

func GetenvWithDefault(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func main() {
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "*",
	}))

	apiGroup := app.Group(apiPrefix)

	// Статика для загруженных файлов
	apiGroup.Static("/uploads", "./uploads")

	// CRUD роуты
	apiGroup.Get("/films", listFilms)
	app.Get("/films/favorites", listFilmsFavorites)
	apiGroup.Get("/films/:id", getFilm)
	apiGroup.Post("/films/:id/favorite", addFilmToFavorites)
	apiGroup.Delete("/films/:id/favorite", deleteFilmToFavorites)
	apiGroup.Post("/films", createFilm)
	apiGroup.Put("/films/:id", updateFilm)
	apiGroup.Delete("/films/:id", deleteFilm)

	// Создаём папки если нет
	_ = os.MkdirAll("uploads", os.ModePerm)
	_ = os.MkdirAll("films", os.ModePerm)

	app.Listen(GetenvWithDefault("HTTP_PORT", ":3001"))
}

func listFilms(c *fiber.Ctx) error {
	return c.JSON(films)
}

func listFilmsFavorites(c *fiber.Ctx) error {
	filmsFavorites := []FilmItem{}
	for _, film := range films {
		if film.IsFavorite {
			filmsFavorites = append(filmsFavorites, film)
		}
	}
	return c.JSON(filmsFavorites)
}

func getFilm(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	for _, film := range films {
		if film.ID == id {
			return c.JSON(film)
		}
	}
	return c.SendStatus(fiber.StatusNotFound)
}

func addFilmToFavorites(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	for idx, film := range films {
		if film.ID == id {
			films[idx].IsFavorite = true
			return c.SendStatus(fiber.StatusOK)
		}
	}
	return c.SendStatus(fiber.StatusNotFound)
}

func deleteFilmToFavorites(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	for idx, film := range films {
		if film.ID == id {
			films[idx].IsFavorite = false
			return c.SendStatus(fiber.StatusOK)
		}
	}
	return c.SendStatus(fiber.StatusNotFound)
}

func createFilm(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Невозможно прочитать форму")
	}

	// Валидация name
	nameVals := form.Value["name"]
	if len(nameVals) == 0 || strings.TrimSpace(nameVals[0]) == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Поле name обязательно")
	}
	name := nameVals[0]

	// Валидация description
	descriptionVals := form.Value["description"]
	if len(descriptionVals) == 0 || strings.TrimSpace(descriptionVals[0]) == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Поле description обязательно")
	}
	description := descriptionVals[0]

	// Валидация duration
	durationVals := form.Value["duration"]
	if len(durationVals) == 0 {
		return fiber.NewError(fiber.StatusBadRequest, "Поле duration обязательно")
	}
	duration, err := strconv.Atoi(durationVals[0])
	if err != nil || duration <= 0 {
		return fiber.NewError(fiber.StatusBadRequest, "Поле duration должно быть положительным числом")
	}

	// Валидация categories
	categoriesVals := form.Value["categories[]"]
	if len(categoriesVals) == 0 {
		return fiber.NewError(fiber.StatusBadRequest, "Поле categories обязательно")
	}
	categories := []int{}
	for _, catStr := range categoriesVals {
		cat, err := strconv.Atoi(catStr)
		if err != nil {
			return fiber.NewError(fiber.StatusBadRequest, "Некорректный формат категории")
		}
		categories = append(categories, cat)
	}

	// Валидация image
	imageHeaders := form.File["file"]
	if len(imageHeaders) == 0 {
		return fiber.NewError(fiber.StatusBadRequest, "Файл file обязателен")
	}
	fileHeader := imageHeaders[0]

	// Сохранение изображения
	imgPath960, imgPath700, err := saveImage(fileHeader)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Ошибка при сохранении изображения")
	}

	// Создание и возврат фильма
	film := FilmItem{
		ID:           nextID,
		Name:         name,
		ImageUrl:     serverUrl + "/uploads/" + filepath.Base(imgPath700),
		FullImageUrl: serverUrl + "/uploads/" + filepath.Base(imgPath960),
		Categories:   categories,
		Duration:     duration,
		Description:  description,
	}
	nextID++
	films = append(films, film)

	return c.Status(fiber.StatusCreated).JSON(film)
}

func updateFilm(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Некорректный ID")
	}

	var film *FilmItem
	for i := range films {
		if films[i].ID == id {
			film = &films[i]
			break
		}
	}
	if film == nil {
		return fiber.NewError(fiber.StatusNotFound, "Фильм не найден")
	}

	form, err := c.MultipartForm()
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Невозможно прочитать форму")
	}

	// Обновление name (если передан)
	if nameVals := form.Value["name"]; len(nameVals) > 0 {
		name := strings.TrimSpace(nameVals[0])
		if name == "" {
			return fiber.NewError(fiber.StatusBadRequest, "Поле name не может быть пустым")
		}
		film.Name = name
	}

	// Обновление description
	if descVals := form.Value["description"]; len(descVals) > 0 {
		description := strings.TrimSpace(descVals[0])
		if description == "" {
			return fiber.NewError(fiber.StatusBadRequest, "Поле description не может быть пустым")
		}
		film.Description = description
	}

	// Обновление duration
	if durationVals := form.Value["duration"]; len(durationVals) > 0 {
		duration, err := strconv.Atoi(durationVals[0])
		if err != nil || duration <= 0 {
			return fiber.NewError(fiber.StatusBadRequest, "Поле duration должно быть положительным числом")
		}
		film.Duration = duration
	}

	// Обновление categories
	if categoriesVals := form.Value["categories[]"]; len(categoriesVals) > 0 {
		categories := []int{}
		for _, catStr := range categoriesVals {
			cat, err := strconv.Atoi(catStr)
			if err != nil {
				return fiber.NewError(fiber.StatusBadRequest, "Некорректный формат категории")
			}
			categories = append(categories, cat)
		}
		film.Categories = categories
	}

	// Обновление изображения
	if imageHeaders := form.File["file"]; len(imageHeaders) > 0 {
		fileHeader := imageHeaders[0]
		imgPath960, imgPath700, err := saveImage(fileHeader)
		if err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, "Ошибка при сохранении изображения")
		}
		film.ImageUrl = serverUrl + "/uploads/" + filepath.Base(imgPath700)
		film.FullImageUrl = serverUrl + "/uploads/" + filepath.Base(imgPath960)
	}

	return c.Status(fiber.StatusOK).JSON(film)
}

func deleteFilm(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	newFilms := []FilmItem{}
	for _, film := range films {
		if film.ID != id {
			newFilms = append(newFilms, film)
		}
	}
	films = newFilms
	return c.SendStatus(fiber.StatusNoContent)
}

func saveImage(fileHeader *multipart.FileHeader) (string, string, error) {
	src, err := fileHeader.Open()
	if err != nil {
		return "", "", err
	}
	defer src.Close()

	img, err := imaging.Decode(src)
	if err != nil {
		return "", "", err
	}

	uid := uuid.New().String()

	// 960x960
	full := imaging.Fill(img, 960, 960, imaging.Center, imaging.Lanczos)
	path960 := fmt.Sprintf("uploads/%s_960x960.jpg", uid)
	err = imaging.Save(full, path960)
	if err != nil {
		return "", "", err
	}

	// 700x384
	thumb := imaging.Fill(img, 700, 384, imaging.Center, imaging.Lanczos)
	path700 := fmt.Sprintf("uploads/%s_700x384.jpg", uid)
	err = imaging.Save(thumb, path700)
	if err != nil {
		return "", "", err
	}

	return path960, path700, nil
}
