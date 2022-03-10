
// we use these DOM variables in further function 
var date = document.getElementById("date");
var time = document.getElementById("time");
var ampm = document.getElementById("am-pm");
var alaramContainer = document.getElementsByClassName("alaram-container");
var da = new Date();
var audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg")
var count = 0;

//  this function set the  current time in dom 
setInterval(function () {
    let da = new Date();
    var hour = da.getHours();
    var minutes = da.getMinutes();
    var sec = da.getSeconds();
    var am_pm = "Am";


    if (hour > 12) {
        am_pm = "Pm";
        hour = hour - 12;
        if (hour < 10) {
            hour = "0" + hour;
        }

    }
    if (hour == 0) {
        hour = 12;
    }

    minutes = minutes < 10 ? "0" + minutes : minutes;
    sec = sec < 10 ? "0" + sec : sec;

    time.innerHTML = hour + ":" + minutes + ":" + sec + " ";
    ampm.innerHTML = am_pm;
}, 1000);


// there are we set current date 

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

date.innerHTML = weekday[da.getDay()] + "-" + month[da.getMonth()] + " " + da.getDate() + "." + da.getFullYear();




//   now we are going to set new alarams in our upcoming alaram list using setAlaram function 

var alaramvalue = null;
var alaramout = null;


//   getalaram function collect change value 
function getalaram(value) {
    alaramvalue = value;

}

// now we have value which we are going to set in alaram list 

function setAlaram() {
    // console.log(alaramvalue);
    if (alaramvalue) {
        const current = new Date();
        const settime = new Date(alaramvalue);

        var timeout = settime.getTime() - current.getTime();
        console.log(current.getTime());

        alaramout = setTimeout(() => {
            audio.play()
        }, timeout);

    }
    // alarm data is set now we are going to create new element using this data 

    createAlarm();

}

var newbutton;
function createAlarm() {


    count++;
    var newcontainer = document.createElement("div");
    newcontainer.classList.add("containers");
    newcontainer.id = `alarm-${count}`;

    var newsetAlarm = document.createElement("p");
    newsetAlarm.innerText = alaramvalue;
    // console.log(newsetAlarm);
    newbutton = document.createElement("button");
    newbutton.classList.add(`delete-alarm`);
    newbutton.dataset.alarm = count; //data-alarm

    newbutton.innerHTML = "delete";

    newbutton.addEventListener("click", function (e) {
        let alarmCount = e.target.dataset.alarm;

        let alarm = document.querySelector(`#alarm-${alarmCount}`);

        alarm.remove();
    })




    alaramContainer[0].appendChild(newcontainer);
    newcontainer.appendChild(newsetAlarm);
    newcontainer.appendChild(newbutton);
    // console.log(newcontainer);
}





function StopAlarm() {
    audio.pause();
    if (alaramout) {
        clearInterval(alaramout);

    }
}