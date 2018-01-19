'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

function FirstStep(){
  //Write JS code that generates the shpping price for each `shipper` from `index.js` file.
  //**distance component**: the number of kilometers multiplied by the trucker price per km
  //**volume component**: the used volume multiplied by the trucker price per m3
  //shipping price = distance + volume

  var distance = 0;
  var volume = 0;
  var trucker;

  deliveries.forEach(del => {

    distance = del.distance
    volume = del.volume;
    truckers.forEach(element => {
      if(element.id == del.truckerId){
        distance = distance * element.pricePerKm
        volume = volume * element.pricePerVolume
      }
    });
    
    //console.log("Distance price for "+ del.shipper + " : "+distance);
    //console.log("Volume price for "+ del.shipper + " : "+volume);
    var shippingPrice = distance + volume;
    //console.log("Shipping price for "+ del.shipper + " : "+shippingPrice);
    del.price = shippingPrice;
  });
}

function SecondStep(){
  /*
 To be as competitive as possible, convargo decide to have a decreasing pricing for high volumes.

#### New price rules

**price per m3**

* decreases by **10% after 5 m3**
* decreases by **30% after 10 m3**
* decreases by **50% after 25 m3**
*/

deliveries.forEach(element => {
  if(element.volume > 5 && element.volume <= 10){
    element.price -= element.price * 10/100;
  }
  else if (element.volume > 10 && element.volume <= 50){
    element.price -= element.price * 30/100;
  }
  else if (element.volume > 50){
    element.price -= element.price * 50/100;
  }
});
}

function ThirdStep(){
  /*### Step 3 - Give me all your money

  Now, it's time to pay the truckers

  Convargo take a 30% commission on the shipping price to cover their costs.

  #### Commission

  The commission is split like this:

  * **insurance**: half of commission
  * **the Treasury**: 1€ by 500km range
  * **convargo**: the rest
  */

  deliveries.forEach(element => {
    element.commission = element.price * (30/100)
    element.commission.insurance = element.commission / 2;
    element.commission.treasury = Math.trunc(element.distance / 500);
    element.convargo = element.commission - element.commission.insurance - element.commission.treasury
  });
}

  function SearchTrucker(id){
    truckers.forEach(element => {
      if(element.id == id){
        return element;
      }
    });
  }
  function FourthStep(){
    /*
    The deductible

    The driver is charged an additional 1€/m3 when he chooses the deductible reduction option.

    The additional charge goes to convargo, not to the trucker.
    */
    deliveries.forEach(element => {
      var trucker = SearchTrucker(element.truckerId);
      if(trucker.options.deductibleReduction){
        element.price += element.volume;
      }
    });
  }
console.log(truckers);
console.log(deliveries);
console.log(actors);
FirstStep();
SecondStep();
ThirdStep();
FourthStep();
