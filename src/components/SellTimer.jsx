import React, { useState, useEffect } from "react";

export default ({ toDate }) => {
  const [time, setTime] = useState("");
  const [pct, setPct] = useState(0.0);

  const updateTimer = () => {
    var dateEntered = toDate + 86400000;
    var now = new Date();
    var difference = dateEntered - now.getTime();

    if (difference <= 0) {
      setTime("OK");
    } else {
      var seconds = Math.floor(difference / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24);
      let pct = difference / 86400000;
      setPct(pct * 100);

      hours %= 24;
      minutes %= 60;
      seconds %= 60;

      const hourText = hours < 10 ? "0" + hours : hours;
      const minutesText = minutes < 10 ? "0" + minutes : minutes;
      const secondsText = seconds < 10 ? "0" + seconds : seconds;
      setTime(hourText + ":" + minutesText + ":" + secondsText);
    }
  };

  useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [toDate]);

  return (
    <div
      style={{
        backgroundColor: "green",
        width: `${pct}%`,
        height: 2,
        marginBottom: 5,
        transition: `width 1s linear`,
        position: "absolute",
        right: "0px",
      }}
    >
      {time !== "OK" && <span className="tooltiptext">{time}</span>}
    </div>
  );
};
