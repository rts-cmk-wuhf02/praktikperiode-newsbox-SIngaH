let btn = document.querySelector("button");
if(btn === null){
    lightDark();
    // window.location.reload() - find a way to run this only once
}else{
    lightDark();
    btn.addEventListener("click", ()=>{
        lightDark();
    });
}
function lightDark(){
    let check = localStorage.getItem('theme');
    let arrow = document.querySelectorAll(".arrow");
    let inbox = document.querySelector(".inbox");
    let settings = document.querySelector(".settings");
    if(check === "light"){
        localStorage.setItem("theme", "dark");
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
        localStorage.setItem("theme", "light");
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
        localStorage.setItem("theme", "dark");
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
// works across pages but you have to reload first