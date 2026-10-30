import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BenefitsFeatured } from "./BenefitsFeatured";
import { BenefitsGrid } from "./BenefitsGrid";
import { BenefitsHeader } from "./BenefitsHeader";

// Id must stay in sync with the "Переваги" entry in
// src/components/layout/Header/Header.constants.ts (NAV_ITEMS) — Header is
// frozen for this task, so the value is duplicated here rather than
// importing across the layout/section boundary.
const BENEFITS_SECTION_ID = "benefits";

export function Benefits() {
  return (
    <Section
      id={BENEFITS_SECTION_ID}
      spacing="default"
      // `!` forces this over Section's own lg:py-section-default-desktop:
      // that's a custom theme utility (not a shape twMerge recognizes as
      // conflicting with a plain arbitrary py-* value), so both classes
      // stay in the string and CSS source order — not intent — decides
      // without the important marker.
      className="bg-background-secondary lg:py-[80px]!"
    >
      <Container size="wide" className="min-[1440px]:max-w-[1320px]">
        <BenefitsHeader />
        <BenefitsFeatured />
        <BenefitsGrid />
      </Container>
    </Section>
  );
}
