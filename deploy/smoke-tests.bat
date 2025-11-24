@echo off
echo Running smoke tests...

set API_URL=http://localhost:3000

curl -f %API_URL%/health || exit /b 1
echo Health check: PASSED

curl -f %API_URL%/api/orders || exit /b 1
echo Orders endpoint: PASSED

echo All smoke tests passed!
