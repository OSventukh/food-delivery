import { Wrapper, Status } from '@googlemaps/react-wrapper';
import GoogleMap from './GoogleMap';
import { SxProps } from '@mui/system';

export default function Map({ center, zoom, sx }: { center: { lat: number, lng: number }; zoom: number; sx?: SxProps }) {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} render={render}>
      <GoogleMap center={center} zoom={zoom} sx={sx} />
    </Wrapper>
  );
}


