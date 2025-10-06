import { User } from "../../../User";


export function getOrCreateUUID() {
	if (User.uuid)
		return User.uuid.toString()
	else
		return "";
}
