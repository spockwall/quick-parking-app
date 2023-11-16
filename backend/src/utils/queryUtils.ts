import { QueryParams } from "./params";

export const processQueryParams = (queryParams: Partial<QueryParams>) => {
  const { status, state, slot, floor } = queryParams;
  const whereCondition: { [key: string]: any } = {};

  if (status) {
    whereCondition.status = status;
  }
  if (state) {
    whereCondition.state = state;
  }
  if (slot) {
    whereCondition.slot = Number(slot);
  }
  if (floor) {
    whereCondition.floor = Number(floor);
  }

  return whereCondition;
};
