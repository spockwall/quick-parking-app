import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';

const app = express();

app.use(express.json());
const prisma = new PrismaClient();
app.use(cors());

app.post("/api/ParkingSpace/create", async (req, res) => {
  try {
    const {
      parkingSpaceId,
      state,
      type,
      startTime,
      occupant,
      licensePlateNumber,
      floor,
      lot,
    } = req.body;

    const createdParkingSpace = await prisma.parkingSpace.create({
      data: {
        parkingSpaceId,
        state,
        type,
        startTime,
        occupant,
        licensePlateNumber,
        floor,
        lot,
      },
    });

    res.json({
      message: "Parking space created successfully",
      parkingSpace: createdParkingSpace,
    });
  } catch (error) {
    console.error('Error creating parking space:', error);
    res.status(500).json({ error: "Could not create parking space" });
  }
});


app.listen(8000, () => {
  console.log("Server running on localhost:8000");
});

