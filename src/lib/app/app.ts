export class App {
	public static localhost_origin = 'http://localhost:5173'
	public static app_name = 'sinpro.dev'
	public static company_name = 'sinProject'
	public static company_and_app_name = `${App.company_name} ${App.app_name}`
	public static copyright = `© ${App.company_name}.`
	public static description = 'We are aiming to revolutionize the world with innovative services.'

	public static get_page_title(title: string): string {
		return `${title} - ${App.app_name}`
	}

	public static get_docs_title(title: string): string {
		return App.get_page_title(title)
		// return `${title} - ${App.company_and_app_name}`
	}
}
