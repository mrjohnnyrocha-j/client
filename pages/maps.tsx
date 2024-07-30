import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Container,
  Box,
  Typography,
  Button,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { LatLngTuple } from "leaflet";
import styles from "../styles/maps/maps.module.css";
import BookRide from "../components/Maps/BookRide/BookRide";
import LocationSearch from "../components/Maps/LocationSearch/LocationSearch";
import Header from "@/Maps/Header/Header";
import Navigation from "@/Maps/Navigation/Navigation";
import { useMapEvents } from "react-leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

let L: typeof import("leaflet");
let icons: { [key: string]: L.Icon } = {};
let destinationIcon: L.Icon | undefined;

if (typeof window !== "undefined") {
  L = require("leaflet");

  icons = {
    "driving-car": new L.Icon({
      iconUrl: "/icons/car.svg",
      iconSize: [25, 25],
      iconAnchor: [12, 25],
    }),
    "foot-walking": new L.Icon({
      iconUrl: "/icons/foot.svg",
      iconSize: [25, 25],
      iconAnchor: [12, 25],
    }),
    "cycling-regular": new L.Icon({
      iconUrl: "/icons/bicycle.svg",
      iconSize: [25, 25],
      iconAnchor: [12, 25],
    }),
    "driving-hgv": new L.Icon({
      iconUrl: "/icons/hgv.svg",
      iconSize: [25, 25],
      iconAnchor: [12, 25],
    }),
    wheelchair: new L.Icon({
      iconUrl: "/icons/wheelchair.svg",
      iconSize: [25, 25],
      iconAnchor: [12, 25],
    }),
    train: new L.Icon({
      iconUrl: "/icons/train.svg",
      iconSize: [25, 25],
      iconAnchor: [12, 25],
    }),
    bus: new L.Icon({
      iconUrl: "/icons/bus.svg",
      iconSize: [25, 25],
      iconAnchor: [12, 25],
    }),
    plane: new L.Icon({
      iconUrl: "/icons/plane.svg",
      iconSize: [25, 25],
      iconAnchor: [12, 25],
    }),
  };

  destinationIcon = new L.Icon({
    iconUrl: "/icons/destination.svg",
    iconSize: [25, 25],
    iconAnchor: [12, 25],
  });
}

const calculateRoute = async (
  start: LatLngTuple,
  end: LatLngTuple,
  mode: string
) => {
  try {
    const response = await axios.get(
      `https://api.openrouteservice.org/v2/directions/${mode}`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_OPENROUTESERVICE_API_KEY,
          start: `${start[1]},${start[0]}`,
          end: `${end[1]},${end[0]}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error calculating route:", error);
    throw error;
  }
};

const transportOptions = [
  { value: "driving-car", label: "Car", icon: "/icons/car.svg" },
  { value: "foot-walking", label: "Foot", icon: "/icons/foot.svg" },
  { value: "cycling-regular", label: "Bicycle", icon: "/icons/bicycle.svg" },
  {
    value: "driving-hgv",
    label: "Heavy Goods Vehicle",
    icon: "/icons/hgv.svg",
  },
  { value: "wheelchair", label: "Wheelchair", icon: "/icons/wheelchair.svg" },
  { value: "train", label: "Train", icon: "/icons/train.svg" },
  { value: "bus", label: "Bus", icon: "/icons/bus.svg" },
  { value: "plane", label: "Plane", icon: "/icons/plane.svg" },
];

const MapsPage: React.FC = () => {
  const [tab, setTab] = useState("navigate");
  const [currentLocation, setCurrentLocation] = useState<LatLngTuple | null>(
    null
  );
  const [startLocation, setStartLocation] = useState<LatLngTuple | null>(null);
  const [endLocation, setEndLocation] = useState<LatLngTuple | null>(null);
  const [route, setRoute] = useState<any>(null);
  const [rideDialogOpen, setRideDialogOpen] = useState(false);
  const [transportMode, setTransportMode] = useState<string>("driving-car");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [navigation, setNavigation] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation: LatLngTuple = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setCurrentLocation(userLocation);
        setStartLocation(userLocation);
      });
    }
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleGoClick = async () => {
    if (startLocation && endLocation) {
      try {
        const routeData = await calculateRoute(
          startLocation,
          endLocation,
          transportMode
        );
        setRoute(routeData);
        setErrorMessage("");
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrorMessage(error.response.data.error.message);
        } else {
          setErrorMessage("An error occurred while calculating the route.");
        }
      }
    }
  };

  const handleBookRide = (start: string, end: string) => {
    console.log("Ride booked from", start, "to", end);
  };

  const handleMarkerDragEnd = async (
    position: LatLngTuple,
    isStart: boolean
  ) => {
    if (isStart) {
      setStartLocation(position);
    } else {
      setEndLocation(position);
    }
    if (startLocation && endLocation) {
      await handleGoClick();
    }
  };

  const handleLocationChange = async (value: string, isStart: boolean) => {
    const location = value.split(",").map(Number) as LatLngTuple;
    if (isStart) {
      setStartLocation(location);
    } else {
      setEndLocation(location);
    }
    if (startLocation && endLocation) {
      await handleGoClick();
    }
  };

  type MapEventsProps = {
    onMapDoubleClick: (e: any) => void;
  };

  // function MapEvents({ onMapDoubleClick }: MapEventsProps) {
  //   useMapEvents({
  //     dblclick: (e) => {
  //       onMapDoubleClick(e);
  //     },
  //   });
  //   return null;
  // }

  const handleMapDoubleClick = (e: any) => {
    const { lat, lng } = e.latlng;
    const newEndLocation: LatLngTuple = [lat, lng];
    setEndLocation(newEndLocation);
    handleLocationChange(`${lat},${lng}`, false);
  };

  const handleSearch = (query: string) => {
    axios
      .get(`/api/search/locations?query=${query}`)
      .then((response) => setFilteredItems(response.data))
      .catch((error) => console.error("Error searching locations:", error));
  };

  const handleStartClick = () => {
    console.log("Start navigation");
    setNavigation(true);
  };

  return (
    <Container className={styles.container}>
      <Header onSearch={handleSearch} />
      <Tabs
        className={styles.tab}
        value={tab}
        onChange={handleTabChange}
        centered
      >
        <Tab
          className={styles.tab}
          style={{ color: "white" }}
          label="Navigate"
          value="navigate"
        />
        <Tab
          className={styles.tab}
          style={{ color: "white" }}
          label="Go"
          value="go"
        />
        <Tab
          className={styles.tab}
          style={{ color: "white" }}
          label="Ride"
          value="ride"
        />
      </Tabs>
      <Box className={styles.tabContent}>
        {tab === "navigate" && (
          <Box className={`${styles.mapContainer} ${styles.draggable}`}>
            {currentLocation ? (
              <MapContainer
                center={currentLocation}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                <Marker
                  position={currentLocation}
                  icon={icons[transportMode]}
                  draggable
                  eventHandlers={{
                    dragend: (e) => {
                      handleMarkerDragEnd((e.target as any).getLatLng(), true);
                    },
                  }}
                >
                  <Popup>Your current location</Popup>
                </Marker>
                {route && (
                  <Polyline
                    positions={route.features[0].geometry.coordinates.map(
                      (coord: [number, number]) => [coord[1], coord[0]]
                    )}
                  />
                )}
              </MapContainer>
            ) : (
              <Typography>Loading current location...</Typography>
            )}
          </Box>
        )}
        {tab === "go" && (
          <Box className={styles.goContainer}>
            <FormControl className={styles.formControl}>
              <LocationSearch
                value={startLocation ? startLocation.join(",") : ""}
                onChange={(value) => handleLocationChange(value, true)}
              />
            </FormControl>
            <FormControl className={styles.formControl}>
              <LocationSearch
                value={endLocation ? endLocation.join(",") : ""}
                onChange={(value) => handleLocationChange(value, false)}
              />
            </FormControl>
            <Box className={styles.transportOptions}>
              {transportOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    transportMode === option.value ? "contained" : "outlined"
                  }
                  startIcon={
                    <img
                      src={option.icon}
                      alt={option.label}
                      className={styles.transportIcon}
                    />
                  }
                  onClick={() => setTransportMode(option.value)}
                  className={styles.transportButton}
                >
                  {option.label}
                </Button>
              ))}
            </Box>
            {errorMessage && (
              <Typography color="error" className={styles.errorMessage}>
                {errorMessage}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoClick}
              className={styles.goButton}
            >
              Go
            </Button>
            {route && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleStartClick}
                className={styles.startButton}
              >
                Start
              </Button>
            )}
            {navigation && <Navigation />}
            <Box className={`${styles.mapContainer} ${styles.draggable}`}>
              {currentLocation ? (
                <MapContainer
                  center={currentLocation}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                  {startLocation && (
                    <Marker
                      position={startLocation}
                      icon={icons[transportMode]}
                      draggable
                      eventHandlers={{
                        dragend: (e) => {
                          handleMarkerDragEnd(
                            (e.target as any).getLatLng(),
                            true
                          );
                        },
                      }}
                    >
                      <Popup>Start Location</Popup>
                    </Marker>
                  )}
                  {endLocation && (
                    <Marker
                      position={endLocation}
                      icon={destinationIcon}
                      draggable
                      eventHandlers={{
                        dragend: (e) => {
                          handleMarkerDragEnd(
                            (e.target as any).getLatLng(),
                            false
                          );
                        },
                      }}
                    >
                      <Popup>Destination</Popup>
                    </Marker>
                  )}
                  {route && (
                    <Polyline
                      positions={route.features[0].geometry.coordinates.map(
                        (coord: [number, number]) => [coord[1], coord[0]]
                      )}
                    />
                  )}
                  {/* <MapEvents onMapDoubleClick={handleMapDoubleClick} /> */}
                </MapContainer>
              ) : (
                <Typography>Loading current location...</Typography>
              )}
            </Box>
          </Box>
        )}
        {tab === "ride" && (
          <Box className={styles.rideContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setRideDialogOpen(true)}
              className={styles.rideButton}
            >
              Find a Ride
            </Button>
            <BookRide
              open={rideDialogOpen}
              onClose={() => setRideDialogOpen(false)}
              onBook={handleBookRide}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default MapsPage;
