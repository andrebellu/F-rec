# F-Rec

## Table of Contents

- [F-Rec](#f-rec)
  - [Table of Contents](#table-of-contents)
  - [What We built](#what-we-built)
  - [Category Submission](#category-submission)
  - [App Link](#app-link)
  - [Self host your app](#self-host-your-app)
  - [Screenshots](#screenshots)
    - [Desktop](#desktop)
    - [Mobile](#mobile)
  - [Description](#description)
  - [Link to Source Code](#link-to-source-code)
  - [Permissive License](#permissive-license)
  - [Background](#background)
  - [How We built it](#how-we-built-it)
  - [Additional Resources/Info](#additional-resourcesinfo)
  - [Authors](#authors)

## What We built

![Logo](https://iili.io/HnzdANI.png)
\
A Python, Mongodb and Sveltekit project to register access to a door

## Category Submission

Choose Your Own Adventure

## App Link

[Link to the webapp](https://f-rec.vercel.app/)

Use the following credentials to login:
\
**user**: _test_
\
**password**: _test_

## Self host your app
- Create a MongoDB database named "db" with the following collections:
  - users
  - access_log
  - auth
- cd to the frontend directory
- Create a .env file in the frontend directory and add the following variables:
```shell
MONGODB_URI=your_mongodb_uri
ENV=production
JWT_SECRET=random_string
```
Replace your_mongodb_uri with the uri of your MongoDB database and random_string with a random string.

- Add an admin to the database by inserting the following data
```json
{
    "username": "admin",
    "salt": "salt",
    "hash": "hash"
}
```
Get the hash and salt values by running the following command:
```shell
npm run hash <password>
```

- Now run the app with the following commands:
```shell
npm install
npm run build
npm run preview
```
Visit http://localhost:4173 to see the webapp

## Screenshots

### Desktop

|fig. 1 - Login Page|
|:--:|
|![Login](https://iili.io/Hnzfvwl.png)|

|fig. 2 - Main Dashboard|
|:--:|
|![MainDashboard](https://i.imgur.com/DW675w4.png)|

|fig. 3 - User List|
|:--:|
|![UserList](https://i.imgur.com/OhJeEOT.png)|

|fig. 4 - Adding a user|
|:--:|
|![AddUser](https://i.imgur.com/60Yl5mK.png)|

### Mobile

fig. 5 - Dasboard Mobile view | fig . 6 - User List Mobile View
--- | ---
![MobileMainDashboard](https://i.imgur.com/3aVcxN1.png) | ![MobileUserList](https://i.imgur.com/1EZaTln.png)

## Description

With this webapp you can view the list of users that have access to a door, add new users and delete them. You can also view the history of the access to the door that are recognized by face recognition.

## Link to Source Code

<https://github.com/andrebellu/f-rec>

## Permissive License

MIT License

## Background

We thought about a project that could be useful in our daily life. We decided to create a webapp that could be used to register the access to a door. Maybe it could be useful in a school or in a company where you want to know who has access to a specific door and restrict the access to some people. Maybe you can use an arduino to open the door when the face is recognized or you can use a raspberry pi to do the same thing.

## How We built it

We used python to make a script that uses the webcam that is connected to the computer to recognize the face of the user. If the face is recognized, the script sends the log to the MongoDB database. We used SvelteKit to create the webapp that uses the MongoDB database to show the list of users that have access to the door and the history of the accesses to the door. The people entered in the same day are counted and shown in the dashboard. The webapp is responsive and can be used on mobile devices. We used the following technologies:

- MongoDB
- Python
  - OpenCV
  - Face Recognition
  - pymongo
- Sveltekit
  - TailwindCSS
  - jsonwebtoken

## Additional Resources/Info

Stack overflow is a great resource to find solutions to problems that you have. We used it to find solutions to problems that we had. We also used the following resources:

- [Python](https://www.python.org/)
- [MongoDB](https://www.mongodb.com/)
- [Sveltekit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Box Icons](https://boxicons.com/)
- [Google Fonts](https://fonts.google.com/)
- [Google Icons](https://fonts.google.com/icons)

## Authors

||
|:--:|
|[Mattia Nicastro](https://github.com/mattianicastro)
|[Andrea Bellu](https://github.com/andrebellu)|
|[Stefano Longhena](https://github.com/StefanoLonghena)|
|[Leonardo Baccalario](https://github.com/LeonardoBaccalario)|
|[Francesco Annunziata](https://github.com/FrancescoAnnunziata)|
