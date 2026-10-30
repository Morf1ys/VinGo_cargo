import { Benefits } from "@/components/sections/Benefits";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
      <Benefits />
      <HowItWorks />
      <Reviews />
      <FAQ />
    </main>
  );
}
