import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import Modal from './Modal';
import { useModal } from './ModalProvider';

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

export function ModalContainer() {
	const {
		open,
		modalData,
		editing,
		handleModalOpen,
		handleModalClose,
		toggleEditing,
		handleSubmit,
	} = useModal();

	const imgSrc =
		'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fa%2Fac%2FCantharellus_infudibuliformis1.jpg%2F120px-Cantharellus_infudibuliformis1.jpg&f=1&nofb=1&ipt=987d9b8b12c08a9ded04083708f5fbb84853546633a1390156940d9e5779f713&ipo=images';
	useEffect(() => {
		const contentArr = [modalData.title, modalData.description];
		if (checkIfStringIsUndefinedOrEmpty(contentArr)) {
			console.log('fired');
			toggleEditing();
		}
	}, []);

	const checkIfStringIsUndefinedOrEmpty = (values: string[]) => {
		const stringIsUndefinedOrEmpty = values.every((value) => {
			return value === undefined || value.length === 0;
		});
		return stringIsUndefinedOrEmpty;
	};
	return (
		<Modal
			open={open}
			modalData={modalData}
			editing={editing}
			handleModalOpen={handleModalOpen}
			toggleEditing={toggleEditing}
			handleModalClose={handleModalClose}
			handleSubmit={handleSubmit}
		/>
	);
}
