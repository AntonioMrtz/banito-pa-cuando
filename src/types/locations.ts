export { type LocationModel, type GetLocationRequest };

type LocationModel = {
  id: number;
  tags: {
    name: string;
    place: string;
  };
};

type GetLocationRequest = {
  text?: string;
};
