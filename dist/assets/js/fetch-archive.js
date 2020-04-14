document.addEventListener("DOMContentLoaded", ()=>{
  //categories show or hide
  let Echeck = localStorage.getItem("europeCheck");
  let Hcheck = localStorage.getItem("healthCheck");
  let Scheck = localStorage.getItem("sportCheck");
  let Bcheck = localStorage.getItem("businessCheck");
  let Tcheck = localStorage.getItem("travelCheck");
  
  let europe = document.querySelector(".europe");
  let health = document.querySelector(".health");
  let sport = document.querySelector(".sport");
  let business = document.querySelector(".business");
  let travel = document.querySelector(".travel");

  let europeChosen = localStorage.getItem("europeChosen");
  let healthChosen = localStorage.getItem("healthChosen");
  let sportChosen = localStorage.getItem("sportChosen"); 
  let businessChosen = localStorage.getItem("businessChosen");
  let travelChosen = localStorage.getItem("travelChosen");
  
  console.log("europe: " + europeChosen)
  console.log("health: " + healthChosen)
  console.log("sport: " + sportChosen)
  console.log("business: " + businessChosen)
  console.log("travel: " + travelChosen)
  
  if(Echeck === "false" || europeChosen === null){
    europe.style.display="none"
  }
  if(Hcheck === "false" || healthChosen === null){
    health.style.display="none"
  }
  if(Scheck === "false" || sportChosen === null){
    sport.style.display="none"
  }
  if(Bcheck === "false" || businessChosen === null){
    business.style.display="none"
  }
  if(Tcheck === "false" || travelChosen === null){
    travel.style.display="none"
  }
    
//fetches
  //europe fetch
  fetch("https://rss.nytimes.com/services/xml/rss/nyt/Europe.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const srcDom = parser.parseFromString(data, "application/xml");
      const json = xml2json(srcDom);
      
      json.rss.channel.item.forEach((item, index) => {
        //shorten description
        let description;
        if(item.description.length > 100){
          description = item.description.slice(0, 100) + "...";
        }else{
          description = item.description;
        }
        
        if(europeChosen.includes("," + index) || europeChosen.includes(index + ",")){
        //display on page
          document.querySelector(".europe .news-hide").innerHTML += `
            <div class="news grid gap-1 py-4">
                <img src="assets/images/other-img.png" alt="man surfing" class="surfing-circle">
                <h3 class="card-title"><a href="${item.link}">${item.title}</a></h3>
                <p class="body-copy-small"><a href="${item.link}">${description}</a></p>
                <div class="trash trash-europe" id="${index}">
                    <img src="assets/images/delete-white.svg" alt="remove from archive">
                </div>
            </div>
            `
            let trash = document.querySelectorAll(".trash");
            let trashArray = Array.from(trash);
            for(i = 0; i < trashArray.length; i++){
              trashArray[i].addEventListener("click", (e) => europeArray(e));
            }
            function europeArray(e){
              let index = e.target.id
              console.log(index)
            }
        }
      });
    })  

  //health fetch
  fetch("https://rss.nytimes.com/services/xml/rss/nyt/Health.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const srcDom = parser.parseFromString(data, "application/xml");
      const json = xml2json(srcDom);
      
      json.rss.channel.item.forEach((item, index) => {
        //shorten description
        let description;
        if(item.description.length > 100){
          description = item.description.slice(0, 100) + "...";
        }else{
          description = item.description;
        }

        if(healthChosen.includes("," + index) || healthChosen.includes(index + ",")){
        //display on page
          document.querySelector(".health .news-hide").innerHTML += `
            <div class="news grid gap-1 py-4">
                <img src="assets/images/other-img.png" alt="man surfing" class="surfing-circle">
                <h3 class="card-title"><a href="${item.link}">${item.title}</a></h3>
                <p class="body-copy-small"><a href="${item.link}">${description}</a></p>
                <div class="trash trash-health" id="${index}">
                    <img src="assets/images/delete-white.svg" alt="remove from archive">
                </div>
            </div>
            `
        }
      });
    })  

  //sports fetch
  fetch("https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const srcDom = parser.parseFromString(data, "application/xml");
      const json = xml2json(srcDom);
      
      json.rss.channel.item.forEach((item, index) => {
        //shorten description
        let description;
        if(item.description.length > 100){
          description = item.description.slice(0, 100) + "...";
        }else{
          description = item.description;
        }

        if(sportChosen.includes("," + index) || sportChosen.includes(index + ",")){  
        //display on page
          document.querySelector(".sport .news-hide").innerHTML += `
            <div class="news grid gap-1 py-4">
                <img src="assets/images/other-img.png" alt="man surfing" class="surfing-circle">
                <h3 class="card-title"><a href="${item.link}">${item.title}</a></h3>
                <p class="body-copy-small"><a href="${item.link}">${description}</a></p>
                <div class="trash trash-sport" id="${index}">
                    <img src="assets/images/delete-white.svg" alt="remove from archive">
                </div>
            </div>
            `
        }
      });
    })  

  //business fetch
  fetch("https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const srcDom = parser.parseFromString(data, "application/xml");
      const json = xml2json(srcDom);
      
      json.rss.channel.item.forEach((item, index) => {
        //shorten description
        let description;
        if(item.description.length > 100){
          description = item.description.slice(0, 100) + "...";
        }else{
          description = item.description;
        }

        if(businessChosen.includes("," + index) || businessChosen.includes(index + ",")){
        //display on page
          document.querySelector(".business .news-hide").innerHTML += `
            <div class="news grid gap-1 py-4">
                <img src="assets/images/other-img.png" alt="man surfing" class="surfing-circle">
                <h3 class="card-title"><a href="${item.link}">${item.title}</a></h3>
                <p class="body-copy-small"><a href="${item.link}">${description}</a></p>
                <div class="trash trash-business" id="${index}">
                    <img src="assets/images/delete-white.svg" alt="remove from archive">
                </div>
            </div>
            `
        }
      });
    })  

  //travel fetch
  fetch("https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const srcDom = parser.parseFromString(data, "application/xml");
      const json = xml2json(srcDom);
      
      json.rss.channel.item.forEach((item, index) => {
        //shorten description
        let description;
        if(item.description.length > 100){
          description = item.description.slice(0, 100) + "...";
        }else{
          description = item.description;
        }

        if(travelChosen.includes("," + index) || travelChosen.includes(index + ",")){
        //display on page
          document.querySelector(".travel .news-hide").innerHTML += `
            <div class="news grid gap-1 py-4">
                <img src="assets/images/other-img.png" alt="man surfing" class="surfing-circle">
                <h3 class="card-title"><a href="${item.link}">${item.title}</a></h3>
                <p class="body-copy-small"><a href="${item.link}">${description}</a></p>
                <div class="trash trash-travel" id="${index}">
                    <img src="assets/images/delete-white.svg" alt="remove from archive">
                </div>
            </div>
            `
        }
      });
    }) 

  function xml2json(srcDOM) {
    let children = [...srcDOM.children];
  
    // base case for recursion. 
    if (!children.length) {
      return srcDOM.innerHTML
    }
  
    // initializing object to be returned. 
    let jsonResult = {};
  
    for (let child of children) {
    
      // checking is child has siblings of same name. 
      let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;
    
      // if child is array, save the values as array, else as strings. 
      if (childIsArray) {
        if (jsonResult[child.nodeName] === undefined) {
          jsonResult[child.nodeName] = [xml2json(child)];
        } else {
          jsonResult[child.nodeName].push(xml2json(child));
        }
      } else {
        jsonResult[child.nodeName] = xml2json(child);
      }
    }
  
    return jsonResult;
  }
});  