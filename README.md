# Summary
Museme is a web application that provides music books that self-teaching instrument players can purchase based on their level, lets them use their device as their music sheet, and tracks the songs they have completed and are in progress of learning. This is the same app as in the MuseMe repository, except the frontend is being changed from EJS to React, and thus the app will be using client-side rendering instead. 

## Directions
Run the docker-compose.yml file in the root directory to pull the images and bring all of the services up:
```
docker compose -f deployment/docker-compose.yml up -d
```
Then enter localhost in the browser and it will bring up the app.

## Technologies
The technology stacks used for this project include:
- **React** for the frontend
- **CSS** for the app's presentation
- **Express.js** for the web server framework
- **Node.js** for the backend to run express.js
- **MySQL** for the database
- **Nginx** for the proxy server
- **REST API** through fetch requests for seamless communication between the frontend and backend
- **Bcrypt** for hashing user passwords with salt

## Key Decisions and Implementations

MuseMe was initially built with EJS for the frontend but was migrated to React because the app requires a lot of interactivity. React provides dynamic rendering of JavaScript components through client-side rendering and component-based architecture as the user navigates the app. Express.js was used for the web server because of its simplicity and also its flexibility with all the npm modules it provides and its router technology. MySQL is needed because the app calls for structured data to store users and the books, songs, and song progresses that each user has.

Developed a Bash script to automate the process of converting pdf files of songs to individual jpg images of each page, creating and executing SQL queries to add the song to the database, and adding the query to the database script for reusability.

Used bcrypt to hash each user's password with salt for security and data integrity before storing their passwords in the database.
