import axios, { AxiosResponse } from 'axios';

const getOptions = {
	headers: process.env.REACT_APP_DEV_TOKEN
		? { token: process.env.REACT_APP_DEV_TOKEN }
		: {}
};

const getData = (res: AxiosResponse) => res.data;

const API_ROOT = process.env.REACT_APP_API_ROOT;

const requests = {
	get: (url: string) =>
		axios.get(`${API_ROOT}/${url}`, getOptions).then(getData),
	put: (url: string, data: FormData) =>
		axios.put(`${API_ROOT}/${url}`, data, getOptions).then(getData),
	post: (url: string, data: FormData = new FormData()) =>
		axios.post(`${API_ROOT}/${url}`, data, getOptions)
};

const Plan = {
	getPlan: (id: string) => requests.get(`plans/${id}`),
	savePlan: (id: string, data: FormData) => requests.put(`plans/${id}`, data),
	planDeclined: (id: string) => requests.post(`plans/${id}/reject`),
	planModeratorDeclined: (id: string, data: FormData) =>
		requests.post(`plans/${id}/reject`, data),
	getPlanStatus: (id: string) => requests.get(`plans/${id}/state`)
};

const Tools = {
	getInteriors: () => requests.get(`/list_interiors?page=1&per_page=50`)
};

const User = {
	getCurrentUser: () => requests.get(`users/current`),
	getUserForId: (id: string) => requests.get(`users/${id}`)
};

export default { Plan, User, Tools };
