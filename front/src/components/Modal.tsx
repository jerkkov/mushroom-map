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
	FormControlLabel,
	FormGroup,
	FormLabel,
	Icon,
	IconButton,
	Input,
	InputLabel,
	Radio,
	RadioGroup,
	SvgIcon,
	TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
	handleRemove,
	handleModalClose,
	toggleEditing,
	handleSubmit,
	setType,
	type,
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
				<IconButton onClick={() => handleRemove(modalData.id)}>
					<SvgIcon component={DeleteForeverIcon} />
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
					<FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Sieni</FormLabel>
		<RadioGroup
			defaultValue="Suppilovahvero"
			name="radio-buttons-group"
			onChange={(e) => setType(e.target.value)}
		>
			<FormControlLabel checked={type === "Suppilovahvero"} value="Suppilovahvero" control={<Radio />} label="Suppilovahvero" />
			<FormControlLabel checked={type === "Kanttarelli"}value="Kanttarelli" control={<Radio />} label="Kanttarelli" />
			<FormControlLabel checked={type === "Muu"}value="Muu" control={<Radio />} label="Muu" />
		</RadioGroup>
		</FormControl>
					<TextField
						id="label"
						label="Otsikko"
						defaultValue={modalData.label}
						onChange={(e) => setLabel(e.target.value)}
					/>
					<TextField
						id="description"
						label="Kuvaus"
						multiline
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
						mushroomType: type,
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
				<p style={{color:"gray"}}>{type}</p>
				<p>{modalData.description}</p>
			</DialogContent>
			<Button variant="outlined" onClick={() => handleModalClose()}>
				Cancel
			</Button>
		</Dialog>
	);
}
