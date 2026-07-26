import { NextResponse } from "next/server";

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