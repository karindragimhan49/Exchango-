import { NextResponse } from 'next/server';

export async function POST(request) {
    const { from, to, amount } = await request.json();
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ message: 'API key is missing' }, { status: 500 });
    }
    
    if (!from || !to || !amount) {
        return NextResponse.json({ message: 'Missing required fields: from, to, amount' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`);
        if (!response.ok) {
            throw new Error('Failed to fetch conversion data');
        }
        const data = await response.json();

        return NextResponse.json({
            result: data.conversion_result,
            rate: data.conversion_rate,
        });

    } catch (error) {
        console.error('Error during conversion:', error);
        return NextResponse.json({ message: 'Conversion failed' }, { status: 500 });
    }
}