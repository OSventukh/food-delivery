import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';
import type { Restaurant } from '@/types/models';
import { WorkLocation } from '@/utils/constant/city.enum';
import { HttpError, errorResponse } from '@/utils/error';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
      const restaurant = await prisma.restaurant.findUnique({
        where: {
          id,
        },
        include: {
          products: true,
        },
      });
      return NextResponse.json({ restaurant });
    }

    const restaurants = await prisma.restaurant.findMany();
    return NextResponse.json({ restaurants });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const { name, address }: Restaurant = await request.json();
    if (!name || name.trim() === '') {
      throw new HttpError('Please, enter the restaurant name', 400);
    }

    if (!address?.street) {
      throw new HttpError('Please enter the street', 400);
    }

    if (!address?.house) {
      throw new HttpError('Please, enter the house number', 404);
    }

    const createdRestaurant = await prisma.restaurant.create({
      data: {
        name,
        address: {
          set: { ...address, city: WorkLocation.Kyiv },
        },
      },
    });
  
    return NextResponse.json(
      {
        message: 'Restaurant was successfully created',
        restaurant: createdRestaurant,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      throw new HttpError('A required search parameter id was not provided', 400)
    }

    const data = await request.json();
    const updatedRestaurant = await prisma.restaurant.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        address: {
          set: { ...data.address, city: WorkLocation.Kyiv },
        },
      },
    });
    return NextResponse.json(
      {
        message: 'Restaurant was successfully updated',
        restaurant: updatedRestaurant,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return errorResponse(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      throw new HttpError('A required search parameter id was not provided', 400)
    }

    await prisma.restaurant.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        message: 'Restaurant was successfully deleted',
      },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}
