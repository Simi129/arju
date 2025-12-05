import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, userId, userName, language } = await request.json();

    console.log('=== RECEIVED REQUEST ===');
    console.log('Message:', message);
    console.log('UserId:', userId);
    console.log('UserName:', userName);
    console.log('Language:', language);

    if (!message || !message.trim()) {
      console.log('ERROR: Message is empty');
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Отправляем сообщение в n8n webhook
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!n8nWebhookUrl) {
      console.error('ERROR: N8N_WEBHOOK_URL is not configured');
      return NextResponse.json(
        { error: 'Chat service is not configured' },
        { status: 500 }
      );
    }

    const payload = {
      message: message.trim(),
      userId: userId || `user_${Date.now()}`,
      userName: userName || 'Website Visitor',
      language: language || 'en',
      timestamp: new Date().toISOString(),
      source: 'website_chat',
    };

    console.log('=== SENDING TO N8N ===');
    console.log('N8N URL:', n8nWebhookUrl);
    console.log('Payload:', JSON.stringify(payload, null, 2));

    // Отправляем в n8n
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('=== N8N RESPONSE ===');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('N8N Error Response:', errorText);
      throw new Error(`N8N webhook failed: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('N8N Response Data:', responseData);
    console.log('=== SUCCESS ===');

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });

  } catch (error) {
    console.error('=== ERROR ===');
    console.error('Error sending message to n8n:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}