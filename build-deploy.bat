@echo off
rem 產生 1shop 上線用的兩個貼上檔(deploy 資料夾)。改完來源檔後點兩下即可。
cd /d "%~dp0"
node build-deploy.js
if errorlevel 1 (
  echo.
  echo 產生失敗,請檢查上方錯誤訊息
) else (
  echo.
  echo 已產生 deploy\1-global-head.html 與 deploy\2-one-page.html
  explorer "%~dp0deploy"
)
pause
