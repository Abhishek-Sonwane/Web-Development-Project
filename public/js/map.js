mapboxgl.accessToken = map_token;
const map = new mapboxgl.Map({
  container: "map",
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  style: "mapbox://styles/mapbox/streets-v12",
  zoom: 9, // starting zoom
});

const marker1 = new mapboxgl.Marker({ color: "red" })
  .setPopup(
    new mapboxgl.Popup({ offset: 25})
      .setHTML(`<h4>${listing.location}</h4><p>Exact Location will be provived on booking</p>`)
  )
  .setLngLat(listing.geometry.coordinates)
  .addTo(map);
