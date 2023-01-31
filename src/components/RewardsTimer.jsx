import React, {useState, useEffect} from 'react';

export default ({toDate}) => {
  
  const [time, setTime] = useState('');
  
  const updateTimer = () =>{
  var dateEntered = toDate + 86400000;
  console.log('date: ', toDate, dateEntered)
  var now = new Date();
  var difference = dateEntered - now.getTime();

  if (difference <= 0) {
    //$("#vaulttimer").text("00:00:00");
    //clearInterval(rewardsTimer);
    const haltTimer = true;
    setTime("00:00:00");
  } else {
    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    const hourText = hours < 10 ? "0" + hours : hours;
    const minutesText = minutes < 10 ? "0" + minutes : minutes;
    const secondsText = seconds < 10 ? "0" + seconds : seconds;
    setTime(hourText + ":" + minutesText + ":" + secondsText);
  }}
  
  useEffect(() => {
    updateTimer();
    const timerInterval = set
  },[])
  
  
  return <span>{time}</span>;

}