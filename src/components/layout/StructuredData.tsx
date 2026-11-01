import { ADDITIONAL_SERVICES, FEATURED_SERVICES } from "@/components/sections/Services/Services.constants";
import { FAQ_ITEMS } from "@/components/sections/FAQ/FAQ.constants";
import { siteConfig } from "@/config/site";

// schema.org data that helps Google understand the business: a local moving
// company serving Vinnytsia, how to contact it, what it offers, and the FAQ.
// Only facts already stated on the site — no ratings or reviews are marked up.
const AREA_SERVED = [
  { "@type": "City", name: "Вінниця" },
  { "@type": "AdministrativeArea", name: "Вінницька область" },
];

export function StructuredData() {
  const business = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    image: `${siteConfig.url}/opengraph-image.jpg`,
    logo: `${siteConfig.url}/icon.png`,
    description:
      "Вантажники, квартирні та офісні переїзди у Вінниці та Вінницькій області. Перенесення меблів і техніки, підйом на поверх, вантажне таксі за потреби.",
    telephone: "+380973363733",
    areaServed: AREA_SERVED,
    address: { "@type": "PostalAddress", addressLocality: "Вінниця", addressCountry: "UA" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [siteConfig.telegram.href],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Послуги",
      itemListElement: [...FEATURED_SERVICES.map((s) => s.title), ...ADDITIONAL_SERVICES.map((s) => s.label)].map(
        (name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, areaServed: AREA_SERVED } }),
      ),
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {[business, faq].map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          // JSON.stringify output is safe here; "<" is escaped to avoid </script> injection.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
