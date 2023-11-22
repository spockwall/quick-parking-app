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
  if (lot) {
    whereCondition.lot = Number(lot);
  }
  if (floor) {
    whereCondition.floor = Number(floor);
  }

  return whereCondition;
};
