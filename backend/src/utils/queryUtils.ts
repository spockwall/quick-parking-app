import { QueryParams } from "./params";

export const processQueryParams = (queryParams: Partial<QueryParams>) => {
  const { status, state, lot, floor } = queryParams;
  const whereCondition: { [key: string]: any } = {};

  if (status) {
    whereCondition.status = status;
  }
  if (state) {
    whereCondition.state = state;
  }
  if (lot !== undefined) {
    whereCondition["parkingSpace.lot"] = Number(lot);
  }
  if (floor !== undefined) {
    whereCondition["parkingSpace.floor"] = Number(floor);
  }

  return whereCondition;
};
