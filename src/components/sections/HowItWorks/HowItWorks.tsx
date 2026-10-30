import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HowItWorksHeader } from "./HowItWorksHeader";
import { HowItWorksSteps } from "./HowItWorksSteps";

// Id must stay in sync with the "Як працюємо" entry in
// src/components/layout/Header/Header.constants.ts (NAV_ITEMS) — Header is
// frozen for this task, so the value is duplicated here rather than
// importing across the layout/section boundary.
const HOW_IT_WORKS_SECTION_ID = "how-it-works";

export function HowItWorks() {
  return (
    <Section id={HOW_IT_WORKS_SECTION_ID} spacing="compact" className="bg-background-secondary">
      <Container size="wide" className="min-[1440px]:max-w-[1320px]">
        <HowItWorksHeader />
        <HowItWorksSteps />
      </Container>
    </Section>
  );
}
