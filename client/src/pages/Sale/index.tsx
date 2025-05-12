import { RevealOnScroll } from "@/components/RevealOnScroll";
import { About } from "./components/About";
import Footer from "./components/Footer";
import Services from "./components/Services";

export function Sale() {
  return (
    <>
      {[<About />, <Services />, <Footer />].map((component, index) => (
        <RevealOnScroll key={index}>{component}</RevealOnScroll>
      ))}
    </>
  );
}
