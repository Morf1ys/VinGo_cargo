import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BenefitsGrid } from "./BenefitsGrid";
import { BenefitsHeader } from "./BenefitsHeader";

// Id must stay in sync with the "Переваги" entry in
// src/components/layout/Header/Header.constants.ts (NAV_ITEMS) — Header is
// frozen for this task, so the value is duplicated here rather than
// importing across the layout/section boundary.
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
