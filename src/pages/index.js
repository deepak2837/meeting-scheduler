import React, { useState } from 'react';
import { ScheduleMeeting, timeSlotDifference } from '../components/ScheduleMeeting/ScheduleMeeting.tsx';
import { Slider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { setup, styled } from 'goober';



import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// import Layout from '@theme/Layout';
import { format } from 'date-fns';


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
  margin-left:10rem;
  ${'' /* border:10px solid black; */}
`;

const CustomCard = styled('div')`
  padding: 1.0rem;
  background-color: #ffffff;
  border-radius: 10px solid black;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 250px;
`;



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Date', headerName: 'Date', width: 130 },
  { field: 'Timing', headerName: 'Timing', width: 130 },

];

const rows = [
  { id: 1, Date: 'Snow', Timing: 'Jon' },
  { id: 2, Date: 'Lannister', Timing: 'Cersei' },
  { id: 3, Date: 'Lannister', Timing: 'Jaime' },
  { id: 4, Date: 'Stark', Timing: 'Arya' },
  
];

  

function Home() {
  const [startTimeListStyle, setStartTimeListStyle] = useState('scroll-list');
  const [eventDurationInMinutes, setEventDurationInMinutes] = useState(30);
  const [eventStartTimeSpreadInMinutes, setEventStartTimeSpreadInMinutes] = useState(10);
  const [borderRadius, setBorderRadius] = useState(10);
  const [resetDate, setResetDate] = useState(false);
  const [skipConfirmCheck, setSkipConfirmCheck] = useState(false);
  const [resetSelectedTimeState, setResetSelectedTimeState] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#3f5b85');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');


  const availableTimeSlots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
    };
  });
console.log('availableTimeSlots', availableTimeSlots);
  const handleTimeSlotClicked = (startTimeEventEmit) => {
    if (resetDate) {
      startTimeEventEmit.resetDate();
    }
    if (resetSelectedTimeState) {
      startTimeEventEmit.resetSelectedTimeState();
    }
    console.log('startTimeEventEmit', startTimeEventEmit);
    alert(
      `Time selected: ${format(
        startTimeEventEmit.startTime,
        'cccc, LLLL do h:mm a',
      )} \rCheck the console for more info returned in the StartTimeEventEmit object.`,
    );
  };

  return (
    <Layout>
    <div >
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
                availableTimeslots={availableTimeSlots}
                onStartTimeSelect={handleTimeSlotClicked}
                onNoFutureTimesAvailable={console.log}
                startTimeListStyle={startTimeListStyle}
                skipConfirmCheck={skipConfirmCheck}
              />
            </div>
            <OptionsContainer className="options-container">
            
              <CustomCard className="custom-card">
                <h5>eventDurationInMinutes</h5>
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
                <p>The minutes of each event</p>
              </CustomCard>

              <CustomCard className="custom-card">
                <h5>eventStartTimeSpreadInMinutes</h5>
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
                <p>
                  The length between the next possible event start time.{' '}
                  <i>
                    Example: For 30, an event start time will be available 30 minutes after the previous event END time.
                  </i>
                </p>
              </CustomCard>
              <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
       
      />
    </div>
              
            </OptionsContainer>
          </div>
        </div>
      </MainContent>
    </div></Layout>
  );
}

export default Home;
