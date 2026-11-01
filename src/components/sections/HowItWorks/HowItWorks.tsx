import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { OrderFormPanel } from "@/features/order-form";
import { HowItWorksHeader } from "./HowItWorksHeader";
import { HowItWorksSteps } from "./HowItWorksSteps";

const HOW_IT_WORKS_SECTION_ID = "how-it-works";

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
          <div className="relative lg:static">
            <span id={siteConfig.orderFormSectionId} aria-hidden="true" className="absolute top-0" />
            <OrderFormPanel className="mx-auto max-w-[40rem] lg:max-w-none" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
