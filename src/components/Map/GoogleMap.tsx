import { useRef, useEffect } from 'react';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';

export default function GoogleMap ({ center, zoom, sx }: { center: {lat: number; lng: number}; zoom: number; sx?: SxProps }) {

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new window.google.maps.Map(mapRef.current!, {
      center,
      zoom,
    });
  }, [center, zoom]);

  return <Box sx={sx} ref={mapRef} />;
};