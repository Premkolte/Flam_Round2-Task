import { useState, useEffect } from "react";
import "./App.css";

const TotalTime = 5;


export default function App() {
  const [timeLeft, setTimeLeft] = useState(TotalTime);

  const [isrunning, setIsRunning] = useState(false);

  const [queuecnt, setQueueCnt] = useState(0);

  const [completed, setCompleted] = useState(0);

  //handle fn
  const handleQueue = () => {
    if (!isrunning) {
      setIsRunning(true);
      setTimeLeft(TotalTime);
    } else {
      setQueueCnt((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!isrunning) return;

    const timer = setInterval(() => {
      // this timer fn is changed by me to fix the change that
      // we faced at the last part of the interview
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;

        setCompleted((c) => c + 1);
      
        setQueueCnt((q) => {
          if (q > 0) return q - 1;

          setIsRunning(false);
          return 0;
        });

        //reset timerr
        return TotalTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isrunning]);

  const progress = ((TotalTime - timeLeft) / TotalTime) * 100;

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <h3>Timer Queue</h3>
        <h1>{timeLeft}s</h1>
        <p> {isrunning ? "Running" : "Stopped"}</p>


        {/* i have added custom progress bar which yo have shown in your UI at the start of the interview */}
        <div
          style={{
            height: "4px",
            background: "#f3f4f6",
            overflow: "hidden",
            margin: "14px 0",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${isrunning ? progress : 0}%`,
              background: "#2563eb",
              transition: "width 1s linear",
            }}
          />
        </div>

        <button onClick={handleQueue}>Queue Start</button>

        <p>
          In queue: {queuecnt} · Completed runs: {completed}
        </p>
      </div>
    </div>
  );
}

//timer + button
// on the button click timer will be stated from 5 sec to zero.

// if button is again click n times...
//then the timer should restart n times.

//
//time left tracking
//isrunning

//queuecnt
//completed runs
