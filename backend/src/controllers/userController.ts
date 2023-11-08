import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const { offset, limit } = req.query;

    const users = await prisma.user.findMany({
      skip: parseInt(offset as string) || 0,
      take: parseInt(limit as string) || 10,
    });

    res.json({ users });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error instanceof Error ? error.message : error,
    });
  }
}

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser = req.body;

    const user = await prisma.user.create({
      data: newUser,
    });

    res.status(201).json({ message: "Create user successfully", user });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error instanceof Error ? error.message : error,
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error instanceof Error ? error.message : error,
    });
  }
};

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const updateData = req.body;

    await prisma.user.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json({ message: "Update user successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error instanceof Error ? error.message : error,
    });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: id },
    });

    res.status(204).send("Delete user successfully");
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error instanceof Error ? error.message : error,
    });
  }
}
