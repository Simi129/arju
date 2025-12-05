import { NextRequest, NextResponse } from 'next/server';

// Временное хранилище сообщений (в production лучше использовать Redis или БД)
const messagesStore = new Map<string, Array<{
  text: string;
  timestamp: string;
  from: 'admin';
}>>();

// POST - получение ответа от n8n (вызывается из n8n workflow)
export async function POST(request: NextRequest) {
  try {
    const { userId, message } = await request.json();

    console.log('=== RECEIVED REPLY FROM TELEGRAM ===');
    console.log('UserId:', userId);
    console.log('Message:', message);

    if (!message || !userId) {
      return NextResponse.json(
        { error: 'userId and message are required' },
        { status: 400 }
      );
    }

    // Сохраняем сообщение в хранилище
    const userMessages = messagesStore.get(userId) || [];
    userMessages.push({
      text: message,
      timestamp: new Date().toISOString(),
      from: 'admin',
    });
    messagesStore.set(userId, userMessages);

    console.log('Message stored successfully for userId:', userId);

    return NextResponse.json({
      success: true,
      message: 'Reply received and stored',
    });

  } catch (error) {
    console.error('=== ERROR ===');
    console.error('Error processing Telegram reply:', error);
    return NextResponse.json(
      { error: 'Failed to process reply' },
      { status: 500 }
    );
  }
}

// GET - получение новых сообщений для пользователя (вызывается из ChatBot)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Получаем сообщения для пользователя
    const messages = messagesStore.get(userId) || [];
    
    // Очищаем хранилище после получения
    if (messages.length > 0) {
      messagesStore.delete(userId);
    }

    return NextResponse.json({
      success: true,
      messages: messages,
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}