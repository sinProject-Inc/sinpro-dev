import Fuse from 'fuse.js'
import type { FuseResult, IFuseOptions } from 'fuse.js'
import type { MarkdownData } from './search_index'

export class Search {
	private _fuse_options: IFuseOptions<MarkdownData> = {
		keys: ['description', 'content'],
		threshold: 0.0,
		ignoreLocation: true,
		includeScore: true,
		includeMatches: true,
	}

	private _fuse: Fuse<MarkdownData>

	public constructor(data: MarkdownData[]) {
		this._fuse = new Fuse(data, this._fuse_options)
	}

	public search(query: string): FuseResult<MarkdownData>[] {
		const results = this._fuse.search(query)

		return results
	}
}
