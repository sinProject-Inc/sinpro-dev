export enum OS {
	android = 'Android',
	ios = 'iOS',
	windows = 'Windows',
	mac_os = 'Mac OS',
	linux = 'Linux',
	windows_phone = 'Windows Phone',
	unknown = 'unknown',
}

export class OSInfo {
	private static _os_list: { name: OS; pattern: RegExp }[] = [
		{ name: OS.android, pattern: /android/i },
		{ name: OS.ios, pattern: /iPad|iPhone|iPod/ },
		{ name: OS.windows_phone, pattern: /windows phone/i },
		{ name: OS.windows, pattern: /Windows/ },
		{ name: OS.mac_os, pattern: /Macintosh|Mac OS X/ },
		{ name: OS.linux, pattern: /Linux/ },
	]

	public static get_os(): OS {
		const user_agent = navigator.userAgent

		for (const os of OSInfo._os_list) {
			if (os.pattern.test(user_agent)) return os.name
		}

		return OS.unknown
	}

	public static is_mac_or_ios(): boolean {
		const os = OSInfo.get_os()

		return os === OS.mac_os || os === OS.ios
	}
}
