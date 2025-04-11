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
import { latLngToId } from '../services/utils';

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
	mushroomType: undefined,
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
	handleRemove: (id:string) => void;
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
		const existingFavoriteSpot = favoriteSpots.find(
			(spot) => spot.id === newSpot.id
		);
		if (!existingFavoriteSpot) {
			setFavoriteSpots(favoriteSpots.concat(newSpot));
		} else {
			setFavoriteSpots(
				favoriteSpots
					.filter((spot) => spot.id !== existingFavoriteSpot.id)
					.concat(newSpot)
			);
		}
		handleModalClose();
	};

	const handleRemove = (id: string) => {
		const favoriteSpotToBeRemoved = favoriteSpots.find(
			(spot) => spot.id === id
		);
		if(favoriteSpotToBeRemoved) {
			setFavoriteSpots(favoriteSpots.filter((spot) => spot.id !== id))
			console.log(`Favorite spot with id ${id} removed`)
		}
		else {
			console.log(`No favorite spot exists with id ${id}`)
		}
		handleModalClose()
	}

	const handleModalOpen = (latLng?: LatLng) => {
		if (!latLng) return;

		const newLatLng = latLngToId(latLng);

		const existingFavoriteSpot = favoriteSpots.find(
			(favSpot) => favSpot.id === newLatLng
		);
		if (existingFavoriteSpot) {
			setModalData(existingFavoriteSpot);
		} else {
			setModalData({ ...modalData, id: newLatLng, position: latLng});
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
				handleRemove,
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
