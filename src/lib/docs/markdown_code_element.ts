import hljs from 'highlight.js'

export class MarkdownCodeElement {
	private static _github_icon_element = `
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-brand-github"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path
				d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
				fill="none"
			/>
		</svg>
	`

	private static _console_icon_element = `
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-terminal-2"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M8 9l3 3l-3 3" fill="none" />
			<path d="M13 15l3 0" fill="none" />
			<path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" fill="none" />
		</svg>
	`

	private static _copy_icon_element = `
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-copy"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path
				d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"
				fill="none"
			/>
			<path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" fill="none" />
		</svg>
	`

	private _generate_github_title_element(): string {
		return `
			<a
				class="code-title flex gap-1.5 items-center font-semibold dark:text-primary-dark-3 text-primary-3 dark:hover:text-primary-dark-4 hover:text-primary-10"
				href="${this._link}"
				target="blank"
			>
				<div style="width:20px">
					${MarkdownCodeElement._github_icon_element}
				</div>
				${this._title}
			</a>
		`
	}

	private _generate_console_title_element(): string {
		return `
			<div class="code-title flex gap-1.5 items-center font-semibold dark:text-primary-dark-3 text-primary-3">
				<div style="width:20px">
					${MarkdownCodeElement._console_icon_element}
				</div>
				${this._title}
			</div>
			`
	}

	private _generate_title_element(): string {
		return this._filename
			? this._generate_github_title_element()
			: this._generate_console_title_element()
	}

	private _generate_code_header_element(title_element: string): string {
		return `
			<div class="flex gap-2 justify-between">
				${title_element}
				<button data-testid="copy-code" class="copy-code flex gap-1.5 items-center font-semibold dark:text-primary-dark-3 text-primary-3 ">
					<div class="h-[33px] w-[33px] rounded-full glass-bump-bg-shine active:scale-125 -m-[6.5px] p-[6.5px]"
					style="transition-duration: 350ms;">
						${MarkdownCodeElement._copy_icon_element}
					</div>
				</button>
			</div>
		`
	}

	private static readonly _github_url_sinpro_dev =
		'https://github.com/sinProject-Inc/sinpro-dev/blob/main/'

	private static readonly _github_url_talk = 'https://github.com/sinProject-Inc/talk/blob/main/'

	private readonly _title: string
	private readonly _link: string

	private _generate_link(): string {
		if (!this._filename) return ''

		if (this._filename.includes('[talk]')) {
			return this._filename.replaceAll('[talk]', MarkdownCodeElement._github_url_talk)
		}

		return `${MarkdownCodeElement._github_url_sinpro_dev}${this._filename}`
	}

	public constructor(
		private readonly _lang: string,
		private readonly _filename: string,
		private readonly _original_title: string,
		private readonly _content: string
	) {
		this._title =
			(this._original_title || this._filename || hljs.getLanguage(this._lang)?.name) ?? 'UNKNOWN'

		this._link = this._generate_link()
	}

	public generate(): string {
		const title_element = this._generate_title_element()
		const code_header_element = this._generate_code_header_element(title_element)

		return `
			<div class="code-container">
				${code_header_element}
				<pre><code class="hljs ${this._lang}">${this._content}</code></pre>
			</div>
		`
	}
}
