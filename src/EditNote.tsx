import { NoteData, Tag } from "./App"
import NoteForm from "./NoteForm"
import { useNote } from "./NoteLayout"

type EditNoteProps = {
	onUpdateNote: (id: string, data: NoteData) => void
	onAddTag: (tag: Tag) => void
	availableTags: Tag[]
}

function EditNote({ onUpdateNote, onAddTag, availableTags }: EditNoteProps) {
	const note = useNote()
	const handleUpdate = (data: NoteData) => {
		onUpdateNote(note.id, data)
	}
	return (
		<>
			<h1>Edit Note</h1>
			<NoteForm
				note={note}
				availableTags={availableTags}
				onSubmit={(data) => handleUpdate(data)}
				onAddTag={onAddTag}
			/>
		</>
	)
}

export default EditNote
