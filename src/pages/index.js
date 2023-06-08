import React, { useState,useEffect} from 'react';
import { ScheduleMeeting } from '../components/ScheduleMeeting/ScheduleMeeting.tsx';
import { Slider } from '@mui/material';
import { setup, styled } from 'goober';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { timeSlotDifference } from '../timeslotDifference.tsx';
setup(React.createElement);



const MainContent = styled('main')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #f2f2f2, #ffffff);
  padding: 2rem;
`;

const Layout = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #2e3440;
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(8, 255, 143, 1) 0%, rgba(0, 212, 255, 1) 100%);
`;

const StyledScheduleMeeting = styled(ScheduleMeeting)`
  max-width: 60%;
  margin: 0 auto;
`;

const OptionsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 60%;
  margin-top: 2rem;
  margin-left: 10rem;
`;

const CustomCard = styled('div')`
  padding: 1.0rem;
  background-color: #ffffff;
  border-radius: 10px solid black;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 100px;
`;
// const localStorageData = JSON.parse(localStorage.getItem('selectedTimeSlots'));

// useEffect(() => {
//   const localStorageData = JSON.parse(localStorage.getItem('selectedTimeSlots'));

//   if (localStorageData && Array.isArray(localStorageData) && localStorageData.length > 0) {
//     const updatedRows = localStorageData.map((item, index) => ({
//       id: index + 1,
//       Date: item.startTime ? item.startTime.slice(0, 10) : '',
//       Timing: item.startTime && item.endTime ? item.startTime.slice(11, 16) + ' - ' + item.endTime.slice(11, 16) : '',
//     }));
//     setRows(updatedRows);
//   } else {
//     setRows([]); // Set rows as an empty array when there is no data
//   }
// }, [selectedTimeSlots]);

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Date', headerName: 'Date', width: 130 },
  { field: 'Timing', headerName: 'Timing', width: 130 },
];




function Home() {
  const [rows, setRows] = useState([]);
  const [startTimeListStyle, setStartTimeListStyle] = useState('scroll-list');
  const [eventDurationInMinutes, setEventDurationInMinutes] = useState(30);
  const [eventStartTimeSpreadInMinutes, setEventStartTimeSpreadInMinutes] = useState(0);
  const [resetDate, setResetDate] = useState(false);
  const [skipConfirmCheck, setSkipConfirmCheck] = useState(false);
  const [resetSelectedTimeState, setResetSelectedTimeState] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#3f5b85');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [borderRadius, setBorderRadius] = useState(10);

  









  const availableTimeSlotss = [
    {
      startTime: new Date('2023-06-08T16:00:00.000Z'),
      endTime: new Date('2023-06-08T20:00:00.000Z'),
    }
   
  ];

  

const unavailableTimeSlots = JSON.parse(localStorage.getItem('selectedTimeSlots'));



console.log(availableTimeSlotss,unavailableTimeSlots)

// const availableTimeSlotsLessUnavailableTimeSlots = timeSlotDifference(availableTimeSlotss,unavailableTimeSlots);

const availableTimeSlotsLessUnavailableTimeSlots = availableTimeSlotss
















  const handleTimeSlotClicked = (startTimeEventEmit) => {

    if (resetDate) {
      startTimeEventEmit.resetDate();
    }
    console.log(startTimeEventEmit.endTime)

     
function addGMTOffsets(date) {
  const offsetInMilliseconds = 6.5 * 60 * 60000; // Offset in milliseconds (5 hours and 30 minutes)
  const dateWithOffset = new Date(date.getTime() - offsetInMilliseconds);
  return dateWithOffset;
}
    const selectedTimeSlot = {
      id: startTimeEventEmit.id,
      startTime: addGMTOffsets(startTimeEventEmit.startTime),
      endTime: addGMTOffsets(startTimeEventEmit.endTime),
    };
    
  
    // Retrieve existing selected time slots from local storage
    const storedTimeSlots = localStorage.getItem('selectedTimeSlots');
    let timeSlots = [];
    if (storedTimeSlots) {
      timeSlots = JSON.parse(storedTimeSlots);
    }
    
    const index = timeSlots.findIndex(slot => slot.startTime === startTimeEventEmit.startTime);

    // If the time slot exists in the array, remove it
    if (index !== -1) {
      timeSlots.splice(index, 1);
    }
  
    // Add the new selected time slot to the array

    timeSlots.push(selectedTimeSlot); 
  console.log(selectedTimeSlot)
    // Store the updated time slots in local storage
    localStorage.setItem('selectedTimeSlots', JSON.stringify(timeSlots));
  
    // Update the state
    setSelectedTimeSlots(timeSlots);
  
    alert(
      `Time selected: ${format(
        startTimeEventEmit.startTime,
        'cccc, LLLL do h:mm a',
      )} \r`,
    );
  };
  
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('selectedTimeSlots'));
  
    if (localStorageData && Array.isArray(localStorageData)) {
      const updatedRows = localStorageData.map((item, index) => ({
        id: index + 1,
        Date: item.startTime ? item.startTime.slice(0, 10) : '',
        Timing: item.startTime && item.endTime ? item.startTime.slice(11, 16) + ' - ' + item.endTime.slice(11, 16) : '',
      }));
      setRows(updatedRows);
    } else {
      setRows([]); // Handle the case when localStorageData is not an array or is null/undefined
    }
  }, [selectedTimeSlots]);
  
  return (
    <Layout>
      <div>
        <MainContent>
          <div className="main-example-container">
            <div className="main-content">
              <div className="main-content-inner">
                <h1 style={{ textAlign: 'center' }}>Schedule Meeting</h1>

                <StyledScheduleMeeting
                  eventStartTimeSpreadInMinutes={eventStartTimeSpreadInMinutes}
                  borderRadius={borderRadius}
                  primaryColor={primaryColor}
                  backgroundColor={backgroundColor}
                  eventDurationInMinutes={eventDurationInMinutes}
                  availableTimeslots={availableTimeSlotsLessUnavailableTimeSlots}
                  onStartTimeSelect={handleTimeSlotClicked}
                  onNoFutureTimesAvailable={console.log}
                  startTimeListStyle={startTimeListStyle}
                  skipConfirmCheck={skipConfirmCheck}
                />
              </div>
              <OptionsContainer className="options-container">
                <CustomCard className="custom-card">
                  <h5>Select Meeting Duration</h5>
                  <Slider
                    aria-label="eventDurationInMinutes"
                    value={eventDurationInMinutes}
                    valueLabelDisplay="auto"
                    defaultValue={30}
                    step={10}
                    min={10}
                    max={120}
                    onChange={(_, value) => setEventDurationInMinutes(value)}
                  />
            
                </CustomCard>

                <CustomCard className="custom-card">
                  <h5>Gap In-Between Meetings</h5>
                  <Slider
                    aria-label="eventStartTimeSpreadInMinutes"
                    value={eventStartTimeSpreadInMinutes}
                    valueLabelDisplay="auto"
                    defaultValue={10}
                    step={5}
                    min={0}
                    max={60}
                    onChange={(_, value) => setEventStartTimeSpreadInMinutes(value)}
                  />
                 
             
                </CustomCard><div style={{ height: 200, width: '40%', marginTop: '2rem' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
              </OptionsContainer>
            </div>
          </div>
        </MainContent>
       
      </div>
    </Layout>
  );
}

export default Home;
