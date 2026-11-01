import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  description:
    "Як VinGo обробляє персональні дані, залишені через форму заявки на сайті: які дані збираються, навіщо, як довго зберігаються та як їх видалити.",
  alternates: { canonical: "/privacy" },
};

const UPDATED_AT = "1 листопада 2026 р.";

interface PolicySection {
  title: string;
  paragraphs?: string[];
  list?: string[];
  /** Paragraphs rendered after the list. */
  note?: string[];
}

// Describes what the site actually does today: the form sends name, phone,
// service and optional address/comment to the team's Telegram chat; nothing
// is stored in a database; no analytics or advertising cookies. Update this
// text if any of that changes (e.g. analytics or a CRM is added).
const SECTIONS: readonly PolicySection[] = [
  {
    title: "1. Загальні положення",
    paragraphs: [
      "Ця політика пояснює, як сервіс VinGo (вантажники та переїзди у Вінниці) обробляє персональні дані, які ви залишаєте на цьому сайті. Обробка здійснюється відповідно до Закону України «Про захист персональних даних».",
      "Надсилаючи заявку через форму, ви погоджуєтеся з умовами цієї політики.",
    ],
  },
  {
    title: "2. Які дані ми отримуємо",
    list: [
      "ім'я, яке ви вказали;",
      "номер телефону;",
      "обрану послугу;",
      "адресу та коментар до заявки — лише якщо ви їх заповнили.",
    ],
    note: [
      "Якщо ви пишете нам у Telegram чи Viber або телефонуєте, ми бачимо лише ту інформацію, яку ви самі надаєте в розмові.",
    ],
  },
  {
    title: "3. Навіщо ми використовуємо дані",
    paragraphs: [
      "Виключно для обробки вашої заявки: щоб зв'язатися з вами, уточнити деталі, погодити вартість і виконати замовлення. Ми не використовуємо ваші дані для розсилок чи реклами.",
    ],
  },
  {
    title: "4. Як дані передаються та зберігаються",
    paragraphs: [
      "Заявка з форми передається захищеним з'єднанням (HTTPS) і надходить у робочий чат нашої команди в Telegram. Сайт не зберігає заявки у власній базі даних.",
      "Ми зберігаємо дані не довше, ніж це потрібно для виконання замовлення та вирішення можливих питань щодо нього.",
    ],
  },
  {
    title: "5. Передача третім особам",
    paragraphs: [
      "Ми не продаємо й не передаємо ваші дані третім особам, окрім випадків, прямо передбачених законодавством України. Для доставки заявок використовується сервіс Telegram, а для роботи сайту — хостинг-провайдер, який, як і будь-який сервер, може автоматично фіксувати технічні дані (IP-адресу, тип браузера) для забезпечення роботи та безпеки.",
    ],
  },
  {
    title: "6. Файли cookie",
    paragraphs: [
      "Сайт не використовує рекламних чи аналітичних файлів cookie і не відстежує ваші дії на інших сайтах.",
    ],
  },
  {
    title: "7. Ваші права",
    paragraphs: ["Відповідно до статті 8 Закону України «Про захист персональних даних» ви маєте право:"],
    list: [
      "знати, які ваші дані ми обробляємо та з якою метою;",
      "вимагати виправлення неточних даних;",
      "вимагати видалення своїх даних;",
      "відкликати згоду на обробку;",
      "звернутися зі скаргою до Уповноваженого Верховної Ради України з прав людини або до суду.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main id="main" className="flex-1">
      <Section spacing="default" className="relative overflow-hidden bg-background-primary">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />

        <Container size="default" className="relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-sm text-body-small font-medium text-text-secondary transition-colors duration-150 ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            На головну
          </Link>

          <Typography as="span" variant="overline" weight="semibold" color="accent" className="mt-10 block">
            Документ
          </Typography>
          <Typography as="h1" variant="h1" weight="semibold" className="mt-4 text-balance max-md:text-h2">
            Політика конфіденційності
          </Typography>
          <Typography as="p" variant="bodySmall" color="secondary" className="mt-3">
            Оновлено: {UPDATED_AT}
          </Typography>

          <div className="relative mt-10 overflow-hidden rounded-md border border-white/8 border-t-white/14 bg-linear-to-br from-white/[0.04] via-surface-default/30 to-background-primary/80 p-6 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"
            />

            <div className="flex flex-col gap-10">
              {SECTIONS.map((section) => (
                <section key={section.title}>
                  <Typography as="h2" variant="h3" weight="semibold">
                    {section.title}
                  </Typography>
                  {section.paragraphs?.map((text) => (
                    <Typography key={text} as="p" variant="body" color="secondary" className="mt-3">
                      {text}
                    </Typography>
                  ))}
                  {section.list && (
                    <ul className="mt-3 flex flex-col gap-2">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-3 text-body text-text-secondary">
                          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.note?.map((text) => (
                    <Typography key={text} as="p" variant="body" color="secondary" className="mt-3">
                      {text}
                    </Typography>
                  ))}
                </section>
              ))}

              <section>
                <Typography as="h2" variant="h3" weight="semibold">
                  8. Як з нами зв&apos;язатися
                </Typography>
                <Typography as="p" variant="body" color="secondary" className="mt-3">
                  Щоб дізнатися, які ваші дані ми маємо, виправити чи видалити їх, зверніться будь-яким
                  зручним способом:
                </Typography>
                <ul className="mt-3 flex flex-col gap-2 text-body">
                  <li>
                    <span className="text-text-secondary">Телефон / Viber: </span>
                    <a href={siteConfig.phone.href} className="font-medium text-primary underline-offset-4 hover:underline">
                      {siteConfig.phone.display}
                    </a>
                  </li>
                  <li>
                    <span className="text-text-secondary">Telegram: </span>
                    <a
                      href={siteConfig.telegram.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {siteConfig.telegram.display}
                    </a>
                  </li>
                </ul>
              </section>

              <section>
                <Typography as="h2" variant="h3" weight="semibold">
                  9. Зміни до політики
                </Typography>
                <Typography as="p" variant="body" color="secondary" className="mt-3">
                  Ми можемо оновлювати цю політику. Актуальна версія завжди доступна на цій сторінці, а дата
                  останнього оновлення вказана вгорі.
                </Typography>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
