import Footer from "./components/footer/index";
import NewsLetter from "./components/NewsLetter";
import FlipClock from "./components/FlipClock";
import HeroSection from "./views/Hero";
import DualTopographicCanvas from "./components/TopographiCanvas";

function mainPage() {
	return <div className="bg-black w-full h-full relative">

		<div className="fixed inset-0 w-full h-full z-0">
			<DualTopographicCanvas />
		</div>
		<HeroSection />
		<FlipClock />
		<NewsLetter />
		<Footer />

	</div>
}

export default mainPage;
