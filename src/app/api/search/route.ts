import { NextResponse } from "next/server";

const DEFAULT_N8N_URL = "https://sho8lana.app.n8n.cloud/webhook/sho8lana-search";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const webhookUrl = process.env.N8N_WEBHOOK_URL || DEFAULT_N8N_URL;

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            // لو n8n فيه مشكلة أو وقع (502)، نرجع استجابة ناجحة للفرونت مع رسالة مخصصة
            return NextResponse.json({
                success: true,
                jobs: [],
                message: "عذراً، لا توجد وظائف متاحة حالياً matching your search.",
            });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error("Proxy error:", error);
        // في حالة حدوث أي استثناء، نرجع نتائج فاضية ورسالة واضحة
        return NextResponse.json({
            success: true,
            jobs: [],
            message: "عذراً، لا توجد وظائف متاحة حالياً.",
        });
    }
}

export async function GET() {
    return NextResponse.json({ status: "online" });
}