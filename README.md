# The Designated Show
The Designated Show is a series manager aimed at the professional binge-watcher. TDS lets you find and keep track of all the series you have going on. 

## 1. Download TDS
#### Clone this repository or download ZIP.
```sh
# HTTP
https://github.com/piravp/series-manager.git
# SSH
git@github.com:piravp/series-manager.git
```
## 2. Connect to TMDB
#### Get API key
TDS uses The Movie Database API (TMDB). [Register](https://www.themoviedb.org/account/signup) an account and [aquire](https://developers.themoviedb.org/3/getting-started/introduction) an `API_KEY`.

#### Copy key into the project
Create a file called `config.json` and copy your API_KEY with the key-value pair. Be sure to name the variable in lower case. 
```node
{
    "api_key": <<your-key>>
}
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


### Known issues
* Sometimes opening the `HomeDetailsModal` doesn't fetch the details. The current fix is to close and open the modal again (may require several attempts).