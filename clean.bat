@echo off
echo Cleaning Next.js cache...
if exist .next (
  rmdir /s /q .next
  echo .next directory removed.
)
echo Done!
pause
