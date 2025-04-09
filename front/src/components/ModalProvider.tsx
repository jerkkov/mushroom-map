import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';
import 'leaflet/dist/leaflet.css';

import { FavoriteSpot } from '../types/types';
import { LatLng, LatLngExpression } from 'leaflet';

// export type ModalProps = {
// 	modalOpen: boolean;
// 	// editing: boolean;
// 	handleClose: VoidFunction;
// 	handleSubmit: any;
// 	title: string;
// 	description: string;
// };

// function form () {
// 	<label>
// 	<input
// 		type="text"
// 		name="title"
// 		value={radioLabels[0]}
// 		checked={selectedOption === radioLabels[0]}
// 		onChange={handleChange}
// 	/>
// 	<span>{radioLabels[0]}</span>
// </label>
// }
const emptyModalData = {
	id: '',
	position: {},
	label: '',
	description: '',
} as FavoriteSpot;

export type ModalDataProps = {
	open: boolean;
	editing: boolean;
	modalData: FavoriteSpot;
	favoriteSpots: FavoriteSpot[];
	toggleEditing: VoidFunction;
	handleModalOpen: (data?: LatLng) => void;
	handleModalClose: VoidFunction;
	addFavoriteSpot?: (newSpot: FavoriteSpot | undefined) => void;
};

const ModalContext = createContext<ModalDataProps | undefined>(undefined);

export function ModalProvider({ children }: any) {
	const [open, setOpen] = useState<boolean>(false);
	const [editing, setEditing] = useState<boolean>(false);
	const [modalData, setModalData] = useState<FavoriteSpot>(emptyModalData);
	const [favoriteSpots, setFavoriteSpots] = useState<FavoriteSpot[]>([]);

	const addFavoriteSpot = (newSpot: FavoriteSpot | undefined) => {
		if (!newSpot) {
			return console.log('Null or undefined');
		}
		setFavoriteSpots(favoriteSpots.concat(newSpot));
		handleModalClose();
	};

	const latLngToId = (latLng: LatLngExpression) => {
		return Object.values(latLng).toLocaleString();
	};

	const handleModalOpen = useCallback((latLng?: LatLng) => {
		if (!latLng) return;

		const existingId = latLngToId(latLng);
		const existingFavoriteSpot = favoriteSpots.find(
			(id) => existingId === id.id
		);
		if (existingFavoriteSpot) {
			setModalData(existingFavoriteSpot);
		} else {
			setModalData({ ...modalData, id: latLngToId(latLng), position: latLng });
		}
		setOpen(true);
	}, []);
	const handleModalClose = useCallback(() => {
		setOpen(false);
		setModalData(emptyModalData);
	}, []);
	const toggleEditing = useCallback(() => {
		setEditing(!false);
	}, []);

	return (
		<ModalContext.Provider
			value={{
				open,
				editing,
				modalData,
				favoriteSpots,
				toggleEditing,
				handleModalOpen,
				handleModalClose,
				addFavoriteSpot,
			}}
		>
			{children}
		</ModalContext.Provider>
		// <Modal
		// 	modalOpen={open}
		// 	data={modalData}
		// 	editing={editing}
		// 	handleEditing={handleEditing}
		// 	handleClose={handleModalClose}
		// 	handleSubmit={handleSubmit}
		// />
	);
}

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context)
		throw new Error('useModal must be used withing a ModalProvider');
	return context;
};
