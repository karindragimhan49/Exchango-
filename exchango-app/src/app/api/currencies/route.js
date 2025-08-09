import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ message: 'API key is missing' }, { status: 500 });
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
        if (!response.ok) {
            throw new Error('Failed to fetch from external API');
        }
        const data = await response.json();
        
        // Send back the supported codes array
        return NextResponse.json(data.supported_codes);

    } catch (error) {
        console.error('Error fetching currencies:', error);
        return NextResponse.json({ message: 'Failed to fetch currencies' }, { status: 500 });
    }
}