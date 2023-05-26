import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';
import type { Order } from '@/types/models';

export async function GET(request: Request) {
  try {
    const restaurants = await prisma.order.findMany();
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
    const order: Order = await request.json();

    const createdOrder = await prisma.order.create({
      data: order,
    });
    return NextResponse.json(
      {
        message: 'Order was successfully created',
        order: createdOrder,
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

    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data,
    });
    return NextResponse.json(
      {
        message: 'Order was successfully updated',
        order: updatedOrder,
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

    await prisma.order.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        message: 'Order was successfully deleted',
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
