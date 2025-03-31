import './App.scss';
import 'leaflet/dist/leaflet.css';

import { ModalContainer } from './components/ModalContainer';
import { ModalProvider } from './components/ModalProvider';
import { FavoriteSpotContainer } from './components/FavoriteSpotContainer';
import { Sider } from './components/Sider';
import { Filter } from './components/Filter';
import { FilterContainer } from './components/FilterContainer';
import { FilterProvider } from './components/FilterProvider';
import MushroomMapContainer from './components/MushroomMapContainer';
import MushroomMapProvider from './components/MushroomMapProvider';

const App = () => {
	// const [favoriteSpots, setFavoriteSpots] = useState<FavoriteSpotProps[]>([]);

	/* 	const [showKanttarelliFilters, setShowKanttarelliFilters] =
		useState<boolean>(true); */
	// const [showSuppiloFilters, setShowSuppiloFilters] = useState<boolean>(true);
	// const layerToggleRef = useRef(null);

	/* 	const handleSuppiloSelectionChange = (selectedOption: any) => {
		setSuppiloProbability(
			probabilityOptions.find((lbl) => lbl.label === selectedOption)
				?.probability || 0
		);
	};

	const handleKanttarelliSelectionChange = (selectedOption: any) => {
		setKanttarelliProbability(
			probabilityOptions.find((lbl) => lbl.label === selectedOption)
				?.probability || 0
		);
	};
 */

	/* 	useEffect(() => {
		if (!layerToggleRef.current) return;
		console.log('LAYUERs');
		const handleCheckBoxChange = () => {
			setShowSuppiloFilters(
				layerToggleRef.current._layerControlInputs[0].checked
			);
		};

		const checkBoxElement = layerToggleRef.current._layerControlInputs[0];
		checkBoxElement.addEventListener('change', handleCheckBoxChange);

		return () => {
			checkBoxElement.removeEventListener('change', handleCheckBoxChange);
		};
	}, []); */

	// if (!mapState || mapState.loading) {
	// 	return <div>loading...</div>;
	// }

	// console.log('kanttarelli', kanttarelliProbability);
	// console.log('suppilo', suppiloProbability);
	// console.log('suppiloShow', showSuppiloFilters);
	// console.log('ref', layerToggleRef.current);
	// console.log('spots', favoriteSpots);

	return (
		<>
			<header>
				<h1>Tampere Area Mushroom Map</h1>
			</header>
			<div className="wrapper">
				<main className="content-container">
					<FilterProvider>
						<ModalProvider>
							<ModalContainer />
							<MushroomMapProvider>
								<Sider>
									<FilterContainer />
								</Sider>
								<MushroomMapContainer />
							</MushroomMapProvider>
						</ModalProvider>
					</FilterProvider>
				</main>
			</div>
		</>
	);
};

export default App;
