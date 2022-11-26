import React from "react"
import { NoteData, Tag } from "./App"
import NoteForm from "./NoteForm"
import { useNote } from "./NoteLayout"

type EditNoteProps = {
	onSubmit: (id: string, data: NoteData) => void
	onAddTag: (data: Tag) => void
	availableTags: Tag[]
}

function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
	const note = useNote()
	const { id, ...noteData } = note
	return (
		<>
			<h1 className="mb-4">Edit Note</h1>
			<NoteForm
				onSubmit={(data) => onSubmit(note.id, data)}
				onAddTag={onAddTag}
				availableTags={availableTags}
				note={noteData}
			/>
		</>
	)
}

export default EditNote
