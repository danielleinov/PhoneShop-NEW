# Phoney

This repository contains the code for our final project as part of the "Advanced Web Development" course in COLMAN.

To start the application, first install all required dependencies, and then choose to start the whole application, or
each individual component.

## Install Dependencies

To start the application, first install all `npm` dependencies.

Install the server dependencies:

```bash
cd server
npm install
```

Install the React client (Store) dependencies:

```bash
cd client-react
npm install
```

Install the Angular client (Admin dashboard) dependencies:

```bash
cd client-angular
npm install
```

## Start Application

### Option 1 (Start the whole application)

First, install the `npm` dependencies in the **main folder**:

```bash
npm install
```

Start the whole application:

```bash
npm run dev
```

> The above command (ran from the **main folder**) will start the server and both clients (React + Angular) and open the browser to both clients as well.

### Option 2 (Start each component)

Start the server

```bash
cd server
npm start
```

Start the React client (Store)

```bash
cd client-react
npm start
```

Start the Angular client (Admin dashboard)

```bash
cd client-angular
ng serve --open
```
