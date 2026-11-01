import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BenefitsGrid } from "./BenefitsGrid";
import { BenefitsHeader } from "./BenefitsHeader";

const BENEFITS_SECTION_ID = "benefits";

export function Benefits() {
  return (
    <Section id={BENEFITS_SECTION_ID} spacing="compact" fill className="bg-background-secondary">
      <Container size="wide">
        <BenefitsHeader />
        <BenefitsGrid />
      </Container>
    </Section>
  );
}
