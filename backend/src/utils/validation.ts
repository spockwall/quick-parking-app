import Joi from "joi";
import { Role, Status, State } from "@prisma/client";

export const createUserSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(...Object.values(Role))
    .required(),
});

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  id: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  licensePlateNumber: Joi.array().items(Joi.string()).required(),
  role: Joi.string()
    .valid(...Object.values(Role))
    .required(),
  status: Joi.string()
    .valid(...Object.values(Status))
    .required(),
});

export const parkingSpaceSchema = Joi.object({
  spaceId: Joi.string(),
  state: Joi.string().valid(...Object.values(State)),
  status: Joi.string().valid(...Object.values(Status)),
  startTime: Joi.number(),
  occupant: Joi.string(),
  floor: Joi.number(),
  slot: Joi.number(),
  licensePlateNumber: Joi.string(),
});
