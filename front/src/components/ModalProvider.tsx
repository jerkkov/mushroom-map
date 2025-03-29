import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';
import 'leaflet/dist/leaflet.css';

import { ModalData } from '../types/types';

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
	title: '',
	description: '',
} as ModalData;

export type ModalDataProps = {
	open: boolean;
	editing: boolean;
	modalData: ModalData;
	toggleEditing: VoidFunction;
	handleModalOpen: VoidFunction;
	handleModalClose: VoidFunction;
	handleSubmit: any;
};

const ModalContext = createContext<ModalDataProps | undefined>(undefined);

export function ModalProvider({ children }: any) {
	const [open, setOpen] = useState<boolean>(false);
	const [editing, setEditing] = useState<boolean>(false);
	const [modalData, setModalData] = useState<ModalData>(emptyModalData);

	const handleModalOpen = useCallback(() => {
		setOpen(true);
	}, []);
	const handleModalClose = useCallback(() => {
		setOpen(false);
	}, []);
	const toggleEditing = useCallback(() => {
		setEditing(!false);
	}, []);
	const handleSubmit = (favoriteSpot: any) => {
		handleModalClose();
		// setFavoriteSpots(favoriteSpots.concat({ label: favoriteSpot.label, position:favoriteSpot.}));
	};

	return (
		<ModalContext.Provider
			value={{
				open,
				editing,
				modalData,
				toggleEditing,
				handleModalOpen,
				handleModalClose,
				handleSubmit,
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
