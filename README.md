# Innowise_Internship_Custom_culculator

## [Task](https://drive.google.com/file/d/15jVnBPXaZrjs99KOUxp4TGq6Inau6xq_/view)

## [Demo](https://ebuchi-calculator.netlify.app/)

## How to run the app:

1. Clone this repo

```
$git clone git@github.com:AlexTRH/Custom_culculator.git
```

2. Open the directory in code editor
3. Run `$ npm install` to install all the dependencies
4. Run app with `$ npm run serve` to run the app in your browser

## Additional scripts

-   `$ npm run test` runs the tests
-   `$ npm run build` builds the app for production to the `dist` folder

## Folders structure

```
📦src                             # Contains all logic of the project
 ┣ 📂styles                       # Holds .css files with app styles
 ┃ ┗ 📜main.css
 ┣ 📂scripts                      # Holds .js files with app scripts
    ┗ 📜calculator_mode.js        # Contains function that changes calculator mode on button click
    ┗ 📜index.js                  # Main JS file, contains Calculator class with all calculator variables and two functions
    ┗ 📜numbers.js                # Initializes numbers and clicks on number buttons
    ┗ 📜utils.js                  # Operates with numbers and change the format of result output
    ┗ 📜operations.test.js        # File for "Jest" to test all mathematical operations from operations.js
    ┗ 📜operations.js             # Contains Commands classes with all mathematical operations inside
    ┗ 📜operators.js              # Initializes operators and clicks on operator buttons
    ┗ 📜switchTheme.js           # Contains function that change theme on button click

```

## Stack

-   JS
-   Jest
-   Webpack
