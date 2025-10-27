This is a Task Manager web application built using React, Vite, and Tailwind CSS. It allows users to add, complete, delete, and filter tasks, with support for priority levels, light/dark mode, and responsive design. The app persists tasks in local storage so that they remain after page reloads. Smooth animations, hover effects, and a gradient background provide an appealing UI.

Features

Add new tasks with a custom text input

Mark tasks as completed with a checkbox

Delete tasks with a delete button

Filter tasks: All, Active, Completed

Priority badges for each task (High, Medium, Low)

Light/Dark theme switcher

Persistent storage using LocalStorage

Responsive design for mobile, tablet, and desktop

Animated cards and buttons for better UX

Project Structure
src/
├─ components/
│  ├─ Button.jsx        # Reusable button component
│  ├─ TaskManager.jsx   # Main task manager component
├─ App.jsx              # Root component
├─ main.jsx             # Entry point
public/
├─ index.html
tailwind.config.js      # Tailwind CSS configuration
package.json
README.md

Setup Instructions

Clone the repository

git clone <https://github.com/PLP-MERN-Stack-Development/react-js-jsx-and-css-mastering-front-end-development-Momanyi558.git>
cd react-task-manager


Install dependencies

npm install


Start the development server

npm run dev


Open http://localhost:5173
 in your browser

Usage

Enter a task in the input field and click Add

Toggle completed status with the checkbox

Delete tasks using the trash icon

Filter tasks using All / Active / Completed buttons

Switch between light and dark themes using the toggle button

Screenshots
screenshorts.png Darkmodescreenshort.png


Responsive layout with dark/light mode, animated task cards, and gradient background.

Tailwind & React Notes

Tailwind is used for rapid styling, dark mode, responsive utilities, and animations

React state hooks (useState, useEffect) manage task state and persistence

Components are reusable and modular for scalability

Future Enhancements

Add due dates for tasks

Priority-based sorting and filtering

Search tasks

Drag-and-drop task reordering

Notifications for upcoming tasks

Deployment

You can deploy this project using Vercel, Netlify, or GitHub Pages:

Build the app:

npm run build


Deploy the dist/ folder to your hosting platform

License

This project is open source under the MIT License.