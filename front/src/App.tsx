import './App.scss';
import 'leaflet/dist/leaflet.css';

import { ModalContainer } from './components/ModalContainer';
import { ModalProvider } from './components/ModalProvider';
import { Sider } from './components/Sider';
import { FilterContainer } from './components/FilterContainer';
import { FilterProvider } from './components/FilterProvider';
import MushroomMapContainer from './components/MushroomMapContainer';
import MushroomMapProvider from './components/MushroomMapProvider';

const App = () => {
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
