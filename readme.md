# SpaceTiger - A cos333 project




Not Updated ---
## Setup and Installation
### Installation Steps:

```bash
# clone the repo
git clone https://github.com/PrincetonResInDe/whenisgood
```

if yarn isn't installed, install it [here](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
```bash
# install the NodeJS packages required for frontend
cd frontend
yarn

# install the python packages required for backend
cd ../backend
pip install -r requrements.txt
```

### Development Steps:
```bash

# run the frontend
cd frontend
yarn start

# on a different termainl
# serve the backend
cd backend
python app.py
```

### TODO: Publishing Steps:


## Resources
- [Flask and React One Server App](https://blog.appseed.us/flask-react-full-stack-seed-projects/)


## Git: 

### Rebasing Tutorial
Rebase changes the base of the dev's branch from one commit to aonther, so it looks like they created their branch from the most recent commit (or whatever commit they want).

[See here for more details](https://www.simplilearn.com/what-is-git-rebase-command-article)


After you commit your changes to your feature branch `<some-feature-branch>`

checkout the main branch (or whatever branch you want to update your  merge to)
```Bash
git checkout main
```
Pull in the new stuff
```Bash
git pull origin main
```

Checkout your feature and rebase main to it

```Bash
git checkout <some-feature-branch>
git rebase main
```

Git will whine about merge conflicts, fix them and repeat these steps until git stops whining:

```Bash
git add <file-name>   # stage the merged conflicts
git rebase --continue # move to the next commit 
```

Then (`--force-with-lease`, if a PR is already made and the remote branch already exists NOT IF OTHER PEOPLE HAVE BASED work off of it i.e. they have already pulled `<some-feature-branch>` branch and merged it into their work or something) push the merged conflicts to the remote branch:

```Bash
git push --force-with-lease origin <some-feature-branch>
```

And make a PR / request merge to main using GitHub's UI