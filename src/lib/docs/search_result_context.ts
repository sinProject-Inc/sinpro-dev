import type Fuse from 'fuse.js'

export type SplitContextPortion = {
	text: string
	is_match: boolean
	first_character_index: number
}

type IndexRange = {
	start_index: number
	end_index: number
}

export class SearchResultContext {
	private readonly _match: Fuse.FuseResultMatch
	private readonly _query: string

	public constructor(match: Fuse.FuseResultMatch, query: string) {
		this._match = match
		this._query = query
	}

	private _add_non_matching_portion(
		split_context: SplitContextPortion[],
		text: string,
		start: number,
		end?: number
	): void {
		if (end && end > start) {
			split_context.push({
				text: text.slice(start, end),
				is_match: false,
				first_character_index: start,
			})
		}
	}

	private _add_matching_portion(
		split_context: SplitContextPortion[],
		match_text: string,
		index: number
	): void {
		split_context.push({ text: match_text, is_match: true, first_character_index: index })
	}

	private _add_remaining_portion(
		split_context: SplitContextPortion[],
		text: string,
		start_index: number
	): void {
		if (start_index < text.length) {
			split_context.push({
				text: text.slice(start_index),
				is_match: false,
				first_character_index: start_index,
			})
		}
	}

	private _split_text_by_regex(text: string, regex: RegExp): SplitContextPortion[] {
		const split_context: SplitContextPortion[] = []
		let last_index = 0

		for (const match of text.matchAll(regex)) {
			const match_index = match.index || 0

			this._add_non_matching_portion(split_context, text, last_index, match_index)
			this._add_matching_portion(split_context, match[0], match_index)

			last_index = match_index + match[0].length
		}

		this._add_remaining_portion(split_context, text, last_index)
		return split_context
	}

	public get_split_context(): SplitContextPortion[] {
		const match_value = this._match.value
		if (!match_value) return []

		return this._split_text_by_regex(match_value, new RegExp(this._query, 'gi'))
	}

	private _get_shortened_context(
		split_context: SplitContextPortion[],
		first_matching_portion: SplitContextPortion,
		max_length: number
	): SplitContextPortion[] {
		const match_value = this._match.value

		if (!match_value) return []

		const index_range = this._get_shortened_index_range(
			match_value,
			first_matching_portion,
			max_length
		)

		const start_index = index_range.start_index
		const end_index = index_range.end_index

		const starting_portion = this._get_start_index_portion(split_context, start_index)
		const ending_portion = this._get_end_index_portion(split_context, end_index)

		const starting_portion_shortened = this._shorten_starting_portion(starting_portion, start_index)
		const ending_portion_shortened = this._shorten_ending_portion(ending_portion, end_index)

		const middle_portions = this._get_middle_portions(
			split_context,
			starting_portion,
			ending_portion
		)

		return [starting_portion_shortened, ...middle_portions, ending_portion_shortened]
	}

	private _get_first_matching_portion(
		split_context: SplitContextPortion[]
	): SplitContextPortion | undefined {
		return split_context.find((portion) => portion.is_match)
	}

	private _is_match_available(): boolean {
		return !!this._match.value
	}

	private _can_perform_shortening(
		split_context: SplitContextPortion[]
	): SplitContextPortion | undefined {
		if (!this._is_match_available()) return undefined

		return this._get_first_matching_portion(split_context)
	}

	public shorten_split_context(
		split_context: SplitContextPortion[],
		max_length: number
	): SplitContextPortion[] {
		const first_matching_portion = this._can_perform_shortening(split_context)
		if (!first_matching_portion) return []

		return this._get_shortened_context(split_context, first_matching_portion, max_length)
	}

	private _get_shortened_index_range(
		text: string,
		matching_portion: SplitContextPortion,
		max_length: number
	): IndexRange {
		const match_length = matching_portion.text.length
		const remaining_length = max_length - match_length

		if (remaining_length <= 0) {
			const start = matching_portion.first_character_index
			const end = matching_portion.first_character_index + match_length

			return { start_index: start, end_index: end }
		}

		const left_length = Math.floor(remaining_length / 2)
		const right_length = remaining_length - left_length

		let start = matching_portion.first_character_index - left_length
		let end = matching_portion.first_character_index + match_length + right_length

		if (start < 0) {
			end += Math.abs(start)
			start = 0
		}

		if (end > text.length) {
			const overflow = end - text.length
			start -= overflow

			if (start >= 0) {
				start = 0
			}
		}

		return { start_index: start, end_index: end }
	}

	private _get_start_index_portion(
		split_context: SplitContextPortion[],
		start_index: number
	): SplitContextPortion {
		const portion = this._get_portion_from_index(split_context, start_index, split_context[0])

		return portion
	}

	private _get_end_index_portion(
		split_context: SplitContextPortion[],
		end_index: number
	): SplitContextPortion {
		const portion = this._get_portion_from_index(
			split_context,
			end_index,
			split_context[split_context.length - 1]
		)

		return portion
	}

	private _get_portion_from_index(
		split_context: SplitContextPortion[],
		index: number,
		fallback: SplitContextPortion
	): SplitContextPortion {
		const portion = split_context.find((portion) => {
			return this._is_index_in_portion(portion, index)
		})

		return portion ?? fallback
	}

	private _shorten_starting_portion(
		starting_portion: SplitContextPortion,
		start_index: number
	): SplitContextPortion {
		const portion_text = starting_portion.text
		const portion_start_index = start_index - starting_portion.first_character_index

		const text = portion_text.slice(portion_start_index, portion_text.length)

		const portion = {
			...starting_portion,
			text,
		}

		return portion
	}

	private _shorten_ending_portion(
		ending_portion: SplitContextPortion,
		end_index: number
	): SplitContextPortion {
		const portion_text = ending_portion.text
		const portion_end_index = end_index - ending_portion.first_character_index

		const text = portion_text.slice(0, portion_end_index)

		const portion = {
			...ending_portion,
			text,
		}

		return portion
	}

	private _get_middle_portions(
		split_context: SplitContextPortion[],
		starting_portion: SplitContextPortion,
		ending_portion: SplitContextPortion
	): SplitContextPortion[] {
		const middle_portions = split_context.filter((portion) => {
			const is_first_character_after_starting_portion =
				portion.first_character_index > starting_portion.first_character_index
			const is_first_character_before_ending_portion =
				portion.first_character_index < ending_portion.first_character_index

			const is_middle_portion =
				is_first_character_after_starting_portion && is_first_character_before_ending_portion

			return is_middle_portion
		})

		return middle_portions
	}

	private _is_index_in_portion(portion: SplitContextPortion, index: number): boolean {
		const portion_start_index = portion.first_character_index
		const portion_end_index = portion.first_character_index + portion.text.length

		const is_in_portion = portion_start_index <= index && index <= portion_end_index

		return is_in_portion
	}
}
