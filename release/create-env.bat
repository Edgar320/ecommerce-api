@echo off
echo Creating release environment...

cd /d C:\Projects\ecommerce-api\infra\terraform
terraform init
terraform apply -auto-approve

echo Environment created successfully!
pause
