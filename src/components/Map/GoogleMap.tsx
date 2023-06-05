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
    // map positioning relative to markers
    if (markersPosition && markersPosition.length > 0) {
      const bounds = new google.maps.LatLngBounds();

      markersPosition.forEach((item) => {
        bounds.extend(item);
      })

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
