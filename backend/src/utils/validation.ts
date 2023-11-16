import Joi from "joi";
import { Role, Status, State } from "@prisma/client";

//TODO register needed？
export const userSchema = Joi.object({
  email: Joi.string().email(),
  name: Joi.string(),
  id: Joi.string(),
  password: Joi.string(),
  phone: Joi.string(),
  licensePlateNumber: Joi.array().items(Joi.string()),
  role: Joi.string().valid(...Object.values(Role)),
  status: Joi.string().valid(...Object.values(Status)),
});

export const parkingSpaceSchema = Joi.object({
  SpaceId: Joi.string(),
  state: Joi.string().valid(...Object.values(State)),
  type: Joi.string().valid(...Object.values(Status)),
  startTime: Joi.number(),
  occupant: Joi.number().unsafe(),
  floor: Joi.number(),
  slot: Joi.number(),
  licensePlateNumber: Joi.string(),
});
