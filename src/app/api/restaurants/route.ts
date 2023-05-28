import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';
import type { Restaurant } from '@/types/models';

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
        }
      });
      return NextResponse.json({ restaurant });
    }
    const restaurants = await prisma.restaurant.findMany();
    return NextResponse.json({ restaurants });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, address }: Restaurant = await request.json();
    if (!name || name.trim() === '')
      return NextResponse.json(
        { message: 'Name should not be an empty' },
        { status: 400 }
      );

    if (!address?.city)
      return NextResponse.json(
        { message: 'Please enter a city' },
        { status: 400 }
      );
    if (!address?.street)
      return NextResponse.json(
        { message: 'Please enter a street' },
        { status: 400 }
      );
    if (!address?.house)
      return NextResponse.json(
        { message: 'Please enter a house' },
        { status: 400 }
      );

    const createdRestaurant = await prisma.restaurant.create({
      data: {
        name,
        address: {
          set: address,
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
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const data = await request.json();

    const updatedRestaurant = await prisma.restaurant.update({
      where: {
        id,
      },
      data,
    });
    return NextResponse.json(
      {
        message: 'Restaurant was successfully updated',
        restaurant: updatedRestaurant,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

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
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
