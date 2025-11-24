# Ecommerce API

[![Build Status](https://github.com/edgar320/ecommerce-api/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/edgar320/ecommerce-api/actions/workflows/ci.yml)
[![Docker](https://img.shields.io/badge/docker-latest-blue)](https://github.com/edgar320/ecommerce-api/pkgs/container/ecommerce-api)
[![Node](https://img.shields.io/badge/node-v18-green)](https://nodejs.org/en/)
[![Coverage](https://img.shields.io/badge/coverage-0%25-red)](https://github.com/edgar320/ecommerce-api) <!-- Actualiza cuando tengas reporte de cobertura -->

Proyecto de ejemplo para la gestión de pedidos con Docker, Kubernetes y Terraform.
Incluye pipeline CI/CD completo, scripts de despliegue y pruebas automatizadas.

---

## Descripción

`ecommerce-api` es un proyecto de ejemplo para gestionar pedidos, con soporte para:

* **Docker:** Construcción y despliegue de contenedores.
* **Kubernetes:** Orquestación y despliegue en entornos `staging` y `production`.
* **Terraform:** Automatización de la creación de namespaces y recursos en K8s.
* **CI/CD:** Scripts para pruebas, promoción de builds y despliegue.

---

## Requisitos

* Node.js >= 18
* Docker Desktop
* Kubernetes (Docker Desktop o Minikube)
* Terraform >= 1.5
* Git

---

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/edgar320/ecommerce-api.git
cd ecommerce-api

# Instalar dependencias de Node.js
npm install
```

---

## Pruebas y Validación

### Probar Localmente

```bash
npm test
npm start
```

### Probar con Docker

```bash
docker build -f docker/Dockerfile -t ecommerce-api:test .
docker run -p 3000:3000 ecommerce-api:test
```

### Probar en Kubernetes

```bash
kubectl get pods -n staging
kubectl logs -n staging deployment/api-deployment
kubectl port-forward -n staging service/api-service 3000:80
# Abrir en navegador
http://localhost:3000/health
```

### Ejecutar Smoke Tests

```bash
cd deploy
smoke-tests.bat
```

---

## Monitoreo

### Ver Logs

```bash
kubectl logs -f -n staging deployment/api-deployment
kubectl logs -n staging -l app=ecommerce-api --all-containers
```

### Verificar Estado de Pods

```bash
kubectl get pods -n staging -w
kubectl describe pod <POD-NAME> -n staging
```

### Métricas Básicas

```bash
kubectl top pods -n staging
kubectl get events -n staging --sort-by='.lastTimestamp'
```

---

## Comandos Útiles de Referencia

### Git

```bash
git status
git add .
git commit -m "mensaje"
git push
git pull
```

### Docker

```bash
docker ps
docker images
docker logs <container-id>
docker exec -it <container-id> sh
docker system prune -a
```

### Kubernetes

```bash
kubectl get all -n staging
kubectl describe deployment api-deployment -n staging
kubectl rollout restart deployment/api-deployment -n staging
kubectl rollout undo deployment/api-deployment -n staging
```

### NPM

```bash
npm install
npm test
npm start
npm run dev
```

* Implementar estrategia de despliegue Canary
* Documentar APIs con Swagger
