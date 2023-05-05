import { PrismaClient } from '@prisma/client'

type AppSettingsSeed = {
	key: string
	value: string
}

export class AppSettingSeeder {
	private static readonly _seeds: AppSettingsSeed[] = [
		{ key: 'session_lifetime_sec', value: (60 * 60 * 24 * 3).toString() },
		{ key: 'pin_code_lifetime_sec', value: (60 * 5).toString() },
		{ key: 'consecutive_fail_period_sec', value: (60 * 30).toString() },
		{ key: 'consecutive_fail_count', value: '3' },
		{ key: 'consecutive_fail_wait_sec', value: '10' },
		{ key: 'background_period_sec', value: '60' },
		{ key: 'background_transition_sec', value: '3' },
	]

	public constructor(private readonly _prisma_client: PrismaClient) {}

	public async execute(): Promise<void> {
		for (const seed of AppSettingSeeder._seeds) {
			const key = seed.key
			const value = seed.value

			await this._prisma_client.appSetting.upsert({
				where: { key },
				update: {},
				create: { key, value },
			})
		}
	}
}
