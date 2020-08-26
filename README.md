# foondo
Backend of fridge tracking and recipe look-up app
 

## How to Run
### Prerequisites: 
You will need keys (and an account) for the following:

  * Spoonacular, via RapidAPI
  * FaunaDB
  * Sentry (Optional)

### Installation:

Before everything, make sure you have Node.js version 14.5.0 or later installed by running `node -v` in your terminal.

Next, rename the .env_example file to .env and fill in your keys, and install the dependencies:

``` shell 
mv .env_example .env
npm run install
```

With your keys in place and dependencies installed, you should be good to go. 

### Running:

* To run in development mode with nodemon
``` shell 
npm run restart
```

* To run in production mode
``` shell 
npm run start-production
```

* To run tests
``` shell 
npm run test
```
