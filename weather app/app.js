if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((res) => console.log("service worker registered"))
        .catch((err) => console.log("service worker not registered", err));
    });
  }
  
  function showNotification() {
    Notification.requestPermission((result) => {
      if (result === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification("Yahoo Weather", {
            body: "Check Your City Weather",
            icon: "./img/logo.png",
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "vibration-sample",
          });
        });
      }
    });
  }
  
  showNotification();

function onSearch(){
    var empty = document.getElementById("new")
    empty.innerHTML=""
    var search = document.getElementById("input")
    var data;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=ddd4fe361bc98bd7ee7bdf83fd4da229&units=metric`)
        .then((res)=> res.json())
        .then((res)=>{
            data = res
          if(data.cod === 200){
               var map = document.getElementById("new");
                let date = new Date().getDay();
                let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
               map.innerHTML += `
               <h1 id="currentWeather"> Weather Of ${(data.name)}</h1> 
               <h2 id="day"> Day : ${(day[date])}</h2> 
               <h3 id="weatherDescription">Weather : ${data.weather[0].description}</h3>
               <h3 id="temp">Temperature : ${data.main.temp}${`C`}</h3>
               <h3 id="humidity">Humidity : ${data.main.humidity}</h3>
               `
               
              
               var body = document.getElementById("extra")
               var currentWeather = document.getElementById("currentWeather")
               var weatherDescription = document.getElementById("weatherDescription")
               var temp = document.getElementById("temp")
               var humidity = document.getElementById("humidity")
               var img = document.getElementById("img")

               if (data.weather[0].description === "haze") {
                body.style.backgroundImage = "url('./images/haze.gif')";
                
            }
             else if(data.weather[0].description === "smoke") {
                body.style.backgroundImage = "url('./images/smoke-gif.gif')";
              
            }
            else if(data.weather[0].description === "light rain") {
                body.style.backgroundImage = "url('./images/rain.gif')";
               
            }
            else if (data.weather[0].description === "drizzle") {
                body.style.backgroundImage = "url('./images/drizzle.gif')";
                
            }else{
                body.style.backgroundImage = "url('./images/clouds.gif')";
                
            }
        }
         else {
            swal("City Not Found")
        }

        }  
    )
    .catch((error)=>{
        console.log("error",err)
    })
}



