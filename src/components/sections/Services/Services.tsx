import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AdditionalServices } from "./AdditionalServices";
import { FeaturedServices } from "./FeaturedServices";
import { ServicesCTA } from "./ServicesCTA";
import { ServicesHeader } from "./ServicesHeader";

// Id must stay in sync with the "Послуги" entry in
// src/components/layout/Header/Header.constants.ts (NAV_ITEMS) — Header is
// frozen for this task, so the value is duplicated here rather than
// importing across the layout/section boundary.
const SERVICES_SECTION_ID = "services";

export function Services() {
  return (
    <Section id={SERVICES_SECTION_ID} spacing="spacious" className="bg-background-secondary">
      <Container size="wide" className="min-[1440px]:max-w-[1320px]">
        <ServicesHeader />
        <FeaturedServices />
        <AdditionalServices />
        <ServicesCTA />
      </Container>
    </Section>
  );
}
