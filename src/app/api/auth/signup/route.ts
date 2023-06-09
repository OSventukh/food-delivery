import { prisma } from '@/utils/prisma';
import { Prisma } from '@prisma/client'

import { NextResponse } from 'next/server';
import { HttpError, errorResponse } from '@/utils/error';

export async function POST(request: Request) {
  try {
    const user = await request.json();
    console.log(user);
    if (
      user.firstname.trim() === '' ||
      user.phone.trim() === '' ||
      user.address.street.trim() === '' ||
      user.address.house.trim() === ''
    ) {
      throw new HttpError('Incorect Data', 400);
    }

    const existingUser = await prisma.user.findUnique({
      where: { phone: user.phone },
    });

    if (existingUser && !existingUser.password) {
      await prisma.user.update({
        where: { phone: user.phone },
        data: {
          firstname: user.firstname,
          lastname: user?.lastname,
          email: user.email,
          address: {
            city: 'Kyiv',
            street: user.address.street,
            house: user.address.house,
          },
        },
      });
    }

    if (existingUser && existingUser.password) {
      throw new HttpError('User already exist', 400);
    }

    await prisma.user.create({
      data: {
        firstname: user.firstname,
        lastname: user?.lastname,
        phone: user.phone,
        email: user.email,
        password: user.password,
        address: {
          city: 'Kyiv',
          street: user.address.street,
          house: user.address.house,
        },
      },
    });
    return NextResponse.json(
      {
        message: 'User was created successfully',
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      if (error?.meta?.target === 'User_email_key') {
        const error = new HttpError('User with this email already exist', 400)
        return errorResponse(error)
      }
    }
    console.log(error)
    return errorResponse(error);
  }
}
