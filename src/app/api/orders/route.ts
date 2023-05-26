import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';
import type { Order } from '@/types/models';

export async function GET(request: Request) {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json({ orders });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { items: orderItems, userId }: Order = await request.json();

    let totalPrice = 0;
    for (const orderItem of orderItems) {
      const product = await prisma.product.findUnique({
        where: { id: orderItem.productId },
      });
      totalPrice += orderItem.quantity * product.price;
    }

    const createdOrder = await prisma.order.create({
      data: {
        items: {
          create: orderItems,
        },
        totalPrice,
        userId,
      }
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
