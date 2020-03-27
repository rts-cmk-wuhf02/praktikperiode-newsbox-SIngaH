fetch("https://rss.nytimes.com/services/xml/rss/nyt/Europe.xml")
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const srcDom = parser.parseFromString(data, "application/xml");
    const json = xml2json(srcDom);

    json.rss.channel.item.forEach(item => {
      //shorten description
      let description;
      if(item.description.length > 100){
        description = item.description.slice(0, 100) + "...";
      }else{
        description = item.description;
      }
      //display on page
      document.querySelector(".news-hide").innerHTML += `
        <div class="news grid gap-1 py-4">
            <img src="assets/images/other-img.png" alt="man surfing" class="surfing-circle">
            <h3 class="card-title"><a href="${item.link}">${item.title}</a></h3>
            <p class="body-copy-small"><a href="${item.link}">${description}</a></p>
            <div class="archive">
                <img src="assets/images/inbox-white.svg" alt="put in archive">
            </div>
        </div>
        `
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