import React, { useState,useEffect} from 'react';
import { ScheduleMeeting } from '../components/ScheduleMeeting/ScheduleMeeting.tsx';
import { Slider } from '@mui/material';
import { setup, styled } from 'goober';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { timeSlotDifference } from '../timeslotDifference.tsx';

import Button from '@mui/material/Button';

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



  








  function addOffsetToTime(date, offsetHours, offsetMinutes) {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + offsetHours);
    newDate.setMinutes(newDate.getMinutes() + offsetMinutes);
    return newDate;
  }
  
  const availableTimeSlotss = [
    {
      startTime: addOffsetToTime(new Date('2023-06-08T08:00:00.000Z'), 0,0),
      endTime: addOffsetToTime(new Date('2023-06-15T20:00:00.000Z'),0, 0),
    }
  ];
  

// const unavailableTimeSlots = JSON.parse(localStorage.getItem('selectedTimeSlots'));
// console.log(unavailableTimeSlots)
const unavailableTimeSlots =[ {}];


console.log(availableTimeSlotss,unavailableTimeSlots)

const availableTimeSlotsLessUnavailableTimeSlots = timeSlotDifference(availableTimeSlotss,unavailableTimeSlots);
console.log(availableTimeSlotsLessUnavailableTimeSlots)
// const availableTimeSlotsLessUnavailableTimeSlots = availableTimeSlotss













const handleTimeSlotClicked = (startTimeEventEmit) => {
  const selectedTimeSlot = {
    id: startTimeEventEmit.id,
    startTime: addOffsetToTime(startTimeEventEmit.startTime, 5, 30),
    endTime: addOffsetToTime(startTimeEventEmit.endTime, 5, 30),
  };

  // Retrieve existing time slots from local storage
  const existingTimeSlots = JSON.parse(localStorage.getItem('selectedTimeSlots')) || [];

  // Add the new selected time slot to the existing array
  const updatedTimeSlots = [...existingTimeSlots, selectedTimeSlot];

  // Store the updated time slots in local storage
  localStorage.setItem('selectedTimeSlots', JSON.stringify(updatedTimeSlots));

  // Update the rows state with the updated time slots
 
  alert(
    `Time selected: ${format(
      startTimeEventEmit.startTime,
      'cccc, LLLL do h:mm a',
    )} \r`,
  );
};

  // useEffect(() => {
  //   const localStorageData = JSON.parse(localStorage.getItem('selectedTimeSlots'));
  
  //   if (localStorageData && Array.isArray(localStorageData)) {
  //     const updatedRows = localStorageData.map((item, index) => ({
  //       id: index + 1,
  //       Date: item.startTime ? item.startTime.slice(0, 10) : '',
  //       Timing: item.startTime && item.endTime ? item.startTime.slice(11, 16) + ' - ' + item.endTime.slice(11, 16) : '',
  //     }));
  //     setRows(updatedRows);
  //   } else {
  //     setRows([]); // Handle the case when localStorageData is not an array or is null/undefined
  //   }
  // }, [selectedTimeSlots,]);

  const handleShowRows = () => {
    const localStorageData = JSON.parse(localStorage.getItem('selectedTimeSlots'));

    if (localStorageData && Array.isArray(localStorageData)) {
      const updatedRows = localStorageData.map((item, index) => ({
        id: index + 1,
        Date: item.startTime ? item.startTime.slice(0, 10) : '',
        Timing: item.startTime && item.endTime ? item.startTime.slice(11, 16) + ' - ' + item.endTime.slice(11, 16) : '',
      }));
      setRows(updatedRows);
    } else {
      setRows([]);
    }
  };
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
                 
             
                </CustomCard>
                <button onClick={handleShowRows}>Show Rows</button>
                <div style={{ height: 200, width: '40%', marginTop: '2rem' }}>
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
