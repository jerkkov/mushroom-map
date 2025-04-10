import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Modal from './Modal';
import { ModalDataProps, useModal } from './ModalProvider';
import { FavoriteSpot } from '../types/types';
import { useFormInput } from '../hooks/useFormInput';

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
	const [label, setLabel] = useState<string | undefined>(undefined);
	const [description, setDescription] = useState<string | undefined>(undefined);

	const {
		open,
		modalData,
		editing,
		handleModalOpen,
		handleModalClose,
		toggleEditing,
		addFavoriteSpot,
		setEditing,
	} = useModal();

	const imgSrc =
		'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fa%2Fac%2FCantharellus_infudibuliformis1.jpg%2F120px-Cantharellus_infudibuliformis1.jpg&f=1&nofb=1&ipt=987d9b8b12c08a9ded04083708f5fbb84853546633a1390156940d9e5779f713&ipo=images';
	useEffect(() => {
		const contentArr = [modalData.label, modalData.description] as string[];
		console.log('CHECK', checkIfStringIsUndefinedOrEmpty(contentArr));
		if (checkIfStringIsUndefinedOrEmpty(contentArr)) {
			console.log('TRUE');
			setEditing(true);
		} else {
			setEditing(false);
			console.log('FALSE');
			setLabel(modalData.label);
			setDescription(modalData.description);
		}
	}, [open]);

	const checkIfStringIsUndefinedOrEmpty = (values: string[]) => {
		if (!values) return;
		const stringIsUndefinedOrEmpty = values.every((value) => {
			return value === undefined || value.length === 0;
		});
		return stringIsUndefinedOrEmpty;
	};
	console.log(modalData);
	const handleSubmit = (data: FavoriteSpot) => {
		addFavoriteSpot(data);
		setLabel('');
		setDescription('');
		setEditing(false);
	};
	/* 	const label = useFormInput(modalData.label);
	const description = useFormInput(modalData.description);
	const emptyFields = () => {
		label.emptyField();
		description.emptyField();
	}; */
	return (
		<Modal
			open={open}
			modalData={modalData}
			editing={editing}
			label={label}
			description={description}
			setLabel={setLabel}
			setDescription={setDescription}
			handleModalOpen={handleModalOpen}
			toggleEditing={toggleEditing}
			handleModalClose={handleModalClose}
			handleSubmit={handleSubmit}
		/>
	);
}
