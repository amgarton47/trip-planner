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

const populateAttractions = async () => {
  try {
    state.attractions = await fetch("/api");
    state.attractions = await state.attractions.json();
  } catch (err) {
    console.log(err);
  }

  const { hotels, restaurants, activities } = state.attractions;

  hotels.forEach((hotel) => makeOption(hotel, "hotels-choices"));
  restaurants.forEach((restaurant) =>
    makeOption(restaurant, "restaurants-choices")
  );
  activities.forEach((activity) => makeOption(activity, "activities-choices"));
};

populateAttractions();

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
  const m = marker(attractionType, attraction.place.location);
  m.addTo(map);
  map.flyTo({ center: attraction.place.location, zoom: 15 });

  const removeAttractionButton = document.createElement("button");
  removeAttractionButton.className = "remove-btn";
  removeAttractionButton.append("x");

  const itineraryItem = document.createElement("li");
  itineraryItem.className = "itinerary-item";
  itineraryItem.append(attraction.name, removeAttractionButton);

  document.getElementById(`${attractionType}-list`).append(itineraryItem);

  removeAttractionButton.addEventListener("click", () => {
    itineraryItem.remove();

    state.selectedAttractions.filter(
      (selected) =>
        selected.id !== attraction.id || selected.type !== attractionType
    );

    m.remove();
    map.flyTo({ center: [-87.65332, 41.92136], zoom: 12.3 });
  });
};
