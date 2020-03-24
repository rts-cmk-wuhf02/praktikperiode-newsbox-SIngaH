let arrows = document.querySelector(".category-arrow");
let news = document.querySelector(".news-hide")

arrows.addEventListener("click", ()=>{
    arrows.classList.toggle("arrow-down");
    news.classList.toggle("hide");
});