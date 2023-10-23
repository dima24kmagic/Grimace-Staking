import { useEffect, useState } from "react";

const useTimeLeft = (time) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const timeDifference = time - Date.now();

      if (timeDifference <= 0) {
        // Auction has ended
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      const remainingHours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const remainingMinutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const remainingSeconds = Math.floor(
        (timeDifference % (1000 * 60)) / 1000
      );

      setHours(remainingHours);
      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);
    };

    // Update the time left every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return { hours, minutes, seconds };
};

export default useTimeLeft;
