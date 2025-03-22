# Invoice App

This project is a demonstration of a REST API system for managing invoices and persons. 
I created it as part of my coding course and use it to practice my skills
It is not intended for production use.

## Features
- CRUD operations for persons and invoices
- Managing relationships between persons and invoices
- Protects against changes in issued invoices
- Manages changes in persons so that a snapshot stays available for issued invoices
- Displays overall statistics
- Enables listing sales and purchases for each person

## Technologies
**Front-end:** React, React-Bootstrap  
**Back-end:** Java, Spring Boot, Hibernate, MySQL, MapStruct, Lombok  

## Project Setup
1. Start the MySQL server (e.g., using XAMPP)
2. Run the back-end in an IDE
3. Start the front-end using `npm start`

### Project Structure
- **invoice-client/** – React client application
- **invoice-server/** – Spring Boot REST API

Each part has its own README file with detailed instructions.