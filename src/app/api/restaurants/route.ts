import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';
import type { Restraunt } from '@/types/models';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const restaurant = await prisma.restraunt.findUnique({
        where: {
          id,
        },
        include: {
          products: true,
        }
      });
      return NextResponse.json({ restaurant });
    }
    const restaurants = await prisma.restraunt.findMany();
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
    const { name, address }: Restraunt = await request.json();
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

    const createdRestraunt = await prisma.restraunt.create({
      data: {
        name,
        address: {
          set: address,
        },
      },
    });
    return NextResponse.json(
      {
        message: 'Restraunt was successfully created',
        restraunt: createdRestraunt,
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

    const updatedRestraunt = await prisma.restraunt.update({
      where: {
        id,
      },
      data,
    });
    return NextResponse.json(
      {
        message: 'Restraunt was successfully updated',
        restraunt: updatedRestraunt,
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

    await prisma.restraunt.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        message: 'Restraunt was successfully deleted',
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
