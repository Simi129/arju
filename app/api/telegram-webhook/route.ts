import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, message, messageId } = await request.json();

    if (!message || !userId) {
      return NextResponse.json(
        { error: 'userId and message are required' },
        { status: 400 }
      );
    }

    // Здесь можно сохранить сообщение в БД или отправить через WebSocket
    // Пока просто возвращаем успех
    console.log('Received reply from Telegram:', { userId, message, messageId });

    return NextResponse.json({
      success: true,
      message: 'Reply received',
    });

  } catch (error) {
    console.error('Error processing Telegram reply:', error);
    return NextResponse.json(
      { error: 'Failed to process reply' },
      { status: 500 }
    );
  }
}