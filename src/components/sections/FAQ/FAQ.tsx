import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FAQAccordion } from "./FAQAccordion";
import { FAQHeader } from "./FAQHeader";

// Id must stay in sync with the "FAQ" entry in
// src/components/layout/Header/Header.constants.ts (NAV_ITEMS) — Header is
// frozen for this task, so the value is duplicated here rather than
// importing across the layout/section boundary.
const FAQ_SECTION_ID = "faq";

export function FAQ() {
  return (
    <Section id={FAQ_SECTION_ID} spacing="compact" className="bg-background-secondary">
      <Container size="default">
        <FAQHeader />
        <FAQAccordion />
      </Container>
    </Section>
  );
}
