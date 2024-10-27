import  { useState } from 'react';
import { toast } from 'react-toastify';

function CheckTime() {
  const [statusMessages, setStatusMessages] = useState([]);
  const [timers, setTimers] = useState({});

  // Function to fetch time data from the backend
  const fetchTimeData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clock/check');
      const result = await response.json();

      const newTimers = result.reduce((acc, item) => {
        if (item.status === 'Counting down') {
          acc[item.description] = item.remainingTime.minutes * 60 + item.remainingTime.seconds;
        }
        return acc;
      }, {});

      setStatusMessages(result);
      setTimers(newTimers);

      // Start countdown only for entries that are still counting down
      startCountdown(newTimers);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Error fetching data:", error);
    }
  };

  // Start the countdown timer for each entry and update the countdown timer accordingly.
  const startCountdown = (initialTimers) => {
    Object.keys(initialTimers).forEach((description) => {
      const interval = setInterval(() => {
        setTimers((prevTimers) => {
          const newTimers = { ...prevTimers };
          if (newTimers[description] > 0) {
            newTimers[description] -= 1;
          } else {
            clearInterval(interval);
            // Update status to show "Time over" when countdown ends else show the countdown status.
            setStatusMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.description === description
                  ? { ...msg, status: 'Time over' }
                  : msg
              )
            );
          }
          return newTimers;
        });
      }, 1000);
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button onClick={fetchTimeData} className='w-[100px] h-[50px] bg-violet-950 text-white rounded m-auto mt-5 flex items-center justify-center mb-10'>
        Check Time Status
      </button>
       <div className='bg-violet-200 justify-center items-center mb-10 w-[100%]  h-auto '>
      {statusMessages.map((item) => {
        if (item.status === 'Time over' || item.status === 'Time reached') {
          return <p key={item.description} className='text-orange-900 text-xl mt-2 mb-2'>{`${item.status} for "${item.description}" `}
           <hr /></p>;
         
        } else {
          const minutes = Math.floor(timers[item.description] / 60);
          const seconds = timers[item.description] % 60;
          return (
            <p key={item.description} className='text-green-900 text-2xl'>
              Time remaining for :{item.description}: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              <hr />
            </p>
          );
        }
      })}
      </div>
    </div>
  );
}

export default CheckTime;

