import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';
import type { User } from '@/types/models';

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user: User = await request.json();

    const createdUser = await prisma.user.create({
      data: user,
    });
    return NextResponse.json(
      {
        message: 'User was successfully created',
        user: createdUser,
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

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return NextResponse.json(
      {
        message: 'User was successfully updated',
        user: updatedUser,
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

    await prisma.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        message: 'User was successfully deleted',
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
