# Python script to recognize faces

Use Visual Studio Code to do the following steps.

Python script to recognize faces, communicate with the MongoDB database.

First of all, you need to make a virtual environment to install the libraries. To do that, you need to run the following commands:

```shell
python -m venv .venv
```

Then, you need to activate the virtual environment. To do that, you need to run the following commands:

if you are using Windows

```shell
.venv\Scripts\activate
```

if you are using Linux/MacOS

```shell
source .venv/bin/activate
```

After that you need to check if you have the following libraries installed:

- Cmake
- Visual Studio for C++ (if on windows)

If you don't have cmake installed, run the following command:

```shell
pip install cmake
```

Then, you need to install the following python libraries; in order to do that, you need to run the following command:

```shell
pip install -r requirements.txt
```

Now populate the .env file with the following variables:
MONGODB_URI=your_mongodb_uri

Replace your_mongodb_uri with the uri of your MongoDB database.

After that, you need to run the following command to run the script:

```shell
python main.py
```

You'll be recognized by the camera only if you have added yourself to the employees from the web app, follow the instructions in the frontend directory to host it. If you haven't added yourself, you'll be recognized as an unknown person.
