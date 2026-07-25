import axios, { AxiosError } from "axios";
import type { SearchApiResponse, SearchRequestBody } from "@/types";

// ------------------------------------------------------------------
// The frontend NEVER talks to Serper (or any scraping provider)
// directly. Every search goes through a single n8n webhook, which
// owns the Supabase-cache-first / Serper-fallback logic server-side.
// ------------------------------------------------------------------

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const client = axios.create({
  timeout: 25_000,
  headers: { "Content-Type": "application/json" },
});

export class SearchServiceError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "SearchServiceError";
  }
}

export async function searchCompanies(
  body: SearchRequestBody
): Promise<SearchApiResponse> {
  if (!API_URL) {
    throw new SearchServiceError(
      "لسه مفيش رابط webhook متظبط. من فضلك ضيف NEXT_PUBLIC_API_URL في ملف .env"
    );
  }

  try {
    const { data } = await client.post<SearchApiResponse>(API_URL, body);

    if (!data || typeof data.success !== "boolean") {
      throw new SearchServiceError("الاستجابة من السيرفر مش بالشكل المتوقع.");
    }

    return data;
  } catch (err) {
    if (err instanceof SearchServiceError) throw err;

    const axiosErr = err as AxiosError<{ message?: string }>;
    const serverMessage = axiosErr.response?.data?.message;

    if (axiosErr.code === "ECONNABORTED") {
      throw new SearchServiceError("البحث خد وقت طويل قوي. جرب تاني.", err);
    }

    if (axiosErr.response) {
      throw new SearchServiceError(
        serverMessage ?? `حصل خطأ في السيرفر (${axiosErr.response.status}).`,
        err
      );
    }

    if (axiosErr.request) {
      throw new SearchServiceError(
        "مفيش اتصال بالسيرفر دلوقتي. اتأكد من النت وجرب تاني.",
        err
      );
    }

    throw new SearchServiceError("حصل خطأ غير متوقع أثناء البحث.", err);
  }
}
