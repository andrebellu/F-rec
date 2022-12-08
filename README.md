# F-Rec

## Table of Contents

- [F-Rec](#f-rec)
  - [Table of Contents](#table-of-contents)
  - [What We built](#what-we-built)
  - [Category Submission](#category-submission)
  - [App Link](#app-link)
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

[Link to the webapp]()

Use the following credentials to login:
\
**user**: _test_
\
**password**: _test_

## Screenshots

### Desktop

|fig. 1 - Login Page|
|:--:|
|![Login]()|

|fig. 2 - Main Dashboard|
|:--:|
|![MainDashboard]()|

|fig. 3 - User List|
|:--:|
|![MainDashboard]()|

|fig. 4 - Adding a user|
|:--:|
|![MainDashboard]()|

### Mobile

fig. 5 - Dasboard Mobile view | fig . 6 - User List Mobile View
--- | ---
![MobileMainDashboard]() | ![MobileUserList]()

## Description

With this webapp you can view the list of users that have access to a door, add new users and delete them. You can also view the history of the access to the door that are recognized by face recognition.

## Link to Source Code

<https://github.com/mattianicastro/tbd>

## Permissive License

MIT License

## Background

We thought about a project that could be useful in our daily life. We decided to create a webapp that could be used to register the access to a door. Maybe it could be useful in a school or in a company where you want to know who has access to a specific door and restrict the access to some people. Maybe you can use an arduino to open the door when the face is recognized or you can use a raspberry pi to do the same thing.

## How We built it

We used python to make a script that uses the webacam that is connected to the computer to recognize the face of the user. If the face is recognized, the script sends the log to the MongoDB database. We used Sveltekit to create the webapp that uses the MongoDB database to show the list of users that have access to the door and the history of the accesses to the door. The people entered in the same day are counted and shown in the dashboard. The webapp is responsive and can be used on mobile devices. We used the following technologies:

- Python
  - OpenCV
  - Face Recognition
  - Flask
  - urllib
- MongoDB
- Sveltekit
- TailwindCSS

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
