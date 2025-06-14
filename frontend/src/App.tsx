import Footer from "./components/footer/index";
import NewsLetter from "./components/NewsLetter";
import FlipClock from "./components/FlipClock";
import HeroSection from "./views/Hero";

function mainPage() {
  return <div className="bg-black w-full h-full relative">
    <HeroSection />
    <FlipClock />
    <Footer />
	</NewsLetter>
  </div>
}

export default mainPage;
