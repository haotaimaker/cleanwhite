@echo off
rem 一鍵發佈:重建資產 → 提交目前 cleanwhite repo → push GitHub
cd /d "%~dp0"

node build-cdn.js
if errorlevel 1 ( echo. & echo build-cdn 失敗,請看上方訊息 & pause & exit /b 1 )

git add -A
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Update site source and compiled assets"
  git push
  echo.
  echo 已 push 第一階段，重新產生固定 CDN 版本...
  node build-cdn.js
  git add build-cdn.js deploy\1-自訂CSS.txt deploy\2-自訂JavaScript.txt
  git diff --cached --quiet
  if errorlevel 1 (
    git commit -m "Pin deployment assets to published build"
    git push
  )
  echo 完成。部署欄位已鎖定到最新 commit。
) else (
  echo.
  echo 來源與產物沒有變動,略過 push。
)
pause
