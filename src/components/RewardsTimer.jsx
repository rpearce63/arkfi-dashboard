import React, {useState, useEffect} from 'react';

export default () => {
  
  
  function Timer(toDate) {
  var dateEntered = toDate + 86400000;
  var now = new Date();
  var difference = dateEntered - now.getTime();

  if (difference <= 0) {
    //$("#vaulttimer").text("00:00:00");
    //clearInterval(rewardsTimer);
    const haltTimer = true;
    return "00:00:00";
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
    return hourText + ":" + minutesText + ":" + secondsText;
  }
}
}