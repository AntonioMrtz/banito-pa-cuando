import { LocationModel } from "@/app/types/locations";
import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationModel[]>,
) {
  const filePath = path.join(process.cwd(), "data", "locations.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const locations: LocationModel[] = JSON.parse(jsonData);
  console.log(locations);

  res.status(200).json(locations);
}
