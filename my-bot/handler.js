'use strict';
const axios = require('axios');

module.exports.getFoodLocation = async (event) => {
  const food = event.currentIntent.slots["Food"];
  const city = event.currentIntent.slots["City"];
  //const url_location = "http://api.openweathermap.org/data/2.5/weather?q=London&appid=908b7ce2e624e3a039797465c79c5627";
  const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyAoeYWg7GEjmV0Oz5rJai0g2o6zJ5mGedc";
  try {
    const res1 = await axios.get(url);
    const loc = res1.data;
    const lat = loc.results[0].geometry.location.lat.toString();
    const lng = loc.results[0].geometry.location.lng.toString();

     const url_location = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=1500&type=restaurant&keyword="+ food + "&key=AIzaSyAoeYWg7GEjmV0Oz5rJai0g2o6zJ5mGedc";
     const res2 = await axios.get(url_location);
     const loc2 = res2.data;
     var answer = loc2.results[0].name;
    // let recom = [];
    // let len = Math.min(5,loc2.length);
    for(var i = 1; i < 5; i++){
      answer = answer.concat(",  " + loc2.results[i].name);
    }
 
     return {
        
       "sessionAttributes":{},
       "dialogAction":{
         "type":"Close",
         "fulfillmentState":"Fulfilled",
         "message":{
           "contentType" : "PlainText",
           "content":"Here are the 5 options"
         },
         "responseCard": {
         
            // "contentType":"PlainText",
            // "content": answer
            "version" : 1,
            "contentType": "application/vnd.amazonaws.card.generic",
            "genericAttachments" : [
              {
                "title":"Restaurant List",
                "subTitle":"Here are the restuarants!",
                "imageUrl":"https://nuvomagazine.scdn2.secure.raxcdn.com/wp-content/uploads/2017/06/RichmondDishes_AliceClair.jpg",
                "buttons":[
                  {
                    "text":loc2.results[0].name,
                    "value":"test"
                  },
                  {
                    "text":"test",
                    "value":"test"
                  }
                ]
              }
            ]

 
          }
       }
       
     }
  } catch (err) {
    console.log(err);
  }
  
  
  
  
  
  
   
};

