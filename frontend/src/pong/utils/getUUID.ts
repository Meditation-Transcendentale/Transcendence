import { meReject, meRequest } from "../../checkMe";

export async function getOrCreateUUID(): string {
	const json = await meRequest()
		.catch(() => meReject());
	const uuid = json.userInfo.uuid;
	return uuid;
}
