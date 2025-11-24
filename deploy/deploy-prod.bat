@echo off
echo Deploying to production environment...

set /p CONFIRM="Are you sure you want to deploy to production? (yes/no): "
if not "%CONFIRM%"=="yes" (
    echo Deployment cancelled.
    exit /b
)

kubectl apply -f ..\infra\k8s\production\

echo Waiting for rollout...
kubectl rollout status deployment/api-deployment -n production

echo Production deployment complete!
