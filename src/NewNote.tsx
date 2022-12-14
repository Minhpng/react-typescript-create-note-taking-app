import React from "react"
import { NoteData, Tag } from "./App"
import NoteForm from "./NoteForm"

type NewNoteProps = {
	availableTags: Tag[]
	onSubmit: (data: NoteData) => void
	onAddTag: (data: Tag) => void
}

function NewNote({ availableTags, onSubmit, onAddTag }: NewNoteProps) {
	return (
		<div>
			<h1>New note</h1>
			<NoteForm
				availableTags={availableTags}
				onSubmit={onSubmit}
				onAddTag={onAddTag}
			/>
		</div>
	)
}

export default NewNote
