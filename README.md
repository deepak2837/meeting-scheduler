live link : <h1>https://schedule-meeting.netlify.app/</h1>
Features Implemented
View Appointments:

View the list of all currently scheduled appointments in both List view and Calendar View.
Create Appointments:

Create a new appointment in an available time slot.
Suggest Available Slot:

Suggest the closest available slot if there's an existing appointment in the slot that the user is trying to schedule. For example, if the user wants to schedule an appointment for 04:00 - 05:00 PM, and there are existing appointments as follows:
A1: 04:15 - 04:30
A2: 04:30 - 05:00
A3: 05:15 - 06:00
A4: 07:00 - 08:00
The user will be recommended with 06:00 - 07:00 as the available slot. If accepted, the appointment will be saved.
<Optional> Postpone Appointments:

(Optional) Postpone appointments in overlapping slots to the next available slot.


Installation and Usage
To run the project locally, follow these steps:

Clone this repository to your local machine.
Navigate to the project directory.
Run the following commands:
bash
Copy code
# Install project dependencies
npm install

# Start the development server
npm start
The application will be accessible at http://localhost:3000.
