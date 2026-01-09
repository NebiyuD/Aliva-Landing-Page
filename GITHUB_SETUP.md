# GitHub Repository Setup Instructions

## Quick Setup (2 minutes)

### Step 1: Create Repository on GitHub

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** button in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `aliva-landing-page` (or your preferred name)
   - **Description**: "Modern landing page for Aliva - AI-powered healthcare platform"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these instead:

```bash
# Navigate to your project folder
cd aliva-landing

# Add the GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/aliva-landing.git

# Push your code
git branch -M main
git push -u origin main
```

**That's it!** Your repository is now live on GitHub.

---

## Alternative: Using GitHub CLI (if you have it installed)

If you have the GitHub CLI installed, you can do this in one command:

```bash
cd aliva-landing
gh repo create aliva-landing --public --source=. --remote=origin --push
```

---

## What's Already Done ✓

Your local repository is already set up with:
- ✓ Git initialized
- ✓ All files committed (2 commits)
- ✓ .gitignore configured
- ✓ Professional README.md

## After Pushing to GitHub

### Enable GitHub Pages (Optional)

To host your landing page for free:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/aliva-landing/`

### Repository URL

Once pushed, your repository will be at:
```
https://github.com/YOUR_USERNAME/aliva-landing
```

---

## Troubleshooting

### "Permission denied" error?
- Make sure you're logged into GitHub
- You may need to set up SSH keys or use a personal access token
- See: https://docs.github.com/en/authentication

### "Repository already exists"?
- Choose a different repository name
- Or delete the existing repository and try again

### Need to change remote URL?
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/new-repo-name.git
```

---

## Quick Reference

### View current remote:
```bash
git remote -v
```

### View commit history:
```bash
git log --oneline
```

### Check repository status:
```bash
git status
```

### Make changes and push:
```bash
git add .
git commit -m "Your commit message"
git push
```

---

**Need help?** Check the [GitHub documentation](https://docs.github.com/en/get-started/quickstart/create-a-repo) or let me know!
