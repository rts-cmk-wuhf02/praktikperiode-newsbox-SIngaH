document.addEventListener("DOMContentLoaded", ()=>{
    //----------------checked - not checked
    let europe = document.querySelector(".europe-check");
    let health = document.querySelector(".health-check");
    let sport = document.querySelector(".sport-check");
    let business = document.querySelector(".business-check");
    let travel = document.querySelector(".travel-check");

    let europeCheck = localStorage.getItem("europeCheck");
    let healthCheck = localStorage.getItem("healthCheck");
    let sportCheck = localStorage.getItem("sportCheck");
    let businessCheck = localStorage.getItem("businessCheck");
    let travelCheck = localStorage.getItem("travelCheck");

    if(europeCheck === null){
        localStorage.setItem("europeCheck", europe.checked);
    }
    if(healthCheck === null){
        localStorage.setItem("healthCheck", health.checked);
    }
    if(sportCheck === null){
        localStorage.setItem("sportCheck", sport.checked);
    }
    if(businessCheck === null){
        localStorage.setItem("businessCheck", business.checked);
    }
    if(travelCheck === null){
        localStorage.setItem("travelCheck", travel.checked);
    }
//europe
   europe.addEventListener("click", Echecked);

    function Echecked() {	
        localStorage.setItem("europeCheck", europe.checked);
    }
    
    //loading
    let checked = JSON.parse(localStorage.getItem("europeCheck"));
    europe.checked = checked;  

//health
    health.addEventListener("click", Hchecked);

    function Hchecked() {	
        localStorage.setItem("healthCheck", health.checked);
    }

    //loading
    let healthchecked = JSON.parse(localStorage.getItem("healthCheck"));
    health.checked = healthchecked;  

//sport
    sport.addEventListener("click", Schecked);

    function Schecked() {	
        localStorage.setItem("sportCheck", sport.checked);
    }

    //loading
    let sportchecked = JSON.parse(localStorage.getItem("sportCheck"));
    sport.checked = sportchecked;  

//business
    business.addEventListener("click", Bchecked);

    function Bchecked() {	
        localStorage.setItem("businessCheck", business.checked);
    }

    //loading
    let businesscheck = JSON.parse(localStorage.getItem("businessCheck"));
    business.checked = businesscheck;  

//travel
    travel.addEventListener("click", Tchecked);

    function Tchecked() {	
        localStorage.setItem("travelCheck", travel.checked);
    }

    //loading
    let travelcheck = JSON.parse(localStorage.getItem("travelCheck"));
    travel.checked = travelcheck;  

});