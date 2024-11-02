docker-compose down

docker build -t backend-todo:latest ./backend
docker build -t frontend-todo:latest ./frontend

docker-compose up --build --force-recreate --remove-orphans