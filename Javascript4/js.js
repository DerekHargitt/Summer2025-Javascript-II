/* Derek Hargitt 07/20/2025
Adapted from https://javascript30.com/
(02 - JS and CSS Clock) */
  //Updated the script to allow the user to select a timezone, and see the current time in analog and digital
  const secondHand = document.querySelector('.second-hand');//Select the second hand element
  const minsHand = document.querySelector('.min-hand');//Select the minute hand element
  const hourHand = document.querySelector('.hour-hand');//Select the hour hand element
  const timeText = document.getElementById('timeText');//Select the element where digital time will be shown
  const timezoneSelect = document.getElementById('timezoneSelect');//Select the dropdown for timezone selection
  //Update both the analog and digital clock
  function setDate() {
    const now = new Date();//Get the current time (in local time)
    const timeZone = timezoneSelect.value;//Get the currently selected timezone from the dropdown
    //Create a formatter that will output time parts (hour, minute, second) in the selected timezone, using 24-hour format (hour12: false)
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  //Break the formatted time into labeled parts and reduce it into an object like { hour: 13, minute: 45, second: 30 }
  const parts = formatter.formatToParts(now).reduce((acc, part) => {
    if (part.type !== 'literal')//Skip ":" characters between parts
      acc[part.type] = parseInt(part.value);//Convert the value to an integer and store it in the object
    return acc;//Return the updated object
  }, {});
  const hour = parts.hour;//Get the hour
  const mins = parts.minute;//Get the minute
  const seconds = parts.second;//Get the second
  const secondsDegrees = ((seconds / 60) * 360) + 90;//Get the rotation angle for the second hand
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;//Get the rotation angle for the minute hand
  const hourDegrees = ((hour % 12) / 12 * 360) + ((mins / 60) * 30) + 90;//Get the rotation angle for the hour hand
  //Set the hand elements to the rotations
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  //Format the digital time string as HH:MM:SS with leading zeroes
  const timeString = `${hour.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  //Update the digital time display
  timeText.textContent = timeString;
}
//When the user changes the timezone dropdown, update the clock
timezoneSelect.addEventListener('change', setDate);
//Call setDate every second to update the clock
setInterval(setDate, 1000);
//Run once on page load
setDate();