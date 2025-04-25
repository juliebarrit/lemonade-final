# Recovering Your Git Changes

It appears you've made local commits that haven't been pushed to GitHub, and then pulled changes from GitHub which has caused a divergence in your branches.

## Current Situation
- You made local changes and committed them to your local branch
- Your local branch (webshop) and remote branch (origin/webshop) have diverged
- Each has one different commit

## Quick Recovery Steps

### Option 1: Force Push Your Local Changes (Recommended if your local changes are most important)

```bash
# Push your local commits forcefully to GitHub (overwrites remote)
git push -f origin webshop
```

This will make GitHub match your local repository exactly, discarding any changes that existed only on GitHub.

### Option 2: Create a Recovery Branch

If you're not sure about force pushing and want to preserve both versions:

```bash
# Create and switch to a new branch with your current changes
git branch recovery-branch
git checkout recovery-branch

# Push this new branch to GitHub
git push origin recovery-branch
```

This preserves your changes in a separate branch that you can later merge or compare.

### Option 3: View the Specific Changes and Manually Recover

```bash
# See what commits are different between local and remote
git log --oneline origin/webshop..webshop

# View the specific changes in your commit
git show d6fd053

# Switch back to the previous state before the pull
git reflog
# Find the commit hash from before the problematic pull
git reset --hard [commit-hash]
```

## For Future Reference

To avoid this situation in the future:

1. Always commit your local changes before pulling
2. Use `git pull --rebase` instead of `git pull` to avoid merge commits
3. Consider using a graphical Git client that shows branches visually

## Need More Help?

Run the included `git-recovery.bat` file for an interactive guide through these options.
