/* Derek Hargitt 07/06/2025
Adapted from https://javascript30.com/
(23 - Speech Synthesis) */

document.addEventListener('DOMContentLoaded', () => {
  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');
  msg.text = document.querySelector('[name="text"]').value;

  //Disable inputs during speech
  function setUIEnabled(enabled) {
    voicesDropdown.disabled = !enabled;
    speakButton.disabled = !enabled;
    stopButton.disabled = enabled;
    options.forEach(opt => opt.disabled = !enabled);
  }

  //Populate voices list
  function populateVoices() {
    voices = speechSynthesis.getVoices();
    const filtered = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
    if (filtered.length === 0) {
      voicesDropdown.innerHTML = '<option value="">No English voices found</option>';
      setUIEnabled(false);
      return;
    }
    voicesDropdown.innerHTML = filtered
      .map(v => `<option value="${v.name}">${v.name} (${v.lang})</option>`)
      .join('');
    //Select first voice by default
    msg.voice = filtered[0];
    voicesDropdown.value = msg.voice.name;
    setUIEnabled(true);
  }

  //Speak function - starts speech
  function speak() {
    if (!msg.text.trim()) return alert('Please enter text to speak.');
    if (!msg.voice) return alert('Please select a voice.');
    speechSynthesis.cancel(); //Cancel any existing speech
    speechSynthesis.speak(msg);
    setUIEnabled(false);
  }

  //Stop speech
  function stop() {
    speechSynthesis.cancel();
  }

  //When voice changes from dropdown
  voicesDropdown.addEventListener('change', () => {
    const selected = voices.find(v => v.name === voicesDropdown.value);
    if (selected) {
      msg.voice = selected;
    }
  });

  //Debounce helper
  let debounceTimer;
  function debounceSpeak() {
    if (speechSynthesis.speaking) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        stop();
        speak();
      }, 300);
    }
  }

  //On pitch or rate input change
  options.forEach(option => {
    option.addEventListener('input', (e) => {
      msg[e.target.name] = e.target.value;
      if (e.target.name !== 'text') {
        debounceSpeak();
      } else {
        //Update msg.text but don't restart speech automatically
        msg.text = e.target.value;
      }
    });
  });

  speakButton.addEventListener('click', speak);
  stopButton.addEventListener('click', stop);

  //When speech ends or is canceled
  msg.addEventListener('end', () => setUIEnabled(true));
  msg.addEventListener('error', (e) => {
    setUIEnabled(true);
  });

  //Populate voices once on load and when voices change
  populateVoices();
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
});