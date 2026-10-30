import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { ReviewsHeader } from "./ReviewsHeader";

// Anchor id targeted by the "Відгуки" nav item in
// src/components/layout/Header/Header.constants.ts.
const REVIEWS_SECTION_ID = "reviews";

export function Reviews() {
  return (
    <Section id={REVIEWS_SECTION_ID} spacing="default" className="bg-background-primary">
      <Container size="wide" className="min-[1440px]:max-w-[1320px]">
        <ReviewsHeader />
        <div className="mx-auto mt-12 w-full max-w-[860px] md:mt-14">
          <ReviewsCarousel />
        </div>
      </Container>
    </Section>
  );
}
