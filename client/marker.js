import mapbox from "mapbox-gl";

const icons = {
  activities: "http://i.imgur.com/WbMOfMl.png",
  hotels: "http://i.imgur.com/D9574Cu.png",
  restaurants: "http://i.imgur.com/cqR6pUI.png",
};

function marker(type, coords) {
  const markerEl = document.createElement("div");
  markerEl.style.width = "32px";
  markerEl.style.height = "39px";
  markerEl.style.backgroundImage = `url(${icons[type]})`;

  return new mapbox.Marker(markerEl).setLngLat(coords);
}

export default marker;
