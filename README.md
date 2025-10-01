# Alumini-Portal
Alumni Portal

# Project Overview
Alumni Portal is a web-based platform for alumni to connect, network, discover opportunities, and stay engaged with their alma mater and peers. It features secure login, profile management, an alumni directory, job board, events page, and more, creating a dedicated community space with a clean and modern UI.

# Features
User Authentication: Login with email and password.
Dashboard: Welcome screen after login with navigation links.
Profile Settings: View and edit your profile, bio, phone, and password.
Alumni Directory: Searchable list of alumni with profile details and social links.
Job Board: Curated job listings with "Apply" links.
Events Page: Elegant display of upcoming events with registration options.
Forum Page: 
Navigation: Consistent header links for seamless page transitions.

# Project Structure
alumini/
│── db.json                   # Mock database for json-server
│── index.html                # Login page
│── dashboard.html            # Dashboard page
│── about.html                # About page
│── profile.html              # Profile settings page
│── directory.html            # Alumni directory page
│── job.html                  # Job board page
│── events.html               # Events page
│── style.css                 # Main stylesheet 
│── login.js                  # Login form JS logic
│── profile.js                # Profile page JS logic
 |── forum  .js                #Forum page JS logic
│── forum.html                  # Community forum page

# Prerequisites
Node.js installed
json-server for the mock backend API

# Install globally with:
    npm install -g json-server
Visual Studio Code or any code editor
Initial Setup & Running the Project
Clone or download the project folder to your computer.

# Open the folder in VS Code:
Launch VS Code
Click "File" > "Open Folder…" and select your project folder.

# Install and start json-server:
Make sure your db.json file is in the root of the project folder 

# In the terminal, run:
json-server --watch db.json --port 3000
The API server will start at http://localhost:3000
Open the Front-End Pages in your browser

# Database Schema (db.json)
json
{
  "users": [
    {
      "id": 1,
      "email": "anusha@dbs.com",
      "password": "password123D@",
      "fullname": "Anusha DBS",
      "phone": "9876543210",
      "bio": "Passionate alumni working in tech."
    }
  ]
}



# Front-End Development
Login Page (index.html): Modern form, show/hide password toggle, error feedback.
Dashboard (dashboard.html): Header, navigation bar, welcome message, feature sections for events and highlights.
About Page (about.html): The portals purpose, benefits, and core features.
Profile Settings (profile.html): Form to edit name, phone, bio, and password; retrieves and updates data from mock API.
Alumni Directory (directory.html): A table of alumni with images, a search bar, and a filter displays key details and social links.
Job Board (jobboard.html): Job listings in card-style layout, each with an apply button and company info.
Events Page (events.html): Events displayed as cards, side by side, with descriptions, images, and registration links.
Forum Page(forum.html): Share text and upload images or posts. Create a post, reply or upload posts.
Navigation: Consistent header/navigation on all pages.

# Back-End Development
API Simulation with json-server:
/users: For authentication, profile fetch/update.
Db.json is expanded to include profile fields for profile/settings.
Supports GET, POST, and PUT for user resources.

