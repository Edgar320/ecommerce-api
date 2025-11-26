@echo off
echo Promoting build to next environment...

set /p TAG="Enter image tag to promote: "

:: Verifica si la imagen existe localmente
docker images ecommerce-api:%TAG% | find "%TAG%" >nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: The local image ecommerce-api:%TAG% does not exist.
    echo Make sure you built it first.
    exit /b 1
)

:: Tag completo en GHCR (todo en minúsculas)
docker tag ecommerce-api:%TAG% ghcr.io/edgar320/ecommerce-api:promoted

if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to tag image.
    exit /b 1
)

:: Push a GHCR
docker push ghcr.io/edgar320/ecommerce-api:promoted

if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to push to GHCR. Did you login?
    echo Run: echo TOKEN | docker login ghcr.io -u edgar320 --password-stdin
    exit /b 1
)

echo Build promoted successfully!