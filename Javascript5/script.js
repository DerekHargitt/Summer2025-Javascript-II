/* Derek Hargitt 07/25/2025
Adapted from https://javascript30.com/
(20 - Speech Detection) */
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
const beginBtn = document.querySelector('#begin');
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    const now = new Date().toLocaleString();
    p.textContent = '[' + now + '] ' + poopScript; //added current local datetime to new line
    words.scrollIntoView({ behavior: 'smooth', block: 'end' }); //automatically scroll to the bottom when the line is added
    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
});
beginBtn.addEventListener('click', () => {
  recognition.start();
  beginBtn.style.display = 'none';
}, { once: true }); //wait for user interaction to start

//Added event listeners to update the screen reader accessibility label to announce when speech recognition starts and ends.
recognition.addEventListener('start', () => {
    document.getElementById('status').textContent = 'Speech recognition started.';
});
recognition.addEventListener('end', () => {
    document.getElementById('status').textContent = 'Speech recognition ended.';
    recognition.start();//Fixed this event listener to correctly call the speech recognition again when it ends
});

//Added a button to download the transcript to a txt file
function pad(number) {
    //pad the datetime for the txt file with leading 0's
    return number.toString().padStart(2, '0');
}
document.getElementById('download').addEventListener('click', () => {
    const blob = new Blob([words.innerText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const now = new Date();
    const formattedDate = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_` + `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}_transcript.txt`;
    link.download = formattedDate;
    link.click();
});