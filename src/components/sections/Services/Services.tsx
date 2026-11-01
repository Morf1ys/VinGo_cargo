import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AdditionalServices } from "./AdditionalServices";
import { FeaturedServices } from "./FeaturedServices";
import { ServicesCTA } from "./ServicesCTA";
import { ServicesHeader } from "./ServicesHeader";

const SERVICES_SECTION_ID = "services";

export function Services() {
  return (
    <Section id={SERVICES_SECTION_ID} spacing="compact" fill className="bg-background-primary">
      <Container size="wide">
        <ServicesHeader />
        <FeaturedServices />
        <AdditionalServices />
        <ServicesCTA />
      </Container>
    </Section>
  );
}
