import { Project } from '../Project';
import { Apartment } from '../Objects/Apartment';
import { Room } from '../Objects/Room';

class Import {
	static importJSON(project: Project, json: any) {
		// старый формат не поддерживаем
		if (json.openings) {
			return;
		}

		const aparments: Map<string, Apartment> = new Map();
		json.apartments.forEach((apartmentData: any) => {
			if (apartmentData.points.length === 0) {
				return;
			}

			const apartment = new Apartment(apartmentData);
			aparments.set(apartmentData.id, apartment);
			project.addObject(apartment);
		});
		json.rooms.forEach((roomData: any) => {
			if (roomData.points.length === 0) {
				return;
			}

			const apartment = aparments.get(roomData.apartment);
			if (!apartment) {
				return;
			}

			const room = new Room({
				...roomData,
				apartment
			});
			project.addObject(room);
		});
	}
}

export default Import;
