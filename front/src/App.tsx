import './App.scss';
import 'leaflet/dist/leaflet.css';

import { ModalContainer } from './components/ModalContainer';
import { ModalProvider } from './components/ModalProvider';
import MushroomMapProvider from './components/MushroomMapProvider';
import MushroomMapContainer from './components/MushroomMapContainer';
import { FavoriteSpotContainer } from './components/FavoriteSpotContainer';

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
					{/* <Sider>
							<Filter
								label={'Todennäköisyydet'}
								showKanttarelliFilters={showKanttarelliFilters}
								showSuppiloFilters={showSuppiloFilters}
								radioLabels={probabilityOptions.map((label) => label.label)}
								onSuppiloSelectionChange={handleSuppiloSelectionChange}
								onKanttarelliSelectionChange={handleKanttarelliSelectionChange}
							/>
						</Sider> */}
					<ModalProvider>
						<ModalContainer />
						<MushroomMapProvider>
							<MushroomMapContainer />
						</MushroomMapProvider>
					</ModalProvider>
				</main>
			</div>
		</>
	);
};

export default App;
