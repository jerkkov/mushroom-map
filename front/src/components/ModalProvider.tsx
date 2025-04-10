import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
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
	setEditing: Dispatch<React.SetStateAction<boolean>>;
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

	const handleModalOpen = (latLng?: LatLng) => {
		if (!latLng) return;

		const newLatLng = latLngToId(latLng);

		const existingFavoriteSpot = favoriteSpots.find(
			(favSpot) => favSpot.id === newLatLng
		);
		if (existingFavoriteSpot) {
			setModalData(existingFavoriteSpot);
		} else {
			setModalData({ ...modalData, id: newLatLng, position: latLng });
		}
		setOpen(true);
	};

	const handleModalClose = () => {
		setOpen(false);
		setModalData(emptyModalData);
		setEditing(false);
	};
	const toggleEditing = () => {
		setEditing((editing) => !editing);
	};

	return (
		<ModalContext.Provider
			value={{
				open,
				editing,
				modalData,
				favoriteSpots,
				setEditing,
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
