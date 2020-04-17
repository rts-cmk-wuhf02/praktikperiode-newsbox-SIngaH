document.addEventListener("DOMContentLoaded", ()=>{
  //categories show or hide
  let Echeck = localStorage.getItem("europeCheck");
  let Hcheck = localStorage.getItem("healthCheck");
  let Scheck = localStorage.getItem("sportCheck");
  let Bcheck = localStorage.getItem("businessCheck");
  let Tcheck = localStorage.getItem("travelCheck");

  let europeChosen = localStorage.getItem("europeChosen");
  let healthChosen = localStorage.getItem("healthChosen");
  let sportChosen = localStorage.getItem("sportChosen"); 
  let businessChosen = localStorage.getItem("businessChosen");
  let travelChosen = localStorage.getItem("travelChosen");
    
  let europe = document.querySelector(".europe");
  let health = document.querySelector(".health");
  let sport = document.querySelector(".sport");
  let business = document.querySelector(".business");
  let travel = document.querySelector(".travel");
  
  if(Echeck === "false" || europeChosen === "" || europeChosen === null){
    europe.style.display="none"
  }
  if(Hcheck === "false" || healthChosen === "" || healthChosen === null){
    health.style.display="none"
  }
  if(Scheck === "false" || sportChosen === "" || sportChosen === null){
    sport.style.display="none"
  }
  if(Bcheck === "false" || businessChosen === "" || businessChosen === null){
    business.style.display="none"
  }
  if(Tcheck === "false" || travelChosen === "" || travelChosen === null){
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
        
        let array = europeChosen.split(",")
        let indexQuote = `${index}`

        if(array.includes(indexQuote)){
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

            //swipe
            const news = document.querySelectorAll('.news');
            const newsArray = Array.from(news);
            newsArray.forEach(_C =>{
              N = _C.children.length;
  
              _C.style.setProperty('--n', N)
              
              let x0 = null;
  
              _C.addEventListener('mousedown', lock, false);
              _C.addEventListener('touchstart', lock, false);
  
              _C.addEventListener('mouseup', move, false);
              _C.addEventListener('touchend', move, false);
  
              function lock(e) { x0 = unify(e).clientX };
              
              let i = 0;
  
              function move(e) {
                if(x0 || x0 === 0) {
                  let dx = unify(e).clientX - x0, s = Math.sign(dx);
  
                  if((i > 0 || s < 0) && (i < N - 1 || s > 0))
                  _C.style.setProperty('--i', i -= s);
  
                  x0 = null
                }
              };
              _C.addEventListener('touchmove', e => {e.preventDefault()}, false)
  
              function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };
            });
                    
            //remove from archives
            let trash = document.querySelectorAll(".trash");
            let trashArray = Array.from(trash);
            for(i = 0; i < trashArray.length; i++){
              trashArray[i].addEventListener("click", (e) => europeArray(e));
            }
            function europeArray(e){
              let array = europeChosen.split(",")
              let index = e.target.id
              const theIndex = array.indexOf(index)
              if(theIndex > -1){
                array.splice(theIndex, 1)
              }
              let aString = array.join(",")
              localStorage.setItem("europeChosen", aString)
              window.location.reload();//reloader siden efter at noget er blevet fjernet}
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
        let array = healthChosen.split(",")
        let indexQuote = `${index}`

        if(array.includes(indexQuote)){
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

            swipe();
                    
            //remove from archives
            let trash = document.querySelectorAll(".trash");
            let trashArray = Array.from(trash);
            for(i = 0; i < trashArray.length; i++){
              trashArray[i].addEventListener("click", (e) => healthArray(e));
            }
            function healthArray(e){
              let array = healthChosen.split(",")
              let index = e.target.id
              const theIndex = array.indexOf(index)
              if(theIndex > -1){
                array.splice(theIndex, 1)
              }
              let aString = array.join(",")
              localStorage.setItem("healthChosen", aString)
              window.location.reload();//reloader siden efter at noget er blevet fjernet
            }
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

        let array = sportChosen.split(",")
        let indexQuote = `${index}`

        if(array.includes(indexQuote)){ 
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

            swipe();
                    
            //remove from archives
            let trash = document.querySelectorAll(".trash");
            let trashArray = Array.from(trash);
            for(i = 0; i < trashArray.length; i++){
              trashArray[i].addEventListener("click", (e) => sportArray(e));
            }
            function sportArray(e){
              let array = sportChosen.split(",")
              let index = e.target.id
              const theIndex = array.indexOf(index)
              if(theIndex > -1){
                array.splice(theIndex, 1)
              }
              let aString = array.join(",")
              localStorage.setItem("sportChosen", aString)
              window.location.reload();//reloader siden efter at noget er blevet fjernet
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

        let array = businessChosen.split(",")
        let indexQuote = `${index}`

        if(array.includes(indexQuote)){
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

            swipe();
              
            //remove from archives
            let trash = document.querySelectorAll(".trash");
            let trashArray = Array.from(trash);
            for(i = 0; i < trashArray.length; i++){
              trashArray[i].addEventListener("click", (e) => businessArray(e));
            }
            function businessArray(e){
              let array = businessChosen.split(",")
              let index = e.target.id
              const theIndex = array.indexOf(index)
              if(theIndex > -1){
                array.splice(theIndex, 1)
              }
              let aString = array.join(",")
              localStorage.setItem("businessChosen", aString)
              window.location.reload();//reloader siden efter at noget er blevet fjernet
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

        let array = travelChosen.split(",")
        let indexQuote = `${index}`

        if(array.includes(indexQuote)){
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

            swipe();
                    
            //remove from archives
            let trash = document.querySelectorAll(".trash");
            let trashArray = Array.from(trash);
            for(i = 0; i < trashArray.length; i++){
              trashArray[i].addEventListener("click", (e) => travelArray(e));
            }
            function travelArray(e){
              let array = travelChosen.split(",")
              let index = e.target.id
              const theIndex = array.indexOf(index)
              if(theIndex > -1){
                array.splice(theIndex, 1)
              }
              let aString = array.join(",")
              localStorage.setItem("travelChosen", aString)
              window.location.reload();//reloader siden efter at noget er blevet fjernet
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

  //swipe
  function swipe(){
    const news = document.querySelectorAll('.news');
    const newsArray = Array.from(news);
    newsArray.forEach(_C =>{
      N = _C.children.length;
    
      _C.style.setProperty('--n', N)
      
      let x0 = null;
    
      _C.addEventListener('mousedown', lock, false);
      _C.addEventListener('touchstart', lock, false);
    
      _C.addEventListener('mouseup', move, false);
      _C.addEventListener('touchend', move, false);
    
      function lock(e) { x0 = unify(e).clientX };
      
      let i = 0;
    
      function move(e) {
        if(x0 || x0 === 0) {
          let dx = unify(e).clientX - x0, s = Math.sign(dx);
        
          if((i > 0 || s < 0) && (i < N - 1 || s > 0))
          _C.style.setProperty('--i', i -= s);
        
          x0 = null
        }
      };
      _C.addEventListener('touchmove', e => {e.preventDefault()}, false)
    
      function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };
    });
  }
});  