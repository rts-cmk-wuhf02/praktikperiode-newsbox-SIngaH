// fetch("https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml")
//   .then(response => response.text())
//   .then(data => xml2json(data))
// let parser = new DOMParser()
// let doc = parser.parseFromString("https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml", "text/html")

// // returns an HTMLDocument, which also is a Document.


// (function(DOMParser) {
// 	"use strict";

// 	var proto = DOMParser.prototype, 
//         nativeParse = proto.parseFromString;

// 	// Firefox/Opera/IE throw errors on unsupported types
// 	try {
// 		// WebKit returns null on unsupported types
// 		if ((new DOMParser()).parseFromString("https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml", "text/html")) {
// 			// text/html parsing is natively supported
// 			return;
// 		}
// 	} catch (ex) {}

// 	proto.parseFromString = function(markup, type) {
// 		if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
// 			var
// 			  doc = document.implementation.createHTMLDocument("")
// 			;
// 	      		if (markup.toLowerCase().indexOf('<!doctype') > -1) {
//         			doc.documentElement.innerHTML = markup;
//       			}
//       			else {
//         			doc.body.innerHTML = markup;
//       			}
// 			return doc;
// 		} else {
// 			return nativeParse.apply(this, arguments);
// 		}
// 	};
// }(DOMParser));

//---------------------------------------------------------------------------------------------------------------------------------
fetch("https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml")
  .then(response => response.text())
  .then(data => xml2json(data))

// converting to DOM Tree
let parser = new DOMParser()
// const srcDOM = parser.parseFromString("https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml", "application/xml");
// Converting DOM Tree To JSON. 

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
/*
  function xml2json(srcDOM) {

    const children = [...srcDOM.children];
    if (!children.length) return srcDOM.innerHTML
  
    const jsonResult = Object.create(null),
      childIsArray = (x, y) => x.filter(z => z.nodeName === y.nodeName).length > 1;
  
    for (const child of children) {
      if (!childIsArray(children, child)) jsonResult[child.nodeName] = xml2json(child);
      else {
        if (jsonResult[child.nodeName] !== undefined) jsonResult[child.nodeName].push(xml2json(child));
        else jsonResult[child.nodeName] = [xml2json(child)];
      }
    }
  
    return jsonResult;
  }
*/
// console.log(xml2json(srcDOM));

// api-key=6lepE6bPyfs9WGHPrBSf8WLesCsLylI9
// https://rss.nytimes.com/services/xml/rss/nyt/Arts.xml
/*
function xml2json(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};*/