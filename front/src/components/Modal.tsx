import 'leaflet/dist/leaflet.css';
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	Radio,
	RadioGroup,
	SvgIcon,
	TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ModalProps } from './ModalProvider';
import { FavoriteSpot, mushroomType } from '../types/types';

type ModalPropsType = ModalProps & {
	label: string | undefined;
	description: string | undefined;
	mushroomType: mushroomType;
	handleSubmit: (data: FavoriteSpot) => void;
	setLabel: React.Dispatch<React.SetStateAction<string | undefined>>;
	setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
	setMushroomType: React.Dispatch<React.SetStateAction<mushroomType>>;
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
	setMushroomType,
	mushroomType,
}: ModalPropsType) {
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
							onChange={(e) => setMushroomType(e.target.value as mushroomType)}
						>
							<FormControlLabel
								checked={mushroomType === 'Suppilovahvero'}
								value="Suppilovahvero"
								control={<Radio />}
								label="Suppilovahvero"
							/>
							<FormControlLabel
								checked={mushroomType === 'Kanttarelli'}
								value="Kanttarelli"
								control={<Radio />}
								label="Kanttarelli"
							/>
							<FormControlLabel
								checked={mushroomType === 'Muu'}
								value="Muu"
								control={<Radio />}
								label="Muu"
							/>
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
						mushroomType: mushroomType,
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
				<p style={{ color: 'gray' }}>{mushroomType}</p>
				<p>{modalData.description}</p>
			</DialogContent>
			<Button variant="outlined" onClick={() => handleModalClose()}>
				Cancel
			</Button>
		</Dialog>
	);
}
