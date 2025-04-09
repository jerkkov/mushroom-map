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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ModalDataProps } from './ModalProvider';
import { useFormInput } from '../hooks/useFormInput';
import { FavoriteSpot } from '../types/types';

type ModalProps = ModalDataProps & {
	handleSubmit: (data: FavoriteSpot) => void;
};

export default function Modal({
	open,
	editing,
	modalData,
	handleModalOpen,
	handleModalClose,
	toggleEditing,
	handleSubmit,
}: ModalProps) {
	// if (open === false) return;
	const label = useFormInput('');
	const description = useFormInput('');
	console.log(open);
	return editing ? (
		<Dialog open={open}>
			<DialogActions></DialogActions>
			<DialogTitle>
				<td>{modalData.label}</td>
				<td>{modalData.id}</td>
				<IconButton disabled={editing}>
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
					<FormControl variant="standard">
						<InputLabel htmlFor="title">Otsikko</InputLabel>
						<Input id="title" onChange={label.onChange} value={label.value} />
					</FormControl>
					<FormControl variant="standard">
						<InputLabel htmlFor="description">Kuvaus</InputLabel>
						<Input
							id="description"
							onChange={description.onChange}
							value={description.value}
						/>
					</FormControl>
				</Box>
			</DialogContent>
			<Button
				variant="contained"
				onClick={() =>
					handleSubmit({
						id: modalData.id,
						position: modalData.position,
						label: label.value,
						description: description.value,
					})
				}
			>
				Save
			</Button>
			<Button variant="outlined" onClick={() => handleModalClose()}>
				Cancel
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
			<DialogContent>{modalData.description}</DialogContent>
			<Button variant="outlined" onClick={() => handleModalClose()}>
				Cancel
			</Button>
		</Dialog>
	);
}
