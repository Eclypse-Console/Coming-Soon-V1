import Footer from "./components/footer/index";
import NewsLetter from "./components/NewsLetter";
import FlipClock from "./components/FlipClock";
import HeroSection from "./views/Hero";
import GlowVectors from "./components/GlowVectors";

function mainPage() {
	return <div className="bg-black w-full h-full relative">
		<HeroSection />
		<GlowVectors />
		<FlipClock />
		<NewsLetter />
		<Footer />

	</div>
}

export default mainPage;
