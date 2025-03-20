import { ReactNode, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
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

export type ModalProps = {
	modalOpen: boolean;
	// editing: boolean;
	handleClose: VoidFunction;
	handleSubmit: any;
	title: string;
	description: string;
};

const icon = L.icon({
	iconSize: [25, 41],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

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

export function Modal({
	modalOpen,
	handleClose,
	handleSubmit,
	title,
	description,
}: ModalProps) {
	if (modalOpen === false) return;

	const [editing, setEditing] = useState<boolean>(false);
	const imgSrc =
		'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fa%2Fac%2FCantharellus_infudibuliformis1.jpg%2F120px-Cantharellus_infudibuliformis1.jpg&f=1&nofb=1&ipt=987d9b8b12c08a9ded04083708f5fbb84853546633a1390156940d9e5779f713&ipo=images';

	return editing ? (
		<Dialog open={modalOpen}>
			<DialogActions></DialogActions>
			<DialogTitle>
				{title} <img src={imgSrc} />
				<IconButton disabled={editing}>
					<SvgIcon component={EditIcon} />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<FormControl>
					<InputLabel htmlFor="title">Otsikko</InputLabel>
					<Input id="title" value={title ?? ''} />
					<InputLabel htmlFor="description">Kuvaus</InputLabel>
					<Input id="description" value={description ?? ''} />
				</FormControl>
			</DialogContent>
			<Button variant="contained" onClick={() => handleSubmit()}>
				Save
			</Button>
			<Button variant="outlined" onClick={() => handleClose()}>
				Cancel
			</Button>
		</Dialog>
	) : (
		<Dialog open={modalOpen}>
			<DialogTitle>
				{title} <img src={imgSrc} />
				<IconButton disabled={editing} onClick={() => setEditing(!false)}>
					<SvgIcon component={EditIcon} />
				</IconButton>
			</DialogTitle>
			<DialogContent>{description}</DialogContent>
			<Button variant="contained" onClick={() => handleSubmit()}>
				Save
			</Button>
			<Button variant="outlined" onClick={() => handleClose()}>
				Cancel
			</Button>
		</Dialog>
	);
}
