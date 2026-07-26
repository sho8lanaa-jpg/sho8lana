import { NextResponse } from "next/server";

// 1. للتعامل مع طلبات البحث من الـ Frontend
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_API_URL;

        if (!webhookUrl) {
            return NextResponse.json(
                { success: false, message: "Webhook URL is missing" },
                { status: 500 }
            );
        }

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message || "Proxy server error" },
            { status: 500 }
        );
    }
}

// 2. تجنب إيرور 405 عند الفتح المباشر في المتصفح
export async function GET() {
    return NextResponse.json({
        status: "online",
        message: "Sho8lana Search Proxy API is working properly!",
    });
}