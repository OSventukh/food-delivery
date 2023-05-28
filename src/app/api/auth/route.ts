import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data: {phone: string} = await request.json();
    if (!data.phone || data.phone.trim() === '') {
      return new Error('Phone should not be empty')
    }

    const user = await prisma.user.findUnique({
      where: {
        phone: data.phone,
      }
    });

    if (!user) {
      throw new Error ('User not exist')
    }

    return NextResponse.json(
      {
        user: user,
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