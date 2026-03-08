import { getFirstGoodDay } from "@/src/features/recommendations/recommendations.service";

interface Props {
  params: Promise<{ id: string; lat: string; lon: string }>;
}

export default async function LocationPage({ params }: Props) {
  const { id, lat, lon } = await params;

  const firstGoodDay = await getFirstGoodDay({
    lat: parseFloat(lat),
    lon: parseFloat(lon),
  });

  return firstGoodDay ? (
    <div>
      Location: {decodeURIComponent(id)}, First Good Day:{" "}
      {firstGoodDay.date.toDateString()}
    </div>
  ) : (
    <p>No good day found for {decodeURIComponent(id)}.</p>
  );
}
