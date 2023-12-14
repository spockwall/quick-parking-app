import Joi from "joi";
import { Role, Status, State } from "@prisma/client";

export const createUserSchema = Joi.object({
  userId: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(...Object.values(Role))
    .required(),
});

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  userId: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  role: Joi.string()
    .valid(...Object.values(Role))
    .required(),
  status: Joi.string()
    .valid(...Object.values(Status))
    .required(),
  licensePlates: Joi.array(),
});

export const parkingSpaceSchema = Joi.object({
  spaceId: Joi.string().required(),
  state: Joi.string()
    .valid(...Object.values(State))
    .required(),
  status: Joi.string()
    .valid(...Object.values(Status))
    .required(),
  floor: Joi.number().required(),
  lot: Joi.number().required(),
});

export const recordSchema = Joi.object({
  spaceId: Joi.string().required(),
  userId: Joi.string(),
  licensePlateNumber: Joi.string().required(),
  enterTime: Joi.number().integer(),
  exitTime: Joi.number().integer().optional(),
});

export const licensePlateSchema = Joi.object({
  licensePlateNumber: Joi.string().required(),
  userId: Joi.string().required(),
});
