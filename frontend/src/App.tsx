import Footer from "./components/footer/index";
import NewsLetter from "./components/NewsLetter";
import FlipClock from "./components/FlipClock";
import HeroSection from "./views/Hero";
import CustomScrollbar from "./components/CustomScrollbar";

function mainPage() {
	return <div className="bg-black w-full h-full relative">
		<CustomScrollbar className="h-full w-full no-scrollbar">
			<HeroSection />
			<FlipClock />
			<NewsLetter />
			<Footer />
		</CustomScrollbar>
	</div>
}
export default mainPage;
