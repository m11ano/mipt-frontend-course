FROM golang:1.23-alpine AS builder

WORKDIR /app

COPY . .

RUN go mod download

RUN go build -o app main.go

FROM golang:1.23-alpine AS release

WORKDIR /app

COPY --from=builder /app/app .
COPY --from=builder /app/uploads ./uploads

CMD ["./app"]