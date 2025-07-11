#!/bin/bash

# 🐙 Git Commands for Portfolio - Quick Reference
# Run these commands to set up and manage your portfolio repository

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🐙 Git Setup for Portfolio${NC}"
echo -e "${CYAN}=========================${NC}"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Git...${NC}"
    sudo apt update && sudo apt install -y git
fi

echo -e "${BLUE}📋 Git Configuration${NC}"
echo "Set up your Git identity (run these commands):"
echo ""
echo -e "${GREEN}git config --global user.name \"Your Name\"${NC}"
echo -e "${GREEN}git config --global user.email \"your.email@example.com\"${NC}"
echo ""

echo -e "${BLUE}🚀 Initial Repository Setup${NC}"
echo "Run these commands to initialize and push to GitHub:"
echo ""
echo -e "${GREEN}# 1. Initialize Git repository${NC}"
echo -e "${GREEN}git init${NC}"
echo ""
echo -e "${GREEN}# 2. Add all files${NC}"
echo -e "${GREEN}git add .${NC}"
echo ""
echo -e "${GREEN}# 3. Create initial commit${NC}"
echo -e "${GREEN}git commit -m \"🚀 Initial portfolio commit - Optimized React TypeScript portfolio\"${NC}"
echo ""
echo -e "${GREEN}# 4. Add GitHub remote (replace with your repository URL)${NC}"
echo -e "${GREEN}git remote add origin https://github.com/yourusername/portfolio.git${NC}"
echo ""
echo -e "${GREEN}# 5. Rename branch to main${NC}"
echo -e "${GREEN}git branch -M main${NC}"
echo ""
echo -e "${GREEN}# 6. Push to GitHub${NC}"
echo -e "${GREEN}git push -u origin main${NC}"
echo ""

echo -e "${BLUE}📝 Common Git Commands${NC}"
echo ""
echo -e "${YELLOW}Status and Information:${NC}"
echo -e "${GREEN}git status${NC}                    # Check repository status"
echo -e "${GREEN}git log --oneline${NC}             # View commit history"
echo -e "${GREEN}git diff${NC}                      # See changes"
echo -e "${GREEN}git remote -v${NC}                 # View remote repositories"
echo ""

echo -e "${YELLOW}Making Changes:${NC}"
echo -e "${GREEN}git add .${NC}                     # Stage all changes"
echo -e "${GREEN}git add filename${NC}              # Stage specific file"
echo -e "${GREEN}git commit -m \"message\"${NC}       # Commit changes"
echo -e "${GREEN}git push${NC}                      # Push to GitHub"
echo ""

echo -e "${YELLOW}Branching:${NC}"
echo -e "${GREEN}git branch${NC}                    # List branches"
echo -e "${GREEN}git checkout -b feature-name${NC}  # Create and switch to new branch"
echo -e "${GREEN}git checkout main${NC}             # Switch to main branch"
echo -e "${GREEN}git merge feature-name${NC}        # Merge branch into current branch"
echo ""

echo -e "${YELLOW}Syncing with Remote:${NC}"
echo -e "${GREEN}git pull${NC}                      # Pull latest changes"
echo -e "${GREEN}git fetch${NC}                     # Fetch remote changes"
echo -e "${GREEN}git push origin branch-name${NC}   # Push branch to remote"
echo ""

echo -e "${BLUE}🎯 Recommended Commit Messages${NC}"
echo ""
echo -e "${GREEN}✨ feat: add new feature${NC}"
echo -e "${GREEN}🐛 fix: resolve bug${NC}"
echo -e "${GREEN}📝 docs: update documentation${NC}"
echo -e "${GREEN}🎨 style: improve styling${NC}"
echo -e "${GREEN}♻️ refactor: code refactoring${NC}"
echo -e "${GREEN}⚡ perf: performance improvement${NC}"
echo -e "${GREEN}🔧 chore: maintenance tasks${NC}"
echo ""

echo -e "${BLUE}🔄 Workflow Example${NC}"
echo "Typical development workflow:"
echo ""
echo -e "${GREEN}# 1. Create feature branch${NC}"
echo -e "${GREEN}git checkout -b feature/contact-form-improvement${NC}"
echo ""
echo -e "${GREEN}# 2. Make changes to your code${NC}"
echo -e "${GREEN}# ... edit files ...${NC}"
echo ""
echo -e "${GREEN}# 3. Stage and commit changes${NC}"
echo -e "${GREEN}git add .${NC}"
echo -e "${GREEN}git commit -m \"✨ feat: improve contact form validation\"${NC}"
echo ""
echo -e "${GREEN}# 4. Push feature branch${NC}"
echo -e "${GREEN}git push -u origin feature/contact-form-improvement${NC}"
echo ""
echo -e "${GREEN}# 5. Switch back to main and merge${NC}"
echo -e "${GREEN}git checkout main${NC}"
echo -e "${GREEN}git merge feature/contact-form-improvement${NC}"
echo -e "${GREEN}git push${NC}"
echo ""
echo -e "${GREEN}# 6. Clean up feature branch${NC}"
echo -e "${GREEN}git branch -d feature/contact-form-improvement${NC}"
echo -e "${GREEN}git push origin --delete feature/contact-form-improvement${NC}"
echo ""

echo -e "${BLUE}🆘 Emergency Commands${NC}"
echo ""
echo -e "${YELLOW}Undo Changes:${NC}"
echo -e "${GREEN}git checkout -- filename${NC}     # Discard changes to file"
echo -e "${GREEN}git reset HEAD filename${NC}      # Unstage file"
echo -e "${GREEN}git reset --hard HEAD${NC}        # Discard all changes"
echo -e "${GREEN}git revert commit-hash${NC}       # Revert specific commit"
echo ""

echo -e "${YELLOW}Fix Last Commit:${NC}"
echo -e "${GREEN}git commit --amend -m \"new message\"${NC}  # Change last commit message"
echo -e "${GREEN}git add . && git commit --amend --no-edit${NC}  # Add files to last commit"
echo ""

echo -e "${CYAN}🎉 Your portfolio is ready for Git!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Create GitHub repository at https://github.com/new"
echo -e "2. Run the setup commands above"
echo -e "3. Your portfolio will be live on GitHub!"
echo ""
echo -e "${CYAN}💡 Pro tip: Use 'git status' frequently to check your repository state${NC}"
