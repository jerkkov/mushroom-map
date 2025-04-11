import { ReactNode, useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { v4 as uuid } from 'uuid';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormGroup,
	Icon,
	IconButton,
	Input,
	InputLabel,
	SvgIcon,
	TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ModalDataProps } from './ModalProvider';
import { useFormInput } from '../hooks/useFormInput';
import { FavoriteSpot } from '../types/types';
import { Label } from '@mui/icons-material';

type ModalProps = ModalDataProps & {
	handleSubmit: (data: FavoriteSpot) => void;
};

export default function Modal({
	open,
	editing,
	modalData,
	label,
	description,
	setLabel,
	setDescription,
	handleModalOpen,
	handleModalClose,
	toggleEditing,
	handleSubmit,
}: ModalProps) {
	console.log('EDITING', editing);
	return editing ? (
		<Dialog open={open}>
			<DialogTitle>
				<span>{modalData.label}</span>
				<span>{modalData.id}</span>
				<IconButton onClick={() => toggleEditing()}>
					<SvgIcon component={EditIcon} />
				</IconButton>
			</DialogTitle>
			<DialogContent className="modal">
				<Box
					component="form"
					sx={{
						'& > :not(style)': { m: 1 },
						display: 'flex',
						flexDirection: 'column',
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="label"
						label="Otsikko"
						defaultValue={modalData.label}
						onChange={(e) => setLabel(e.target.value)}
					/>
					<TextField
						id="description"
						label="Kuvaus"
						defaultValue={modalData.description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Box>
			</DialogContent>
			<Button
				type="submit"
				variant="contained"
				onClick={() =>
					handleSubmit({
						id: modalData.id,
						position: modalData.position,
						label: label,
						description: description,
					})
				}
			>
				Tallenna
			</Button>
			<Button
				variant="outlined"
				onClick={() => {
					handleModalClose();
				}}
			>
				Peruuta
			</Button>
		</Dialog>
	) : (
		<Dialog open={open}>
			<DialogTitle>
				{modalData.label}
				<IconButton disabled={editing} onClick={() => toggleEditing()}>
					<SvgIcon component={EditIcon} />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<p>{modalData.description}</p>
			</DialogContent>
			<Button variant="outlined" onClick={() => handleModalClose()}>
				Cancel
			</Button>
		</Dialog>
	);
}
