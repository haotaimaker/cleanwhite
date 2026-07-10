@echo off
rem 重新組裝 preview.html(改完任何來源檔後,點兩下這個檔案即可)
cd /d "%~dp0"
node build-preview.js
if errorlevel 1 (
  echo.
  echo 組裝失敗,請檢查上方錯誤訊息
) else (
  start "" preview.html
)
pause
