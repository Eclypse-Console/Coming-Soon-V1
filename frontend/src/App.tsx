import Footer from "./components/footer/index";
import NewsLetter from "./components/NewsLetter";
import FlipClock from "./components/FlipClock";
import HeroSection from "./views/Hero";
import GlowVectors from "./components/GlowVectors";
import DualTopographicCanvas from "./components/TopographiCanvas";
import { Toaster } from "./components/ui/Sonner";
import PageOverlay from "./components/PageOverlay";

function mainPage() {
	return <>
		<PageOverlay />
		<div className="bg-black w-full h-full relative ">
			{/* <CustomScrollbar className="h-full w-full no-scrollbar"> */}
			<div className="fixed inset-0 w-full h-full z-0">
				<DualTopographicCanvas />
			</div>
			<HeroSection />
			<GlowVectors />
			<FlipClock />
			<NewsLetter />
			<Footer />
			<Toaster />
			{/* </CustomScrollbar> */}
		</div>
	</>;
}
export default mainPage;