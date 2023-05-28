import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';
import type { Order, User } from '@/types/models';

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
    const { items: orderItems, user }: {items: {id: string, quantity: number}[], user: User} = await request.json();
    if (
      user.firstname.trim() === '' ||
      user.phone.trim() === '' ||
      user.address.street.trim() === '' ||
      user.address.house.trim() === ''
    ) {
      return NextResponse.json(
        {
          message: 'Incorect Data',
        },
        { status: 400 }
      );
    }
    let totalPrice = 0;
    for (const orderItem of orderItems) {
      const product = await prisma.product.findUnique({
        where: { id: orderItem.id },
      });
      if (product) {
        totalPrice += orderItem.quantity * product.price;
      }
    }

    const existingUser = await prisma.user.findUnique({
      where: { phone: user.phone },
    });

    let userId;
    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          firstname: user.firstname,
          lastname: user?.lastname,
          phone: user.phone,
          email: user.email,
          address: {
            city: 'Kyiv',
            street: user.address.street,
            house: user.address.house,
          },
        },
      });
      userId = newUser.id;
    } else {
      userId = existingUser.id;
    }

    const createdOrder = await prisma.order.create({
      data: {
        totalPrice,
        user: {
          connect: { id: userId }
        },
        items: {
          create: orderItems.map(item => ({
            quantity: item.quantity,
            product: {
              connect: { id: item.id }
            }
          }))
        }
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

    if (!id) {
      return NextResponse.json(
        {
          message: 'Id is incorect'
        },
        { status: 400 }
      );
    }
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

    if (!id) {
      return NextResponse.json(
        {
          message: 'Id is incorect'
        },
        { status: 400 }
      );
    }

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
