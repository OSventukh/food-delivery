import { HttpError } from "./error";

export default async function getLocation(address: string): Promise<google.maps.LatLngLiteral> {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`)
    const result = await response.json();

    if (!result || result.status === 'ZERO_RESULTS') {
      throw new HttpError('Invalid address', 400);
    }
   
    return result.results[0].geometry.location;
  } catch (error) {
    const isHttpError = error instanceof HttpError;
    throw new HttpError(isHttpError ? error.message: 'Something went wrong', isHttpError ? error.status: 500)
  }
}