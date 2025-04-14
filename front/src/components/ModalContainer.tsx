import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Modal from './Modal';
import { useModal } from './ModalProvider';
import { FavoriteSpot, mushroomType } from '../types/types';

export function ModalContainer() {
	const [label, setLabel] = useState<string | undefined>(undefined);
	const [description, setDescription] = useState<string | undefined>(undefined);
	const [mushroomType, setMushroomType] =
		useState<mushroomType>('Suppilovahvero');

	const {
		open,
		modalData,
		editing,
		handleModalClose,
		handleRemove,
		toggleEditing,
		addFavoriteSpot,
		setEditing,
	} = useModal();

	useEffect(() => {
		const contentArr = [modalData.label, modalData.description] as string[];
		if (checkIfStringIsUndefinedOrEmpty(contentArr)) {
			setEditing(true);
		} else {
			setEditing(false);
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
	const handleSubmit = (data: FavoriteSpot) => {
		addFavoriteSpot(data);
		setLabel('');
		setDescription('');
		setEditing(false);
	};

	return (
		<Modal
			open={open}
			modalData={modalData}
			editing={editing}
			label={label}
			description={description}
			setLabel={setLabel}
			setDescription={setDescription}
			toggleEditing={toggleEditing}
			handleModalClose={handleModalClose}
			handleRemove={handleRemove}
			handleSubmit={handleSubmit}
			setMushroomType={setMushroomType}
			mushroomType={mushroomType}
		/>
	);
}
