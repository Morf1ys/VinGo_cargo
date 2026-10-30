import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { OrderFormPanel } from "@/features/order-form";
import { HowItWorksHeader } from "./HowItWorksHeader";
import { HowItWorksSteps } from "./HowItWorksSteps";

// Id must stay in sync with the "Як працюємо" entry in
// src/components/layout/Header/Header.constants.ts (NAV_ITEMS).
const HOW_IT_WORKS_SECTION_ID = "how-it-works";

// "How it works" and the order form share one screen on desktop: the four
// steps on the left lead straight into the form on the right. The form keeps
// its own anchor id so every "Замовити" link still scrolls to it.
export function HowItWorks() {
  return (
    <Section
      id={HOW_IT_WORKS_SECTION_ID}
      spacing="compact"
      fill
      className="relative overflow-hidden bg-background-primary"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16 xl:gap-24">
          <div>
            <HowItWorksHeader />
            <HowItWorksSteps />
          </div>
          {/* Anchor for every "Замовити" link. Its wrapper is only positioned
              below lg, so on mobile the jump lands on the form itself, while
              on desktop the span resolves against the section and the jump
              aligns the whole steps + form screen, like the nav links do. */}
          <div className="relative lg:static">
            <span id={siteConfig.orderFormSectionId} aria-hidden="true" className="absolute top-0" />
            <OrderFormPanel className="mx-auto max-w-[40rem] lg:max-w-none" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
