let btn = document.querySelector("button");
let check = localStorage.getItem('theme');

if(btn === null){
    lightDark();
}else{
    lightDark();
    btn.addEventListener("click", ()=>{
        lightDark();
        if(check === "light"){
            localStorage.setItem("theme", "dark");
        }else if(check === "dark"){
            localStorage.setItem("theme", "light");
        }else{
            localStorage.setItem("theme", "dark");
        }
    });
}
function lightDark(){
    let check = localStorage.getItem('theme');
    let arrow = document.querySelectorAll(".arrow");
    let inbox = document.querySelector(".inbox");
    let settings = document.querySelector(".settings");
    if(check === "light"){
        document.documentElement.style.setProperty('--background-color', '#1B1C20');
        document.documentElement.style.setProperty('--text-color', '#fff');

        for (i = 0; i < arrow.length; i++) {
            arrow[i].src = "assets/images/arrow-white.svg";
        }

        if(inbox !== null){
            inbox.src="assets/images/inbox-white.svg";
            settings.src="assets/images/Settings-white.svg";
        }else if(settings !== null){
            settings.src="assets/images/Settings-white.svg";
        }
    }else if(check === "dark"){
        document.documentElement.style.setProperty('--background-color', '#fff');
        document.documentElement.style.setProperty('--text-color', '#1B1C20');

        for (i = 0; i < arrow.length; i++) {
            arrow[i].src = "assets/images/arrow-black.svg";
        }

        if(inbox !== null){
            inbox.src="assets/images/inbox-black.svg";
            settings.src="assets/images/Settings-black.svg";
        }else if(settings !== null){
            settings.src="assets/images/Settings-black.svg";
        }
    }else{
        document.documentElement.style.setProperty('--background-color', '#1B1C20');
        document.documentElement.style.setProperty('--text-color', '#fff');

        for (i = 0; i < arrow.length; i++) {
            arrow[i].src = "assets/images/arrow-white.svg";
        }

        if(inbox !== null){
            inbox.src="assets/images/inbox-white.svg";
            settings.src="assets/images/Settings-white.svg";
        }else if(settings !== null){
            settings.src="assets/images/Settings-white.svg";
        }
    }
}