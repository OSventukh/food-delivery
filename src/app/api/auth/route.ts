import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';
import { HttpError } from '@/utils/error';
import { comparePassword, hashPassword } from '@/utils/bcrypt';

export async function POST(request: Request) {
  try {
    const data: { phone: string; password: string } = await request.json();

    if (!data.phone || data.phone.trim() === '') {
      return new HttpError('Phone should not be empty', 400);
    }

    if (!data.password || data.password.trim() === '') {
      return new HttpError('Password should not be empty', 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        phone: data.phone,
      },
    });

    if (!user) {
      throw new HttpError('The phone or password is incorrect', 4011);
    }

    if (!user.password) {
      const updatedUser = await prisma.user.update({
        where: {
          phone: user.phone,
        },
        data: {
          password: await hashPassword(data.password),
        },
      });

      return NextResponse.json(
        {
          user: updatedUser,
        },
        { status: 201 }
      );
    }

    const isMatch = await comparePassword(data.password, user.password);

    if (!isMatch) {
      throw new HttpError('The phone or password is incorrect', 401);
    }

    return NextResponse.json(
      {
        user: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
