import { Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useModal } from './ModalProvider';

export function FavoriteSpot({ label, position, icon }: any) {
	const { handleModalOpen } = useModal();

	return (
		position && (
			<div>
				<Marker
					icon={icon}
					position={position}
					eventHandlers={{
						click: () => {
							handleModalOpen(position);
						},
					}}
				>
					<Tooltip direction="top"> {label}</Tooltip>
				</Marker>
			</div>
		)
	);
}
