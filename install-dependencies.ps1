# Script para instalar las dependencias del proyecto

Write-Host "Instalando dependencias para la Plataforma de Inducción - Solutions and Payroll" -ForegroundColor Green

# Verificar si Node.js está instalado
try {
    $nodeVersion = node -v
    Write-Host "Node.js detectado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Node.js no está instalado o no está en el PATH." -ForegroundColor Red
    Write-Host "Por favor, instala Node.js desde https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar si npm está instalado
try {
    $npmVersion = npm -v
    Write-Host "npm detectado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: npm no está instalado o no está en el PATH." -ForegroundColor Red
    exit 1
}

# Instalar dependencias
Write-Host "\nInstalando dependencias del proyecto..." -ForegroundColor Cyan
try {
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "\n✅ Dependencias instaladas correctamente." -ForegroundColor Green
        
        Write-Host "\nPara iniciar el servidor de desarrollo, ejecuta:" -ForegroundColor Cyan
        Write-Host "npm run dev" -ForegroundColor Yellow
        
        Write-Host "\nPara construir la aplicación para producción, ejecuta:" -ForegroundColor Cyan
        Write-Host "npm run build" -ForegroundColor Yellow
    } else {
        Write-Host "\n❌ Error al instalar las dependencias." -ForegroundColor Red
    }
} catch {
    Write-Host "\n❌ Error al ejecutar npm install: $_" -ForegroundColor Red
}