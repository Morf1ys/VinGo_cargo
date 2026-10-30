import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { ReviewsHeader } from "./ReviewsHeader";

// Anchor id targeted by the "Відгуки" nav item in
// src/components/layout/Header/Header.constants.ts.
const REVIEWS_SECTION_ID = "reviews";

export function Reviews() {
  return (
    <Section id={REVIEWS_SECTION_ID} spacing="compact" fill className="bg-background-secondary">
      <Container size="wide">
        <ReviewsHeader />
        <div className="mx-auto mt-12 w-full max-w-[54rem] md:mt-14 short:mt-8">
          <ReviewsCarousel />
        </div>
      </Container>
    </Section>
  );
}
