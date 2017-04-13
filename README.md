# KITTY.IO

#### A CMS (content management system) app that keeps track of the kitty for the guest house.

## Local Installation
- Get the config.env details from us on Gitter
```bash
git clone https://github.com/FACN1/week8-jiba-hack.git
cd week8-jiba-hack
npm install
npm start
```

## User Stories
**As an honest resident of the guesthouse**
> I want to be able to record my contributions to the kitty

> So that I can maintain the respect of my peers

## File Structure
week7-rm-rf-mario
- public/
  + style.css
- src/
  + handlebars/
    + helpers/
    + layouts/
    + partials/
    + views/
  + routes/
  + db_queries.js
  + server.js
  + start.js
- database/
  + db_build.js
  + db_build.sql
  + db_connection.js
- tests/
  + back-end/
    + tests.js

## App Logic
- User Interface:
  - Main: go to the page and automatically render the last `n` transactions, and the total in the kitty
  - Update: takes you to a form to add to or withdraw money from the kitty

## Database Schema

| ID  | DATE | NAME | TRANSACTION_VALUE |
| ------------- | ------------- | ------------- | ------------- |
| SERIAL PRIMARY KEY | DATE DEFAULT CURRENT_DATE  |  VARCHAR(200) NOT NULL  |  INT NOT NULL
