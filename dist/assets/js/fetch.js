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
          //swipe

          const C = document.querySelectorAll('.news');
          const _C = Array.from(C);
          let x0 = null;
          
          for(x = 0; x < _C.length; x++){
            N = _C[x].children.length;
            _C[x].style.setProperty('--n', N)
            _C[x].addEventListener('mousedown', lock, false);
            _C[x].addEventListener('touchstart', lock, false);

            _C[x].addEventListener('mouseup', move(x), false);
            _C[x].addEventListener('touchend', move(x), false);
            _C[x].addEventListener('touchmove', e => {e.preventDefault()}, false)
          }
          
          
          function lock(e) { x0 = unify(e).clientX };
          
          let i = 0;

          function move(e, x) {
            if(x0 || x0 === 0) {
              let dx = unify(e).clientX - x0, s = Math.sign(dx);
              
              if((i > 0 || s < 0) && (i < N - 1 || s > 0))
              _C[x].style.setProperty('--i', i -= s);
              
              x0 = null
            }
          };

          function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };
      
                    //swipe that works on the first news article
                    /*
                    const _C = document.querySelector('.news');
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
          
                    function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };*/

          //add to archives
          let archive = document.querySelectorAll(".archive-europe");
          let archiveArray = Array.from(archive);
          let prevString = localStorage.getItem("europeChosen");
          let prevArray = prevString ? prevString.split(",") : [];

          for (i = 0; i < archiveArray.length; i++) {
            archiveArray[i].addEventListener("click", (e) => europeArray(e, prevString, prevArray));   
          }
          function europeArray(e, prevString, prevArray){
            let index = e.target.id
            if(index != ""){
              if (!localStorage.getItem("europeChosen") || !prevArray.includes(index)) {
                prevArray.push(index);
              }
              prevString = prevArray.join(",");
              localStorage.setItem("europeChosen", prevString);
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
          let prevString = localStorage.getItem("healthChosen");
          let prevArray = prevString ? prevString.split(",") : [];

          for (i = 0; i < archiveArray.length; i++) {
            archiveArray[i].addEventListener("click", (e) => healthArray(e, prevString, prevArray));   
          }
          function healthArray(e, prevString, prevArray){
            let index = e.target.id
            if(index != ""){
              if (!localStorage.getItem("healthChosen") || !prevArray.includes(index)) {
                prevArray.push(index);
              }
              prevString = prevArray.join(",");
              localStorage.setItem("healthChosen", prevString);
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
          let prevString = localStorage.getItem("sportChosen");
          let prevArray = prevString ? prevString.split(",") : [];

          for (i = 0; i < archiveArray.length; i++) {
            archiveArray[i].addEventListener("click", (e) => sportArray(e, prevString, prevArray));   
          }
          function sportArray(e, prevString, prevArray){
            let index = e.target.id
            if(index != ""){
              if (!localStorage.getItem("sportChosen") || !prevArray.includes(index)) {
                prevArray.push(index);
              }
              prevString = prevArray.join(",");
              localStorage.setItem("sportChosen", prevString);
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
          let prevString = localStorage.getItem("businessChosen");
          let prevArray = prevString ? prevString.split(",") : [];

          for (i = 0; i < archiveArray.length; i++) {
            archiveArray[i].addEventListener("click", (e) => businessArray(e, prevString, prevArray));   
          }
          function businessArray(e, prevString, prevArray){
            let index = e.target.id
            if(index != ""){
              if (!localStorage.getItem("businessChosen") || !prevArray.includes(index)) {
                prevArray.push(index);
              }
              prevString = prevArray.join(",");
              localStorage.setItem("businessChosen", prevString);
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
          let prevString = localStorage.getItem("travelChosen");
          let prevArray = prevString ? prevString.split(",") : [];

          for (i = 0; i < archiveArray.length; i++) {
            archiveArray[i].addEventListener("click", (e) => travelArray(e, prevString, prevArray));   
          }
          function travelArray(e, prevString, prevArray){
            let index = e.target.id
            if(index != ""){
              if (!localStorage.getItem("travelChosen") || !prevArray.includes(index)) {
                prevArray.push(index);
              }
              prevString = prevArray.join(",");
              localStorage.setItem("travelChosen", prevString);
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

