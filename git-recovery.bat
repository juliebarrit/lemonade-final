@echo off
echo ======================================
echo Git Recovery Tool
echo ======================================
echo.

echo Step 1: View current branch status
git status
echo.

echo Step 2: View commit history to identify your commit
git log --oneline -n 5
echo.

echo Step 3: Your options are:
echo.
echo Option A: Force push your changes (overwrites remote)
echo   git push -f origin webshop
echo.
echo Option B: Create a new branch with your changes
echo   git branch recovery-branch
echo   git checkout recovery-branch
echo   git push origin recovery-branch
echo.
echo Option C: Merge the changes
echo   git pull --no-commit
echo   [resolve conflicts manually]
echo   git add .
echo   git commit -m "Merged changes"
echo   git push origin webshop
echo.
echo Option D: Reset to your last commit before the pull
echo   git reflog
echo   [find your commit hash]
echo   git reset --hard [commit-hash]
echo   git push -f origin webshop
echo.
echo ======================================
echo.
pause
