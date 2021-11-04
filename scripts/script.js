// TOGGLE FOR THE DROPDOWN MENU
/* When the user clicks on the settings-button, 
toggle between hiding and showing the dropdown content */
document.getElementById("dropbtn").onclick =  function () {
  document.getElementById("myDropdown").classList.toggle("show");
  document.getElementById("dropbtn").classList.toggle("bigger");
}
// or when the user clicks on the cross-button hide the dropdown again and make the settings smaller
document.getElementById("cross-button").onclick = function(){
  document.getElementById("myDropdown").classList.toggle("show");
  document.getElementById("dropbtn").classList.toggle("bigger");
}

//HIDE SIGN-IN WHEN USED and ADD HOME
//if(document.getElementById("outer-wrapper-start-pomodoro"). 
document.getElementById("submitLogIn").onclick = function(){
  document.getElementById("outer-wrapper-sign-in").classList.toggle("disappear");
  document.getElementById("footerLinkSignIn").classList.toggle("disappear");
  
  var footerList = document.querySelector("#footer-list");
  var li = document.createElement("li")
  li.innerHTML = `<a href="#outer-wrapper-start-pomodoro">Home</a>`;
  footerList.appendChild(li);
}

// THE TIMER
var shortMinutes = 25; 
var longMinutes = 45; 

// If the user change the duration, update the variables with the new duration
document.getElementById("short-minutes").onchange = function(){
  shortMinutes = document.getElementById("short-minutes").value;
};
document.getElementById("long-minutes").onchange = function(){
  longMinutes = document.getElementById("long-minutes").value;
};

// Start the timer when user clicks on the button
document.getElementById("start-timer-short").onclick = function(){
  startTimer(parseInt(shortMinutes))
}
document.getElementById("start-timer-long").onclick = function(){
  startTimer(parseInt(longMinutes))
}

// STARTET TIMER
function startTimer(duration) {
  //console.log(chosenTheme);
  timer();
  var interval = setInterval(timer, 1000);
  var start = Date.now(), diff, hours, minutes, seconds;
  console.log(start);
  console.log(Date.now());

  function timer() {
    // get the number of seconds that have elapsed since startTimer() was called
    diff = duration*60 - (((Date.now() - start)/ 1000) | 0);
    console.log(diff);
    console.log(start)
    console.log(Date.now())
    // Count the hours, minutes and seconds
    hours = parseInt(diff / 60 / 60); 
    minutes = parseInt((diff / 60) % 60); 
    seconds = parseInt(diff % 60); 

    hours = hours < 10 ? "0" + hours : hours; 
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // If the timer is less than one hour, do not show the hour on the timer
    if(parseInt(hours) === 0 )
    {
      document.querySelector("#time").textContent = minutes + ":" + seconds;
    }
    else {
    document.querySelector("#time").textContent = hours + ":" + minutes + ":" + seconds;
    }
    //TIMER IS FINISHED
    //When the time is up, show the text Break (toggle the scaledown to up), end the timer and toggle the spinn so its not spinning anymore
    if (parseInt(hours) <= 0 && parseInt(minutes) <= 0 && parseInt(seconds) <= 0)
    {
      document.querySelector("#time").textContent = "BREAK";
      /*PERHAPS IMPLEMENT LATER WITH SVG-BREAK-SIGN
      document.querySelector("#time").innerHTML = `<img src="./images/${usersScreenWidth()}/break.svg" alt="BREAK-SIGN">`;*/
      clearInterval(interval);
      document.getElementById("time").classList.toggle("spinn");
      document.getElementById("wrapper-started-pomodoro").classList.toggle("scaledown");
      var auditivSignal = document.getElementById("auditivSignal"); 
      auditivSignal.play();
      setTimeout(function() {
        window.location.href = "#outer-wrapper-start-pomodoro";
      }, 16000);
      return 
    }
    // TIMER IS 10SECONDS LEFT
    // Spinn the timer when there is only 10 seconds left each second and scale down for 10 sec
     if(parseInt(hours) === 0 && parseInt(minutes) === 0 && parseInt(seconds) === 10){
      document.getElementById("time").classList.toggle("spinn");
      document.getElementById("wrapper-started-pomodoro").classList.toggle("scaledown");
    }    
  };
}



// MY THEMES IN SETTINGS
// My themes I want to add some with time..
const themes = ["Togheter", "Seasons", "Animals", "Lovecraft", "Fantasy", "Funny"];

// Function to create the html-code for themes
function getDropdown() {  
  let textAll = `<option value="">Please select</option>`;
  themes.forEach(function(theme){
  textAll += `<option value="${theme.toLowerCase()}" id="${theme.toLowerCase()}">${theme}</option>`
  })
return textAll;
}

let htmlThemes = getDropdown(); 
var select = document.getElementById("theme-dropdown");
select.innerHTML = htmlThemes;



// CHANGING THE BACKGROUNDIMAGE FOR DIFFERENT THEMES
var userTheme = "animals"; 
// when the user changes the theme, take the value and start change of the background-image
document.getElementById("theme-dropdown").onchange = function (){
userTheme = document.getElementById("theme-dropdown").value;
getImageNameRandom(userTheme);
}  

// My pyramid of doom :-)
function getImageNameRandom(paramTheme){
  let paramScreenSize = usersScreenWidth();  
  fetch("./scripts/images.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("data: " + data[0].id);
      for (let i = 0; i < data.length; i++){
  
        if (data[i].id == paramScreenSize){
  
          for(let x = 0; x < data[i].theme.length; x++){
  
            if(data[i].theme[x].name == paramTheme){
  
              var randomIndex = Math.floor(Math.random() * data[i].theme[x].adresses.length);
              imageAdress =  data[i].theme[x].adresses[randomIndex];
              var arrayBackgroundImages = document.getElementsByClassName("backgroundImage");
              for(var y = 0; y < arrayBackgroundImages.length; y++)
              {
              arrayBackgroundImages[y].style.backgroundImage =
              `url('../images/${paramScreenSize}/${paramTheme}/${imageAdress}')`;
              }
            }
          }
        }
      }
    });
  }

// returning if the user has a small, medium or big screen
function usersScreenWidth() { 
  var userScreenWidth = screen.width;
  console.log(userScreenWidth);
  if(userScreenWidth < 481){
    return "Small";
  }
  else if(userScreenWidth < 1280){
    return "Medium";
  }
  else{ 
  return "Big";
  }
}


// SCROLL
document.getElementById("link-to-sign-in").onclick = function(){
  scrollToDiv("outer-wrapper-sign-in");
}

function scrollToDiv(divId){
  var element = document.getElementById(divId);
  element.scrollIntoView({behavior: "smooth"});
}


  /* TODO OVERALL
  - animation of submit in contacts? input:avtive?  
  - Animation of the footers links.. 
  +/- set media query to every site (main..., inloggning)
  + think about the users experience and accessibility if there is no log-in-button (only the header...) 
  - go through the coloring av the webbpages
  - find a way to close the dropdown in settings when clicking outside of the dropdown-settings but NOT inside
  - connect userdata to a database
  - do a log for the users achievements during the focus-time
  */