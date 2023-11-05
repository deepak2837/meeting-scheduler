import { ScheduleMeeting } from './components/ScheduleMeeting/ScheduleMeeting.tsx';

import Home from './pages/index.js';
import './App.css';

function App() {
  // Use the components and functions as needed
  const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
    };
  });
  return (
    <> 
    <Home />
    {/* <ScheduleMeeting
      borderRadius={10}
      primaryColor="#3f5b85"
      eventDurationInMinutes={30}
      availableTimeslots={availableTimeslots}
      onStartTimeSelect={console.log}
    />  */}
    </>
  );
}

export default App;
