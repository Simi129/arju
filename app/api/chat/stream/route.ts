import { NextRequest } from 'next/server';

// Хранилище для SSE connections
const connections = new Map<string, ReadableStreamDefaultController>();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response('userId required', { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      // Сохраняем connection
      connections.set(userId, controller);
      
      // Отправляем keep-alive каждые 30 секунд
      const keepAlive = setInterval(() => {
        controller.enqueue(': keep-alive\n\n');
      }, 30000);

      // Очистка при закрытии
      request.signal.addEventListener('abort', () => {
        clearInterval(keepAlive);
        connections.delete(userId);
        controller.close();
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

// Функция для отправки сообщения клиенту
export function sendMessageToClient(userId: string, message: string) {
  const controller = connections.get(userId);
  if (controller) {
    const data = JSON.stringify({ message, timestamp: new Date().toISOString() });
    controller.enqueue(`data: ${data}\n\n`);
  }
}