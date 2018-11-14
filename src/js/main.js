//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

var data = require("./precinct-district8.geo.json");

var mapElement = document.querySelector("leaflet-map");

if (mapElement) {
  var L = mapElement.leaflet;
  var map = mapElement.map;

  map.scrollWheelZoom.disable();

  var focused = false;

  var all = "win";

  var commafy = s => (s * 1).toLocaleString().replace(/\.0+$/, "");

  data.features.forEach(function(f) {
  ["Rossi", "Schrier"].forEach(function(prop) {
    f.properties[prop] = (f.properties[prop] * 100).toFixed(1);
  });
});

  var onEachFeature = function(feature, layer) {

    layer.bindPopup(ich.popup(feature.properties))
    layer.on({

      mouseover: function(e) {
        layer.setStyle({ weight: 2, fillOpacity: .8 });
      },
      mouseout: function(e) {
        if (focused && focused == layer) { return }
        layer.setStyle({ weight: 1.5, fillOpacity: 0.4 });
      }
  	});
  };

  var getColor = function(d) {
    var value = d[all];
    if (typeof value == "string") {
      value = Number(value.replace(/,/, ""));
    }
    // console.log(value)
    if (typeof value != "undefined") {
      // condition ? if-true : if-false;
     return value >= 5 ? '#C1C1C1' :
        value >= 4 ? '#C07A74' :
        value >= 3 ? '#82001D' :
        value >= 2 ? '#90AAD6' :  
        value >= 1 ? '#002A5B' : 
             '#FFFFFF' ;
    } else {
      return "E5E0D3"
    }
  };

  var style = function(feature) {
    var s = {
      fillColor: getColor(feature.properties),
      weight: 1.5,
      opacity: .25,
      color: '#000',
      fillOpacity: 0.4
    };
    return s;
  }

  var geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

}

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};

var topLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
  opacity: 1,
  pane: "markerPane",
}).addTo(map);


 map.scrollWheelZoom.disable();
 map.setView([47.420, -122.0081], 10);

