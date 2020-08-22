import mapboxgl from "mapbox-gl";
import marker from "./marker";
import token from "../accessToken";

import fetchAllAttractions from "./api";

mapboxgl.accessToken = token;

const map = new mapboxgl.Map({
  container: "map",
  center: [-87.65332, 41.92136],
  zoom: 11,
  style: "mapbox://styles/mapbox/streets-v10",
});

const state = {
  attractions: {},
  selectedAttractions: [],
};

// const home = marker("hotel", [-87.6673, 41.95827]);
// home.addTo(map);

// const highschool = marker("activity", [-87.62793, 41.872898]);
// highschool.addTo(map);

// const elpres = marker("restaurant", [-87.66863, 41.92861]);
// elpres.addTo(map);

const makeOption = (attraction, selector) => {
  const option = new Option(attraction.name, attraction.id);
  const select = document.getElementById(selector);
  select.appendChild(option);
};

// adds all attractions from database as options to select drop down on the D
const populateAttractions = async () => {
  state.attractions = await fetchAllAttractions();
  const { hotels, restaurants, activities } = state.attractions;

  hotels.forEach((hotel) => makeOption(hotel, "hotels-choices"));
  restaurants.forEach((restaurant) =>
    makeOption(restaurant, "restaurants-choices")
  );
  activities.forEach((activity) => makeOption(activity, "activities-choices"));
};

populateAttractions();

// create click event listeners for adding attractions to the itinerary
["hotels", "activities", "restaurants"].forEach((attTyp) => {
  document.getElementById(`${attTyp}-add`).addEventListener("click", () => {
    const attractionId = parseInt(
      document.getElementById(`${attTyp}-choices`).value
    );

    if (
      state.selectedAttractions.find(
        (att) => att.id === attractionId && att.type === attTyp
      )
    ) {
      return;
    }

    const attraction = state.attractions[attTyp].find(
      (att) => att.id === attractionId
    );

    state.selectedAttractions.push({ id: attraction.id, type: attTyp });
    addAttraction(attraction, attTyp);
  });
});

const addAttraction = (attraction, attractionType) => {
  // create and add the map marker to the DOM
  const mrk = marker(attractionType, attraction.place.location);
  mrk.addTo(map);
  map.flyTo({ center: attraction.place.location, zoom: 15 });

  // create the remove itinirary button
  const removeAttractionButton = document.createElement("button");
  removeAttractionButton.className = "remove-btn";
  removeAttractionButton.append("x");

  // create the itinerary item
  const itineraryItem = document.createElement("li");
  itineraryItem.className = "itinerary-item";
  itineraryItem.append(attraction.name, removeAttractionButton);

  // add itinerary item to dom
  document.getElementById(`${attractionType}-list`).append(itineraryItem);

  // when remove button is clicked, remove the itinerary item/marker from the DOM,
  // remove the selected attraction from state, and recenter map camera to original coords
  removeAttractionButton.addEventListener("click", () => {
    itineraryItem.remove();
    mrk.remove();

    state.selectedAttractions.filter(
      (selected) =>
        selected.id !== attraction.id || selected.type !== attractionType
    );

    map.flyTo({ center: [-87.65332, 41.92136], zoom: 12.3 });
  });
};
