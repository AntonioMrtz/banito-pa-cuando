import { z } from "zod";

export {
  type PhotonFeatureDTO,
  type PhotonFeaturePropertiesDTO,
  PhotonFeatureSchema,
};
const PhotonFeaturePropertiesSchema = z.object({
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

const PhotonFeatureSchema = z.object({
  features: z.array(PhotonFeaturePropertiesSchema),
});

type PhotonFeaturePropertiesDTO = z.infer<typeof PhotonFeaturePropertiesSchema>;
type PhotonFeatureDTO = z.infer<typeof PhotonFeatureSchema>;
