export interface LoginResponse {
  jwt: String
}

export interface Machine {
  machineId: number,
  active: boolean,
  status: String,
  name: String,
  creationDate: Date
}

export interface ErrorMessage {
  date: Date,
  actionType: String,
  message: String,
  machine: Machine
}

export interface PermissionUpdate {
  permissionId: number,
  can_create_users: boolean,
  can_read_users: boolean,
  can_update_users: boolean,
  can_delete_users: boolean,

  can_create_machines: boolean,
  can_destroy_machines: boolean,
  can_start_machines: boolean,
  can_restart_machines: boolean,
  can_stop_machines: boolean,
  can_search_machines: boolean,
}

export interface UserUpdate {
  userId: number,
  name: String,
  lastname: String,
  email: String,
  password: String,
  permission: PermissionUpdate
}

export interface Machine {
  machineId: number,
  active: boolean,
  status: String,
  name: String,
  creationDate: Date
}

