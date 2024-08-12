/src
├── /components
│     ├── Login.js       // Login component
│     ├── BillForm.js    // Form for adding new bills
│     ├── TopBar.js      // TopBar component with title and icons
│
├── /css
│     ├── App.css        // General styles for the application
│     ├── TopBar.css     // Styles specific to the TopBar component
│     ├── login.css      // Styles specific to the Login component
│
├── App.js               // Main application component
├── firebase.js          // Firebase configuration and initialization
├── authService.js       // Authentication-related functions


Workflow and Interaction

    App.js: Handles overall application state, including authentication and bill management.
    Based on whether the user is logged in, it either displays the Login component or the BillForm and the list of bills.
    Login.js: Manages user login. On successful login, it triggers the onLoginSuccess callback, which in turn triggers fetchBills in App.js.
    TopBar.js: A reusable top navigation bar. It includes icons for user actions like logging out and navigating to a profile page.
    BillForm.js: Used by logged-in users to add new bills to their personal Firestore collection.
    authService.js: Provides a centralized place for authentication logic, making it easy to manage and test.
