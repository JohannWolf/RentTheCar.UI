# RentTheCarUI
## Project Description
The Purpose of this project is to have an interface for a rental agency. It will allow users to view, add, and remove inventory, rent cars, and generate reports. The main view will be from a browser using Angular, and the Logic will be handled in C#

## Project Scope 
In this version 1.0, the scope of the project is to build the main functionalities to log, handle inventory, rent, and run a couple of reports. In future versions, more functionalities will be added.

## Key Features: 
* ####	Security
    *	Use JWT tokens, refresh tokens, and blacklist for security.
    *	Have email and password validation on UI (length and format).
    *	RBAC access to different sections of software.
* ####	Functionality
    *	Maid dashboard with the menu.
    *	Inventory Section
    *	Enter inventory manually or from a CSV file.
    *	Export inventory to a CSV file.
    *	Users Section (Managers only)
    *	Creation of users and role assignment.
    *	Creation of custom roles.
    *	Creation of rates based on time (hr, day, week, month).
    *	Creation of special rates during promotions.
    *	Rates priority and define global or location-specific.
    *	Customers entered manually or from a CSV file.
    *	Locations creation.
    *	Make a Reservation.
    *	Rent the cars.
* ####	Reports
    *	Cars status (available, on Rent, damages, etc.).
    *	Revenue of selected period.
    *	Availability in the future (based on rents and reservations).