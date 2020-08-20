# foondo
Backend of fridge tracking and recipe look-up app
 

## How to Run
### Keys: 
You will need the keys (and an account) for the following:

  * Spoonacular on RapidAPI
  * FaunaDB
  * Sentry (Optional)

### Install:

Before everything, make sure you have Node.js at least at version v14.5.0 by running `node -v` on your terminal.

Next, rename the .env_example file to .env and fill in your keys, and install the dependencies:

``` shell 
mv .env_example .env
npm run install
```

With your keys in place and express dependencies installed, you should be good to go. 

### Running:

* To run at development mode with nodemon
``` shell 
npm run restart
```

* To run at production mode
``` shell 
npm run start-production
```

* To run tests
``` shell 
npm run test
```
