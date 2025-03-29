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
	ModalProps,
	SvgIcon,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ModalDataProps } from './ModalProvider';

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

export default function Modal({
	open,
	editing,
	modalData,
	handleModalOpen,
	handleModalClose,
	toggleEditing,
	handleSubmit,
}: ModalDataProps) {
	// if (open === false) return;
	console.log(open);
	return editing ? (
		<Dialog open={open}>
			<DialogActions></DialogActions>
			<DialogTitle>
				{modalData.title}
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
						<Input id="title" value={modalData.title ?? ''} />
					</FormControl>
					<FormControl variant="standard">
						<InputLabel htmlFor="description">Kuvaus</InputLabel>
						<Input id="description" value={modalData.description ?? ''} />
					</FormControl>
				</Box>
			</DialogContent>
			<Button variant="contained" onClick={() => handleSubmit()}>
				Save
			</Button>
			<Button variant="outlined" onClick={() => handleModalClose()}>
				Cancel
			</Button>
		</Dialog>
	) : (
		<Dialog open={open}>
			<DialogTitle>
				{modalData.title}
				<IconButton disabled={editing} onClick={() => toggleEditing()}>
					<SvgIcon component={EditIcon} />
				</IconButton>
			</DialogTitle>
			<DialogContent>{modalData.description}</DialogContent>
			<Button variant="contained" onClick={() => handleSubmit()}>
				Save
			</Button>
			<Button variant="outlined" onClick={() => handleModalClose()}>
				Cancel
			</Button>
		</Dialog>
	);
}
