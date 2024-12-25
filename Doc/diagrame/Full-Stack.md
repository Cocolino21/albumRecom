---
tags: []
created: 2023/11/19
modified: 2023-11-19
---
## Introduction

Each list will be importance-ordered, with most important to know first and least important last. Bolded elements are **essential**.

Regarding [frontend](#Frontend) and [backend](#Backend), chose one and if you feel comfortable with it, also learn the other one.
## Basic Skills & Tools

- [ ] **[Vscode](https://code.visualstudio.com/)**
	- Has excellent extensions for everything
	- Pretty integration with Git and the [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) extension
		- Can do most git-related stuff from an interface
	- Easy navigation with `Ctrl + P`, easy commands with `Ctrl + Shift + P`
	- Can search inside files
	- Has an integrated terminal and a debug terminal
	- Can work at the same time with someone else with Live Share extension
	- Has [cool editor productivity features](https://code.visualstudio.com/docs/editor/codebasics)
	- Can easily create a [Devcontainer](https://www.youtube.com/watch?v=Fc6TAahZ1Pk) of your choice. *Hint: First 3 mins of the video are enough*
	- Many more...
- [ ] **[Git](https://git-scm.com/)**
	- Helps you keep track of different versions of your work
	- Most of the hard work is done by these commands:
		1. `git clone <some-repo>` - basically downloads and connects code from a repository (will be Github in your case) to your computer
		2. `git branch <some-branch-name>` - create a new branch. Helps if you want to always have a branch with working code.
		3. `git checkout <some-branch-name>` - jump on another branch
		4. `git checkout -b <some-branch-name>` - combines (3) and (4)
		5. `git pull` - downloads any new code from the current branch on Github to your computer
		6. `git pull origin <some-branch-name>` - downloads any new code from *another* branch on Github to your computer
		7. `git push` - sends changes locally to the Github repository
	- Solving [merge conflicts](https://www.youtube.com/watch?v=QmKdodJU-js) is very easy with Vscode
- [ ] **[Github](https://github.com/)**
	- [ ] Github Pipelines (CI/CD) - automatization for Github. (For example, a script which doesn't let you merge the changes if the tests don't pass)
		- [ ] Github Actions
- [ ] [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) - Lets you run Linux commands on Windows
- [ ] Linux Bash - basic commands
- [ ] [Docker](https://www.youtube.com/watch?v=gAkwW2tuIqE)
## Concepts (They apply to everything)

- [ ] [**Rest API**](https://www.youtube.com/watch?v=-MTSQjw5DrM)
	- [ ] [Swagger](https://swagger.io/) - is integrated in most backend frameworks
	- [ ] [Postman](https://www.postman.com/) - helps with checking your API if you don't have Swagger set up 
- [ ] [**Http response status codes**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) (not necessarily every code, roughly what each group of status codes means)
- [ ] **[JWT](https://jwt.io/)**
- [ ] **[Node package manager](https://www.npmjs.com/)** & package.json
- [ ] **[Json](https://www.youtube.com/watch?v=iiADhChRriM) & [Yaml](https://www.youtube.com/watch?v=0fbnyS_lHW4)** formats
- [ ] [Regex](https://regex101.com/)
- [ ] Authentication & Authorization
## Programming Languages

- [ ] **Javascript**
	- [ ] **[Asynchronous code](https://javascript.info/async)**
- [ ] [**Typescript**](https://www.youtube.com/watch?v=zQnBQ4tB3ZA) ( Start directly with this. Usually also has info on everything you need to know about javascript)
- [ ] **HTML**
- [ ] CSS
	- [ ] SASS
	- [ ] Tailwindcss
	- [ ] Bootstrap
- [ ] Python - always good to know some, even if you want to only use javascript
## Frontend

- [ ] **React** / Vue.js / Angular
	- [ ] Redux for React
- [ ] [D3](https://d3js.org/) - for dynamic data diagrams (It's enough to know it exists and what it does)
- [ ] Cookies vs local storage vs session storage
## Backend
 - [ ] **Node.js** / Nest.js (more similar to Springboot)
 - [ ] Databases basics
	 - [ ] **Postgres** - relational database
	 - [ ] GraphQL
 - [ ] Cloud basics
	 - [ ] Azure
	 - [ ] AWS
## Testing

- [ ] **Jest** / Vitest
- [ ] Cypress (for frontend testing)
## Productivity

- [ ] **[Markdown](https://www.markdownguide.org/getting-started/)** 
	- Has a [very simple set of rules](https://www.markdownguide.org/cheat-sheet/) to do most types of text formatting
	- Is used in Github, Obsidian, Discord, Slack, Gmail, etc.
- [ ] [Obsidian](https://obsidian.md/)
	- Helps you organize. Very important to keep notes whenever there is information you don't want to remember or you know you won't remember, or for taking meeting notes
	- Has automatic integration for [mermaid.js](https://mermaid.live/) for quicker diagrams
	- Has a lot of plugins which help you work quicker:
		- [Templater](https://silentvoid13.github.io/Templater/introduction.html) - write scripts which generate files or content inside files automatically
		- Advanced Slides - write markdown to generate "powerpoint presentations"
		- Many more..
- [ ] Microsoft PowerToys
	- Always On Top - Keeps a window always in on top. (Useful if you want to use the calculator and you have to keep switching between tabs)
	- Color Picker - pick colors easily, good for frontend
	- Crop & Lock - Crop a window, good if you want to have smaller meeting windows
	- Text Extractor - Copy text from screenshots
- [ ] [Ditto](https://ditto-cp.sourceforge.io/)


