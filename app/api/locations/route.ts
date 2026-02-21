import { NextRequest, NextResponse } from "next/server";
import locationsJson from "./../../data/locations/locations.json";

const LIMIT_LOCATIONS = 5;

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get("text") || "";

  const locations = locationsJson.elements;
  const filtered = text
    ? locations.filter((v) =>
        v.tags.name.toLowerCase().includes(text.toLowerCase()),
      )
    : [];

  const pagination = filtered.slice(0, LIMIT_LOCATIONS);

  return NextResponse.json(pagination);
}
