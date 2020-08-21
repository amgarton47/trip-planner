import mapboxgl from "mapbox-gl";
import marker from "./marker";
import token from "../accessToken";

mapboxgl.accessToken = token;

const map = new mapboxgl.Map({
  container: "map",
  center: [-87.65332, 41.92136],
  zoom: 11,
  style: "mapbox://styles/mapbox/streets-v10",
});

const home = marker("hotel", [-87.6673, 41.95827]);
home.addTo(map);

const highschool = marker("activity", [-87.62793, 41.872898]);
highschool.addTo(map);

const elpres = marker("restaurant", [-87.66863, 41.92861]);
elpres.addTo(map);
