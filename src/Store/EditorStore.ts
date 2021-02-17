import { observable, action, reaction, IObservableValue } from 'mobx';
import agent from '../agent';
import { PlanStatus } from '../types/PlanStatus';
import { PlanError } from '../types/error';
import { Project } from '../Editor/Project';
import { Image } from '../Drawing/Image';
import { debounce } from '../utils';

export class EditorStore {
	@observable isLoading: boolean = false;
	@observable slug: string;
	@observable originalImageUrl: string = '';
	@observable planSvg: string;
	@observable planJson: any;
	@observable planStatus: PlanStatus;
	@observable error: PlanError | null = null;
	requestCompleted: IObservableValue<boolean> = observable.box(false);
	domElement: HTMLElement;
	project: Project;

	sendDataToServerDebounce = debounce((json: string, svg: string) => {
		const formData = new FormData();
		formData.append('editor_data', json);
		formData.append('svg', svg);
		return agent.Plan.savePlan(this.slug, formData);
	}, 100);

	initView = (domElement: HTMLElement) => {
		this.domElement = domElement;

		reaction(
			() => this.requestCompleted.get() === true,
			() => {
				if (this.requestCompleted.get()) {
					this.project = new Project();
					if (this.planJson) {
						this.project.load(JSON.parse(this.planJson));
					}

					const viewModel = this.project.viewModel;

					viewModel.render(domElement);

					if (this.originalImageUrl) {
						this.isLoading = true;
						const image = new Image({
							path: this.originalImageUrl
						});
						viewModel.add(image, 'background');

						image.element.addEventListener('load', () => {
							const bbox1 = viewModel.element.getBoundingClientRect();
							const bbox2 = image.element.getBoundingClientRect();
							// когда картинка загрузилась, делаем сдвиг всего канваса чтобы она оказалась по центру
							viewModel.setPosition(
								bbox1.width / 2 - bbox2.width / 2,
								bbox1.height / 2 - bbox2.height / 2
							);
							action(() => (this.isLoading = false));
						});
					}
				}
			}
		);
	};

	@action
	loadPlan = (slug: string) => {
		this.slug = slug;
		this.isLoading = true;

		return agent.Plan.getPlan(slug)
			.then(
				action((response: any) => {
					this.originalImageUrl = response?.img?.original_url || '';
					this.planSvg = response?.svg;
					this.planJson = response?.editor_data;
					this.requestCompleted.set(true);
					this.planStatus = PlanStatus.EDITABLE;
				})
			)
			.catch(
				action((e: any) => {
					if (e.message === 'Request failed with status code 404') {
						this.error = PlanError.NOT_FOUND;
					} else {
						this.planStatus = PlanStatus.NOT_EDITABLE;
					}
				})
			)
			.finally(action(() => (this.isLoading = false)));
	};
}

export default new EditorStore();
