# The Designated Show


[![Travis](https://img.shields.io/travis/piravp/series-manager.svg)](https://travis-ci.org/piravp/series-manager.svg?branch=master)
[![license](https://img.shields.io/github/license/piravp/series-manager.svg)](https://github.com/piravp/series-manager/blob/master/LICENSE.md)


The Designated Show is a series manager aimed at the professional binge-watcher. TDS lets you find and keep track of all the series you have going on. 

**[Live demo](https://the-designated-show.herokuapp.com/)**

## 1. Download TDS
#### Clone this repository or download ZIP.
```sh
# HTTP
https://github.com/piravp/series-manager.git
# SSH
git@github.com:piravp/series-manager.git
```
## 2. Connect to TMDb
#### Get API key
TDS uses The Movie Database API (TMDb). [Register](https://www.themoviedb.org/account/signup) an account and [aquire](https://developers.themoviedb.org/3/getting-started/introduction) an `API_KEY`.

#### Copy key into the project
Adding the key can be done either directly inside the app or by modifying the `configKey.js` file.  
##### Method 1: In the app
After you've run `npm run dev-server` and opened the app navigate to `Home` and open the dropdown menu below the search bar. Click on `Add key` and insert your key.
##### Method 2: Config file
Locate `configKey.js` in the root folder and insert your API_KEY inside the string on line 3.
```node
export const API_KEY = getAPIKey() || "YOU-MUST-PROVIDE-AN-API-KEY-HERE";
```

## 3. Getting Started
#### Install dependencies
```sh
# npm
npm install
# yarn
yarn install
```

#### Start dev-server
```sh
# npm
npm run dev-server
# yarn
yarn run dev-server
```


Nice! You can now navigate to http://localhost:8080 to see the result.

## Demo
[![The Designated Show - A series manager](https://img.youtube.com/vi/mGudgU-Nn2U/0.jpg)](https://www.youtube.com/watch?v=mGudgU-Nn2U)

**[Click here for live demo](https://the-designated-show.herokuapp.com/)**

### Known issues
* Manually adding series has not been implemented yet.
* Sometimes opening the `HomeDetailsModal` doesn't fetch the details. The current fix is to close and re-open the modal (may require several attempts).
* The list view in `Home` shows two empty items even though list is empty. 