import React, { useState, useRef, useEffect } from 'react';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';

export default function GoogleMap({
  children,
  center,
  zoom,
  sx,
  markersPosition,
}: {
  children: React.ReactNode;
  center: google.maps.LatLngLiteral;
  zoom: number;
  sx?: SxProps;
  markersPosition?: google.maps.LatLngLiteral[];
}) {
  const [map, setMap] = useState<google.maps.Map>();
  const mapRef = useRef<HTMLDivElement>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow>();
  const directionsServiceRef = useRef<google.maps.DirectionsService>();
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
        })
      );
    }
  }, [center, zoom, map]);

  useEffect(() => {
    if (markersPosition && markersPosition.length > 1) {
      if (!directionsServiceRef.current) {
        directionsServiceRef.current = new google.maps.DirectionsService();
      }

      if (!directionsRendererRef.current) {
        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
        });
      }


      directionsRendererRef.current.setMap(map ? map : null);

      const waypoints = markersPosition.map((position) => ({
        location: position,
        stopover: true,
      }));

      directionsServiceRef.current.route(
        {
          origin: markersPosition[0],
          destination: markersPosition[markersPosition.length - 1],
          waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRendererRef.current?.setDirections(result);
            // getting the travel time
            const route = result?.routes[0];

            if (route) {
              const duration = route.legs.reduce(
                (total, leg) => total + leg!.duration!.value,
                0
              );
              const durationInMinutes = Math.round(duration / 60);

              if (infoWindowRef.current) {
                infoWindowRef.current.close();
              }

              const infoWindow = new google.maps.InfoWindow({
                disableAutoPan: true,
              });

              // display the travel time on the map
              infoWindow.setContent(
                `Estimated travel time: ${durationInMinutes} minutes`
              );
              infoWindow.setPosition(
                route.legs[route.legs.length - 1].end_location
              );
              infoWindow.open(map);
              
              infoWindowRef.current = infoWindow;
            }
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [map, markersPosition]);

  useEffect(() => {
    // map positioning relative to markers
    if (markersPosition && markersPosition.length > 0) {
      const bounds = new google.maps.LatLngBounds();

      markersPosition.forEach((item) => {
        bounds.extend(item);
      });

      map?.fitBounds(bounds);
    }
  }, [markersPosition, map]);

  return (
    <Box sx={sx} ref={mapRef}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </Box>
  );
}
