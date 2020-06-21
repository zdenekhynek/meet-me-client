export const getUrl = (coord1, coord2) => {
  const baseUrl = `${process.env.REACT_APP_JOURNEY_API_HOST}/api/v1`;
  const endpointUrl = `${baseUrl}/directions`;
  return `${endpointUrl}/${coord1}/${coord2}`;
};

export const formatCoordParam = (coords) => {
  return coords.map((coord) => [coord.lat, coord.lng]);
};

export const parseResult = ({ success, data }) => {
  console.log("data", data);
  if (success) {
    return data;
  }

  console.error(`Didn't find the journeys: ${data}`);

  return [];
};

export default async (coords) => {
  const [coord1, coord2] = formatCoordParam(coords);
  const url = getUrl(coord1, coord2);

  try {
    console.log(`Requesting ${url}`);
    const result = await fetch(url).then((resp) => resp.json());
    return parseResult(result);
  } catch (err) {
    console.error(err);
  }
};
