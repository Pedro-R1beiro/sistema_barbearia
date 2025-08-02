import { About } from "./components/About";
import Footer from "./components/Footer";
import { Home } from "./components/Home";
import { Services } from "./components/Services";

export function Sale() {
  return (
    <>
      <Home />
      <div className="mx-auto max-w-[1152px]">
        <About />
        <Services />
        <Footer />
      </div>
    </>
  );
}
