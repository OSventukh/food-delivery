import { Wrapper, Status } from '@googlemaps/react-wrapper';
import GoogleMap from './GoogleMap';
import { SxProps } from '@mui/system';
import { Marker } from './Marker';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

type MarkerData = {
  position: google.maps.LatLngLiteral;
  title?: string;
}

export default function Map({
  center,
  zoom,
  markers,
  sx,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
  markers?: MarkerData[]
  sx: SxProps;
}) {
  const render = (status: Status) => {
    if (Status.LOADING) {
      return <CircularProgress />;
    }
    return <div />;
  };

  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} render={render}>
      <GoogleMap
        center={center}
        zoom={zoom}
        sx={sx}
        markersPosition={markers && markers.map((marker) => marker.position)} // This data is used to center the map relative to the markers
      >
        {markers && markers.map((marker, i) => <Marker key={i} position={marker.position} title={marker.title} />)}
      </GoogleMap>
    </Wrapper>
  );
}
