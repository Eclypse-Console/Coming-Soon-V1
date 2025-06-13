import NewsLetter from "./components/NewsLetter";
import FlipClock from "./components/FlipClock";

function mainPage() {
	return <div className=" w-full h-full">
		<FlipClock />
		<NewsLetter />
	</div>
}

export default mainPage;
