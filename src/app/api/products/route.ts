import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';
import { HttpError, errorResponse } from '@/utils/error';

export async function GET(request: Request) {
  try {
    const products = await prisma.product.findMany({
      include: {
        restaurant: true
      }
    });
    return NextResponse.json({ products });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json();

    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        restaurant: {
          connect: {
            id: product.restaurant,
          },
        },
      },
    });
    return NextResponse.json(
      {
        message: 'Product was successfully created',
        product: createdProduct,
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
      throw new HttpError(
        'A required search parameter id was not provided',
        400
      );
    }

    const data = await request.json();

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data,
    });
    return NextResponse.json(
      {
        message: 'Product was successfully updated',
        product: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      throw new HttpError(
        'A required search parameter id was not provided',
        400
      );
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        message: 'Product was successfully deleted',
      },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}
