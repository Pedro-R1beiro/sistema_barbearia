import { RevealOnScroll } from "@/components/RevealOnScroll";
import { About } from "./components/About";
import Footer from "./components/Footer";
import { Home } from "./components/Home";
import Services from "./components/Services";

export function Sale() {
  return (
    <>
      {[<Home />, <About />, <Services />, <Footer />].map(
        (component, index) => (
          <RevealOnScroll key={index}>{component}</RevealOnScroll>
        ),
      )}
    </>
  );
}
