# VinGo

Лендінг сервісу вантажників і переїздів у Вінниці та області.
Заявки з форми надходять у Telegram-групу через бота.

## Стек

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- `motion` — анімації
- `react-hook-form` + `zod` — форма та валідація
- `lucide-react` — іконки

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm run start
```

## Змінні оточення

Скопіюйте `.env.example` у `.env.local` і заповніть. На хостингу (Vercel тощо)
ті самі змінні задаються в налаштуваннях проєкту.

| Змінна | Призначення |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Токен бота, який надсилає заявки |
| `TELEGRAM_CHAT_ID` | ID чату/групи для заявок (кілька — через кому) |
| `NEXT_PUBLIC_SITE_URL` | Адреса сайту без `/` в кінці (SEO, sitemap, прев'ю) |

## Структура

- `src/app` — сторінки (`/`, `/privacy`, 404), API заявок `api/order`, SEO-файли
- `src/components/sections` — секції головної сторінки
- `src/components/layout` — шапка, футер, мобільне меню й панель дій
- `src/components/ui` — базові компоненти
- `src/features/order-form` — форма заявки
- `src/config/site.ts` — контакти, адреса сайту, посилання
