import { environment } from "src/environments/environment";
export let apiUrl: string = environment.postApi;

export const LOGIN_ENDPOINT = apiUrl + "auth/login/";
export const GET_USERS_ENDPOINT = apiUrl + "api/users/all";
export const GET_USER_EMAIL_ENDPOINT = apiUrl + "api/users/getUser/";
export const DELETE_USER_ENDPOINT = apiUrl + "api/users/delete/";
export const CREATE_USER_ENDPOINT = apiUrl + "api/users";
export const UPDATE_USER_ENDPOINT = apiUrl + "api/users";
export const CREATE_MACHINE_ENDPOINT = apiUrl + "api/machines";
export const GET_ACTIVE_MACHINES_ENDPOINT = apiUrl + "api/machines/activeMachinesForUser";
export const DESTROY_MACHINE_ENDPOINT = apiUrl + "api/machines";
export const SEARCH_MACHINES_ENDPOINT = apiUrl + "api/machines/searchMachines";
export const START_MACHINE_ENDPOINT = apiUrl + "api/machines/startMachine/";
export const RESTART_MACHINE_ENDPOINT = apiUrl + "api/machines/restartMachine/";
export const STOP_MACHINE_ENDPOINT = apiUrl + "api/machines/stopMachine/";
export const GET_ERROR_MESSAGES_ENDPOINT = apiUrl + "api/machines/errorMessages";
export const SCHEDULE_MACHINE_ENDPOINT = apiUrl + "api/machines/schedule/";

export const WS_ENDPOINT = apiUrl + "ws";

