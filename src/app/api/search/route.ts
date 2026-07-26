import { NextResponse } from "next/server";

// رابط الـ Webhook بتاع n8n المباشر
const DEFAULT_N8N_URL = "https://sho8lana.app.n8n.cloud/webhook/sho8lana-search";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // استخدام المتغير أو الرابط المباشر
        const webhookUrl = process.env.N8N_WEBHOOK_URL || DEFAULT_N8N_URL;

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`n8n responded with status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error("Proxy error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Proxy server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: "online",
        message: "Sho8lana Search Proxy API is working properly!",
    });
}