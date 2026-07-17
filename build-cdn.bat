@echo off
rem 一鍵發佈:重建 CDN 資產 → 複製到 baijing-assets → push GitHub → purge jsDelivr
cd /d "%~dp0"
set ASSET=C:\Users\user\baijing-assets

node build-cdn.js
if errorlevel 1 ( echo. & echo build-cdn 失敗,請看上方訊息 & pause & exit /b 1 )

if not exist "%ASSET%" ( echo. & echo 找不到資產 repo:%ASSET% & pause & exit /b 1 )
copy /Y dist\site.css "%ASSET%\site.css" >nul
copy /Y dist\site.js  "%ASSET%\site.js"  >nul

pushd "%ASSET%"
git add -A
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Update compiled assets"
  git push
  echo.
  echo 已 push 資產,請求 jsDelivr purge...
  curl -s "https://purge.jsdelivr.net/gh/Raffertyxu/baijing-assets@main/site.css" >nul
  curl -s "https://purge.jsdelivr.net/gh/Raffertyxu/baijing-assets@main/site.js" >nul
  echo 完成。網站約數分鐘內更新。
) else (
  echo.
  echo 資產沒有變動,略過 push。
)
popd
pause
