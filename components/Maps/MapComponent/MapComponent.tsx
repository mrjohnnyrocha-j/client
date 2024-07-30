import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { io } from 'socket.io-client';
import L from 'leaflet';

interface Location {
  lat: number;
  lng: number;
}

const socket = io('http://localhost:4000');

const MapComponent: React.FC = () => {
  const [location, setLocation] = useState<Location>({ lat: 51.505, lng: -0.09 });
  const [route, setRoute] = useState<Location[]>([]);
  const [instructions, setInstructions] = useState<string>('');

  const speakInstructions = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(instructions);
    speechSynthesis.speak(utterance);
  }, [instructions]);

  useEffect(() => {
    // Mock data for route and instructions
    const mockRoute: Location[] = [
      { lat: 51.505, lng: -0.09 },
      { lat: 51.51, lng: -0.1 },
      { lat: 51.52, lng: -0.12 }
    ];
    const mockInstructions = 'Turn left in 200 meters.';

    setRoute(mockRoute);
    setInstructions(mockInstructions);

    // Get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });

    // Listen for location updates
    const subscription = socket.on('locationUpdate', (data: Location) => {
      setLocation(data);
    });

    // Clean up on unmount
    return () => {
      // subscription.remove();
    };
  }, []);

  useEffect(() => {
    speakInstructions();
  }, [speakInstructions]);

  return (
    <MapContainer center={location} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={location} icon={L.icon({ iconUrl: '/path/to/your/icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })} />
      <Polyline positions={route} color="blue" />
    </MapContainer>
  );
};

export default MapComponent;
