This is the server-side logic for the ResumeBuilder platform. It provides a secure RESTful API for managing user data, authentication, and resume persistence using the MERN stack.

🚀 Core Functionalities
Secure Authentication: User signup and login powered by JWT (JSON Web Tokens) and password hashing with bcryptjs.

Resume CRUD Operations: Endpoints to Create, Read, Update, and Delete resume data linked to specific user accounts.

Data Validation: Structured Mongoose schemas to ensure data integrity for complex resume fields (Experience, Education, etc.).

Scalable Architecture: Modular folder structure with separated routes, controllers, and models for easy maintenance.

CORS Configuration: Setup for secure cross-origin resource sharing with the React frontend.

🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

Database: MongoDB via Mongoose

Authentication: JWT & Bcrypt.js

Environment Management: Dotenv
