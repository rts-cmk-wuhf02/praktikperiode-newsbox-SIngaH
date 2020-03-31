document.addEventListener("DOMContentLoaded", ()=>{
    let dropDownNews = document.querySelectorAll(".category-top");
    let dropDownArray = Array.from(dropDownNews);
    // let arrow = document.querySelector(".category-arrow");
    
    for (i = 0; i < dropDownArray.length; i++) {
        dropDownArray[i].addEventListener("click", arrowFunction);   
    }
    
    function arrowFunction(e){
        let next = e.target.parentElement.children[1];
        //the healine disappeared when clicked
        let headline = e.target.parentElement.children[0].children[0].children[1];
        headline.classList.remove("hide");
        next.classList.toggle("hide");        
        let arrow = e.target.children[1];
        arrow.classList.toggle("arrow-down");
    }
});