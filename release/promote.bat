@echo off
echo Promoting build to next environment...

set /p TAG="Enter image tag to promote: "

:: Crea un tag completo apuntando al repositorio de GitHub Container Registry
docker tag ecommerce-api:%TAG% ghcr.io/edgar320/ecommerce-api:promoted

:: Sube el tag al GHCR
docker push ghcr.io/edgar320/ecommerce-api:promoted

echo Build promoted successfully!
