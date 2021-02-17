import { action, observable } from 'mobx';
import { UserRoles } from '../types/UserRole';
import agent from '../agent';

export class UserStore {
	@observable isLoading: boolean = false;
	@observable isLoad: boolean = false;
	@observable userRole: UserRoles;
	@observable fio: string;
	@observable email: string;
	@observable id: number;

	getCurrentUser = () => {
		this.isLoading = true;

		return agent.User.getCurrentUser()
			.then(
				action(response => {
					this.id = response?.id;
					this.email = response?.email;
					this.userRole = response?.role as UserRoles;
					this.fio = response?.fio;
					this.isLoad = true;
				})
			)
			.catch(() => {
				console.warn('User not found');
			})
			.finally(
				action(() => {
					this.isLoading = false;
				})
			);
	};
}

export default new UserStore();
