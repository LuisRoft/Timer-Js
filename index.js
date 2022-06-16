// All variables
let minutesId = document.querySelector('#minutes');
let secondsId = document.querySelector('#seconds');
const container = document.querySelector('#container');
let buttonState = document.querySelector('#startButton');
let currentTime;
let seconds = 0;
let minutes = 0;

// Global functions
function formatValue(value) {
    return ('0' + value).slice(-2);
}



// Chronometer functions
function executeChronometer() {
    container.innerHTML = `
        <div class="chronometer-time__card">
            <p><span id="minutes">00</span>:<span id="seconds">00</span></p>
        </div>
        <div class="chronometer-buttons__card">
            <button onclick="startChronometer()" id="startButton" type="button">Start</button>
            <button onclick="stopChronometer()" type="button">Stop</button>
            <button onclick="restartChronometer()">Refresh</button>
        </div>
    `;
    minutesId = document.querySelector('#minutes');
    secondsId = document.querySelector('#seconds');  
    buttonState = document.querySelector('#startButton');  
    restartChronometer();
}

function startChronometer() {
    buttonState.disabled = true;
    currentTime = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            minutesId.textContent = formatValue(minutes);
        }
        secondsId.textContent = formatValue(seconds);
    }, 1000)
}

function stopChronometer() {
    buttonState.disabled = false;
    clearInterval(currentTime);
}

function restartChronometer() {
    stopChronometer()
    seconds = 0;
    minutes = 0;
    secondsId.textContent = '00';
    minutesId.textContent = '00';
}


// Timer Functions
function startTimer() {
    event.preventDefault();
    minutes = parseInt(event.target.minutesInput.value);
    seconds = parseInt(event.target.secondsInput.value);

    if (Number.isNaN(minutes)) {
        minutes = 0;
    } 

    if (Number.isNaN(seconds)) {
        seconds = 0;
    } 


    minutesId.textContent = formatValue(minutes);
    secondsId.textContent = formatValue(seconds);
    
    
    currentTime = setInterval(() => {
        if (minutes > 0 || seconds > 0) {
            seconds--;
            if (seconds === -1) {
                minutes--;
                seconds = 59;
            }

            if (seconds === 0 && minutes === 0) {
                clearInterval(currentTime);
                buttonState.disabled = false;
            }

            minutesId.textContent = formatValue(minutes);
            secondsId.textContent = formatValue(seconds);
        }
    }, 1000)    
}

function executeTimer() {
    container.innerHTML = `
        <div class="chronometer-time__card">
            <p><span id="minutes">00</span>:<span id="seconds">00</span></p>
        </div>
        <div class="chronometer-buttons__card">
            <form onsubmit="startTimer()">
                <input type="number" placeholder="Enter a number" name="minutesInput">
                <input type="number" placeholder="Enter a number" name="secondsInput">
                <input type="submit" id="startButton" value="Start">
            </form>
        </div>
    `;
    minutesId = document.querySelector('#minutes');
    secondsId = document.querySelector('#seconds');
    buttonState = document.getElementById("startButton").disabled;    
}

