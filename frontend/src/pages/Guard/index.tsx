// pages/Guard/index.tsx
import { Outlet, useNavigate, useRoutes, useMatch } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import GuardHeaderBar from './components/GuardHeaderBar';
import UsageDuration from './components/UsageDuration';
import UsageRatio from './components/UsageRatio';
import UsageHistory from './components/UsageHistory';
import UsageHistoryDetail from './components/UsageHistoryDetail';
import CurrentStatus from './components/CurrentStatus';


import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
// import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
// import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';

const CommonButton = styled(Button)`
  text-transform: none;
  font-size: 16px;
  padding: 5px 10px;
  border: 2px solid;
  border-radius: 12px;
  background-color: #ffffff;
  border-color: #3B88C3;
  &:hover {
    border-color: blue-dark;
    background-color: #ffffff;
    box-shadow: 0 0 0 0.1rem #3B88C3;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem #3B88C3;
  }
  font-family: 'Lexend', sans-serif;
`;


const Guard = () => {

  const navigate = useNavigate();

  const isGuardRoute = useMatch('/guard');

  // const isusageduration = useMatch('/guard/usageduration');
  // const isusageratio = useMatch('/guard/usageratio');
  // const isusagehistory = useMatch('/guard/usagehistory');
  // const isusagehistorydetail = (!isGuardRoute &!isusageduration & !isusageratio & !isusagehistory );

  const handleNavigate = (path: string) => {
    navigate(`/guard${path}`);
  };

  const routes = useRoutes([
    {
      path: '/',
      element: (
        <div className=''>
          <GuardHeaderBar />
          {isGuardRoute && (
            <div className='flex items-center align-middle justify-center mt-24 sm:mt-16 md:mt-8'>
              <Stack direction="column" spacing={4} className='w-4/5 sm:w-8/12 md:w-7/12 lg:w-5/12'>
                <CommonButton variant="contained" onClick={() => handleNavigate('/usageduration')}>
                  <Grid container spacing={0} className='flex justify-center align-middle text-center'>
                    <Grid item xs={2} className='flex align-middle items-center justify-center'>
                      <TimerOutlinedIcon className='text-white bg-blue-dark rounded-lg p-1' style={{ fontSize: "3rem" }} />
                    </Grid>
                    <Grid item xs={9} className='flex align-middle items-center justify-start pl-3'>
                      <div className="flex flex-col justify-start align-top">
                        <div className="mt-0 sm:mt-2 text-lg md:text-xl text-black font-lexend font-medium flex justify-start">Usage Duration</div>
                        <div className="hidden sm:flex my-2 text-sm md:text-md text-start text-gray font-lexend font-medium justify-start">Check car owner’s usage duration</div>
                      </div>
                    </Grid>
                    <Grid item xs={1} className='flex align-middle items-center justify-center'>
                      <NavigateNextOutlinedIcon className='text-blue-dark' style={{ fontSize: "2rem" }} />
                    </Grid>
                  </Grid>
                </CommonButton>
                <CommonButton variant="contained" onClick={() => handleNavigate('/usageratio')}>
                  <Grid container spacing={0} className='flex justify-center align-middle text-center'>
                    <Grid item xs={2} className='flex align-middle items-center justify-center'>
                      <HistoryToggleOffOutlinedIcon className='text-white bg-blue-dark rounded-lg p-1' style={{ fontSize: "3rem" }} />
                    </Grid>
                    <Grid item xs={9} className='flex align-middle items-center justify-start pl-3'>
                      <div className="flex flex-col justify-start align-top">
                        <div className="mt-0 sm:mt-2 text-lg md:text-xl text-black font-lexend font-medium flex justify-start">Usage Ratio</div>
                        <div className="hidden sm:flex my-2 text-sm md:text-md text-start text-gray font-lexend font-medium justify-start">Check car owner’s usage ratio</div>
                      </div>
                    </Grid>
                    <Grid item xs={1} className='flex align-middle items-center justify-center'>
                      <NavigateNextOutlinedIcon className='text-blue-dark' style={{ fontSize: "2rem" }} />
                    </Grid>
                  </Grid>
                </CommonButton>
                <CommonButton variant="contained" onClick={() => handleNavigate('/usagehistory')}>
                  <Grid container spacing={0} className='flex justify-center align-middle text-center'>
                    <Grid item xs={2} className='flex align-middle items-center justify-center'>
                      <HistoryRoundedIcon className='text-white bg-blue-dark rounded-lg p-1' style={{
                        fontSize: '3rem'
                      }} />
                    </Grid>
                    <Grid item xs={9} className='flex align-middle items-center justify-start pl-3'>
                      <div className="flex flex-col justify-start align-top">
                        <div className="mt-0 sm:mt-2 text-lg md:text-xl text-black font-lexend font-medium flex justify-start">Usage History</div>
                        <div className="hidden sm:flex my-2 text-sm md:text-md text-gray font-lexend font-medium justify-start text-start">Check parking space usage history</div>
                      </div>
                    </Grid>
                    <Grid item xs={1} className='flex align-middle items-center justify-center'>
                      <NavigateNextOutlinedIcon className='text-blue-dark' style={{ fontSize: "2rem" }} />
                    </Grid>
                  </Grid>
                </CommonButton>
                <CommonButton variant="contained" onClick={() => handleNavigate('/currentstatus')}>
                  <Grid container spacing={0} className='flex justify-center align-middle text-center'>
                    <Grid item xs={2} className='flex align-middle items-center justify-center'>
                      <DirectionsCarFilledOutlinedIcon className='text-white bg-blue-dark rounded-lg p-1' style={{
                        fontSize: '3rem'
                      }} />
                    </Grid>
                    <Grid item xs={9} className='flex align-middle items-center justify-start pl-3'>
                      <div className="flex flex-col justify-start align-top">
                        <div className="mt-0 sm:mt-2 text-lg md:text-xl text-black font-lexend font-medium flex justify-start">Current Status</div>
                        <div className="hidden sm:flex my-2 text-sm md:text-md text-gray font-lexend font-medium justify-start text-start">Check parking space current status</div>
                      </div>
                    </Grid>
                    <Grid item xs={1} className='flex align-middle items-center justify-center'>
                      <NavigateNextOutlinedIcon className='text-blue-dark' style={{ fontSize: "2rem" }} />
                    </Grid>
                  </Grid>
                </CommonButton>
              </Stack>
              {/* <button onClick={() => handleNavigate('/usageratio')}>Usage Ratio</button>
              <button onClick={() => handleNavigate('/usagehistory')}>Usage History</button>
              <button onClick={() => handleNavigate('/usageduration')}>Usage Duration</button> */}
            </div>
          )}
          <Outlet />
        </div>
      ),
      children: [
        { path: 'usageratio', element: <UsageRatio /> },
        { path: 'usagehistory', element: <UsageHistory /> },
        { path: 'usageduration', element: <UsageDuration /> },
        { path: 'currentstatus', element: <CurrentStatus /> },
        { path: 'usagehistory/:spaceId', element: <UsageHistoryDetail /> },
      ],
    },
  ]);
  return routes;
};

export default Guard;
