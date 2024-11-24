Step 1: Initialize Git (If Not Done Already)
Open a terminal in your project directory.
Initialize a git repository:
bash
Copy code
git init
Add all project files to the repository:
bash
Copy code
git add .
Commit your changes:
bash
Copy code
git commit -m "Initial commit"
Step 2: Create a GitHub Repository
Go to GitHub and log in to your account.
Click the + icon (top-right corner) and select New Repository.
Enter a repository name (e.g., rbac-system) and description.
Choose the visibility (Public/Private) and click Create Repository.
Step 3: Push Your Project to GitHub
Follow the instructions on the GitHub repository page under “…or push an existing repository from the command line”. Example:
bash
Copy code
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
Step 4: Add the README.md File
If your README.md is not already in the project folder, create one:
bash
Copy code
touch README.md
Copy and paste the content of the README file I provided earlier into README.md.
Add and commit the README.md:
bash
Copy code
git add README.md
git commit -m "Added README.md"
git push
Step 5: Verify on GitHub
Go to your repository on GitHub.
Confirm that all files, including the README.md, are visible.
Your project is now hosted on GitHub!
