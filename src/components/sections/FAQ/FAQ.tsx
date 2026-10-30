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
    <Section id={FAQ_SECTION_ID} spacing="compact" fill className="bg-background-primary">
      <Container size="wide">
        {/* Desktop: heading on the left, questions on the right — mirrors
            the "How it works" layout and keeps the block within one screen. */}
        <div className="mx-auto max-w-default lg:grid lg:max-w-none lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16 xl:gap-24">
          <FAQHeader />
          <FAQAccordion />
        </div>
      </Container>
    </Section>
  );
}
