@echo off
echo Deploying to staging environment...

kubectl apply -f ..\infra\k8s\staging\

echo Waiting for rollout...
kubectl rollout status deployment/api-deployment -n staging

echo Staging deployment complete!
