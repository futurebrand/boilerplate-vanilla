# Boilerplate Vanilla

Project stack:

- Sass/Postcss
- Lint (Eslint and Prettier)
- Precommit Lints
- Visual Studio Code config like Chrome Debugger and Lint Integration

## What do you need?

- Node.js
- NPM or Yarn

## Working on project

Here are the commands that are used in the project:

| Command    | Description                               |
| ---------- | ----------------------------------------- |
| yarn dev   | Run the project in development with watch |
| yarn build | Build project                             |

## Setup of your IDE

To maintain code quality and always have a standard across all of the team's
project has rules defined for javascript and css / scss. We use the Eslint and 
Prettier for Javascript. It is necessary to
integration of these rules with your favorite IDE. We recommend using Visual
Studio Code with the following plugins:

| Plugin    | README                                                                                     |
| --------- | ------------------------------------------------------------------------------------------ |
| ESlint    | [check plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) |
| Prettier  | [check plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) |

## Pre-commit

Before running git commit, the rules of ESLint and Stylelint are executed. If
there is an error or some non-default code of the site will generate an error
and you will not be able to commit.
