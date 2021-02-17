export interface Interior {
	id: string;
	name: string;
	length: number;
	height: number;
	width: number;
	image_2d: {
		original_url: string;
	};
	image_3d: {
		original_url: string;
	};
	tags: string[];
}
