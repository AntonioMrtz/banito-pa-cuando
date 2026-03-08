import { z } from "zod";

export {
  type PhotonFeatureDTO,
  type PhotonFeaturePropertiesDTO,
  PhotonFeatureSchema,
};

interface PhotonFeatureDTO {
  features: PhotonFeaturePropertiesDTO[];
}

interface PhotonFeaturePropertiesDTO {
  type: "Feature";
  properties: {
    osm_type: string;
    osm_id: number;
    osm_key: string;
    osm_value: string;
    type: string;
    postcode?: string;
    countrycode: string;
    name: string;
    district?: string;
    city?: string;
    county?: string;
    state?: string;
    country: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

const PhotonFeaturePropertiesSchema: z.ZodType<PhotonFeaturePropertiesDTO> =
  z.object({
    type: z.literal("Feature"),
    properties: z.object({
      osm_type: z.string(),
      osm_id: z.number(),
      osm_key: z.string(),
      osm_value: z.string(),
      type: z.string(),
      postcode: z.string().optional(),
      countrycode: z.string(),
      name: z.string(),
      district: z.string().optional(),
      city: z.string().optional(),
      county: z.string().optional(),
      state: z.string().optional(),
      country: z.string(),
    }),
    geometry: z.object({
      type: z.literal("Point"),
      coordinates: z.tuple([z.number(), z.number()]),
    }),
  });

const PhotonFeatureSchema: z.ZodType<PhotonFeatureDTO> = z.object({
  features: z.array(PhotonFeaturePropertiesSchema),
});
