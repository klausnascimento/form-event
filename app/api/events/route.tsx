import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req: Request) {
  const events = await prisma.event.findMany();
  return Response.json(events, { status: 200 });
}

export async function POST(req: Request) {
  const { title, nameData } = await req.json();

  // Converter todas as datas para o formato ISO-8601
  const formattedDates = Array.isArray(nameData) ? nameData.map(date => new Date(date).toISOString()) : [new Date(nameData).toISOString()];

  const events = await prisma.event.createMany({
    data: formattedDates.map(date => ({
      title,
      nameData: date,
    })),
  });

  return Response.json(events, { status: 201 });
}
