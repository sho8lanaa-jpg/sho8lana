# Sho8lana (شغلانة)

منصة بحث عن وظائف — المستخدم بيكتب المسمى الوظيفي والمحافظة، والفرونت اند بيبعت الطلب لـ **n8n webhook واحد بس**، واللي بدوره مسؤول عن:

```
Frontend → n8n Webhook → Supabase Cache
                              ↓ (لو مش موجود)
                          Serper Maps API → Save to Supabase → Return Results
```

الفرونت اند **مبيكلمش Serper أبدًا مباشرة** — ده كله شغل الـ n8n workflow.

## التشغيل محليًا

```bash
npm install
cp .env.example .env.local   # وحط رابط الـ n8n webhook بتاعك
npm run dev
```

المتصفح: http://localhost:3000

## متغيرات البيئة (`.env.local`)

| Variable | الوصف |
|---|---|
| `NEXT_PUBLIC_API_URL` | رابط الـ n8n webhook اللي بيستقبل `{ jobTitle, governorate }` ويرجّع `SearchApiResponse` |
| `NEXT_PUBLIC_SITE_NAME` | اسم الموقع (SEO) |
| `NEXT_PUBLIC_SITE_URL` | الدومين الأساسي (sitemap / OG tags) |

## شكل الـ Response المتوقع من الـ webhook

```json
{
  "success": true,
  "count": 24,
  "cached": true,
  "results": [
    {
      "company_name": "",
      "address": "",
      "phone": "",
      "website": "",
      "rating": 4.7,
      "maps_url": "",
      "latitude": "",
      "longitude": ""
    }
  ]
}
```

## بنية المشروع

```
src/
  app/            → صفحات Next.js (App Router): / , /search , /favorites , /history
  components/     → مكونات UI قابلة لإعادة الاستخدام
  components/ui/  → عناصر أساسية (Button, Input, Select, Card, Skeleton…)
  hooks/          → useSearch, useFavorites, useSearchHistory, useInfiniteList
  services/       → طبقة الاتصال بالـ webhook (axios)
  lib/            → zod schemas, governorates, cn/utils
  types/          → TypeScript types المشتركة
  utils/          → localStorage + share helpers
  constants/      → ثوابت المشروع
```

## ملاحظات قبل النشر (Production checklist)

- [ ] استبدل `public/icons/*` وملف `public/og-image.png` بأيقونات وصورة OG حقيقية (دلوقتي أماكن فاضية/placeholders لازم تتحط).
- [ ] ثبّت الـ dependencies وشغّل `npm run build` للتأكد إن كل حاجة شغالة على بيئتك (البيئة اللي اتبنى فيها الكود دلوقتي معندهاش اتصال إنترنت لتشغيل npm install/build).
- [ ] جهّز الـ n8n workflow (Webhook → Supabase cache check → Serper Maps fallback → Save → Respond) وحط رابطه في `NEXT_PUBLIC_API_URL`.
- [ ] فعّل جدول Supabase بالحقول المطابقة لـ `Company` type في `src/types/index.ts`.
