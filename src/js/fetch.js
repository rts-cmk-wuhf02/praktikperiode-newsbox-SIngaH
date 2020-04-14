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
  
  if(Echeck === "false"){
    europe.style.display="none"
  }
  if(Hcheck === "false"){
    health.style.display="none"
  }
  if(Scheck === "false"){
    sport.style.display="none"
  }
  if(Bcheck === "false"){
    business.style.display="none"
  }
  if(Tcheck === "false"){
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
        //display on page
        document.querySelector(".europe .news-hide").innerHTML += `
          <div class="news grid gap-1 py-4">
              <img src="assets/images/other-img.png" alt="man surfing" class="surfing-circle">
              <h3 class="card-title"><a href="${item.link}">${item.title}</a></h3>
              <p class="body-copy-small"><a href="${item.link}">${description}</a></p>
              <div class="archive archive-europe" id="${index}">
                  <img src="assets/images/inbox-white.svg" alt="put in archive">
              </div>
          </div>
          `
          let archive = document.querySelectorAll(".archive-europe");
          let archiveArray = Array.from(archive);
          // let indexArray = [];
          let prevString = localStorage.getItem("europeChosen");
          let prevArray = prevString.split(",");
          // let string = prevString.join(",")

          for (i = 0; i < archiveArray.length; i++) {
            archiveArray[i].addEventListener("click", (e) => europeArray(e, prevString, prevArray));   
          }
          function europeArray(e, prevString, prevArray){
            let index = e.target.id
            if(index != ""){
              if(localStorage.getItem("europeChosen") === null){ 
                if(localStorage.getItem("europeChosen").includes(index) === false){
                  prevArray.push(index)
                  let string = prevString.join(",")
                  localStorage.setItem("europeChosen", string);
                  console.log(localStorage.getItem("europeChosen").includes(index))
                }
              }else if(localStorage.getItem("europeChosen") != null){
                if(localStorage.getItem("europeChosen").includes(index) === false){
                  // console.log(localStorage.getItem("europeChosen").includes(index))
                  // let prevString = localStorage.getItem("europeChosen");
                  // let prevArray = prevString.split(",");
                  prevArray.push(index)
                  let string = prevString.join(",")
                  localStorage.setItem("europeChosen", string);
                }
              }
              console.log("europe " + localStorage.getItem("europeChosen"))
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
        //display on page
        document.querySelector(".health .news-hide").innerHTML += `
          <div class="news grid gap-1 py-4">
              <img src="assets/images/other-img.png" alt="man surfing" class="surfing-circle">
              <h3 class="card-title"><a href="${item.link}">${item.title}</a></h3>
              <p class="body-copy-small"><a href="${item.link}">${description}</a></p>
              <div class="archive archive-health" id="${index}">
                  <img src="assets/images/inbox-white.svg" alt="put in archive">
              </div>
          </div>
          `
          let archive = document.querySelectorAll(".archive-health");
          let archiveArray = Array.from(archive);
          let indexArray = [];
          for (i = 0; i < archiveArray.length; i++) {
            archiveArray[i].addEventListener("click", (e) => healthArray(e, indexArray));   
          }
          function healthArray(e, indexArray){
            let index = e.target.id
            if(index != ""){
              if(localStorage.getItem("healthChosen") === null){ 
                if(indexArray.includes(index) === false){
                  indexArray.push(index)
                  let string = indexArray.join(",")
                  localStorage.setItem("healthChosen", string);
                }
              }else if(localStorage.getItem("healthChosen") != null){
                if(localStorage.getItem("healthChosen").includes(index) === false){
                  console.log(localStorage.getItem("healthChosen").includes(index))
                  let prevString = localStorage.getItem("healthChosen");
                  let prevArray = prevString.split(",");
                  prevArray.push(index)
                  localStorage.setItem("healthChosen", prevArray);
                }
              }
              console.log("health " + localStorage.getItem("healthChosen"))
            }
          }
      });
    })

  //sport fetch
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
        //display on page
        document.querySelector(".sport .news-hide").innerHTML += `
          <div class="news grid gap-1 py-4">
              <img src="assets/images/other-img.png" alt="man surfing" class="surfing-circle">
              <h3 class="card-title"><a href="${item.link}">${item.title}</a></h3>
              <p class="body-copy-small"><a href="${item.link}">${description}</a></p>
              <div class="archive archive-sport" id="${index}">
                  <img src="assets/images/inbox-white.svg" alt="put in archive">
              </div>
          </div>
          `
          let archive = document.querySelectorAll(".archive-sport");
          let archiveArray = Array.from(archive);
          let indexArray = [];
          for (i = 0; i < archiveArray.length; i++) {
            archiveArray[i].addEventListener("click", (e) => sportArray(e, indexArray));   
          }
          function sportArray(e, indexArray){
            let index = e.target.id
            if(index != ""){
              if(localStorage.getItem("sportChosen") === null){ 
                if(indexArray.includes(index) === false){
                  indexArray.push(index)
                  let string = indexArray.join(",")
                  localStorage.setItem("sportChosen", string);
                }
              }else if(localStorage.getItem("sportChosen") != null){
                if(localStorage.getItem("sportChosen").includes(index) === false){
                  console.log(localStorage.getItem("sportChosen").includes(index))
                  let prevString = localStorage.getItem("sportChosen");
                  let prevArray = prevString.split(",");
                  prevArray.push(index)
                  localStorage.setItem("sportChosen", prevArray);
                }
              }
              console.log("sport " + localStorage.getItem("sportChosen"))
            }
          }
      });
    })

  //business fetch
  fetch("https://rss.nytimes.com/services/xml/rss/nyt/Business.xml")
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
        //display on page
        document.querySelector(".business .news-hide").innerHTML += `
          <div class="news grid gap-1 py-4">
              <img src="assets/images/other-img.png" alt="man surfing" class="surfing-circle">
              <h3 class="card-title"><a href="${item.link}">${item.title}</a></h3>
              <p class="body-copy-small"><a href="${item.link}">${description}</a></p>
              <div class="archive archive-business" id="${index}">
                  <img src="assets/images/inbox-white.svg" alt="put in archive">
              </div>
          </div>
          `
          let archive = document.querySelectorAll(".archive-business");
          let archiveArray = Array.from(archive);
          let indexArray = [];
          for (i = 0; i < archiveArray.length; i++) {
            archiveArray[i].addEventListener("click", (e) => businessArray(e, indexArray));   
          }
          function businessArray(e, indexArray){
            let index = e.target.id
            if(index != ""){
              if(localStorage.getItem("businessChosen") === null){ 
                if(indexArray.includes(index) === false){
                  indexArray.push(index)
                  let string = indexArray.join(",")
                  localStorage.setItem("businessChosen", string);
                }
              }else if(localStorage.getItem("businessChosen") != null){
                if(localStorage.getItem("businessChosen").includes(index) === false){
                  console.log(localStorage.getItem("businessChosen").includes(index))
                  let prevString = localStorage.getItem("businessChosen");
                  let prevArray = prevString.split(",");
                  prevArray.push(index)
                  localStorage.setItem("businessChosen", prevArray);
                }
              }
              console.log("business " + localStorage.getItem("businessChosen"))
            }
          }
      });
    })

  //travel fetch
  fetch("https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml")
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
        //display on page
        document.querySelector(".travel .news-hide").innerHTML += `
          <div class="news grid gap-1 py-4">
              <img src="assets/images/other-img.png" alt="man surfing" class="surfing-circle">
              <h3 class="card-title"><a href="${item.link}">${item.title}</a></h3>
              <p class="body-copy-small"><a href="${item.link}">${description}</a></p>
              <div class="archive archive-travel" id="${index}">
                  <img src="assets/images/inbox-white.svg" alt="put in archive">
              </div>
          </div>
          `
          let archive = document.querySelectorAll(".archive-travel");
          let archiveArray = Array.from(archive);
          let indexArray = [];
          for (i = 0; i < archiveArray.length; i++) {
            archiveArray[i].addEventListener("click", (e) => travelArray(e, indexArray));   
          }
          function travelArray(e, indexArray){
            let index = e.target.id
            if(index != ""){
              if(localStorage.getItem("travelChosen") === null){ 
                if(indexArray.includes(index) === false){
                  indexArray.push(index)
                  let string = indexArray.join(",")
                  localStorage.setItem("travelChosen", string);
                }
              }else if(localStorage.getItem("travelChosen") != null){
                if(localStorage.getItem("travelChosen").includes(index) === false){
                  console.log(localStorage.getItem("travelChosen").includes(index))
                  let prevString = localStorage.getItem("travelChosen");
                  let prevArray = prevString.split(",");
                  prevArray.push(index)
                  localStorage.setItem("travelChosen", prevArray);
                }
              }
              console.log("travel " + localStorage.getItem("travelChosen"))
            }
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

