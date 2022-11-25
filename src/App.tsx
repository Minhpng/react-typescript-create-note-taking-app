import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate, useOutletContext } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import EditNote from "./EditNote"
import NewNote from "./NewNote"
import Note from "./Note"
import NoteForm from "./NoteForm"
import NoteLayout from "./NoteLayout"
import NoteList from "./NoteList"
import useLocalStorage from "./useLocalStorage"

export type RawNote = {
	id: string
} & RawNoteData

export type RawNoteData = {
	title: string
	markdown: string
	tagIds: string[]
}
export type Note = {
	id: string
} & NoteData

export type NoteData = {
	title: string
	markdown: string
	tags: Tag[]
}

export type Tag = {
	id: string
	label: string
}

function App() {
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

	const notesWithTags = useMemo(() => {
		return notes.map((note) => {
			return {
				...note,
				tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
			}
		})
	}, [notes, tags])

	function onCreateNote({ tags, ...data }: NoteData) {
		setNotes((prevNotes) => {
			return [
				...prevNotes,
				{ ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
			]
		})
	}

	function onUpdateNote(id: string, { tags, ...data }: NoteData) {
		setNotes((prevNotes) => {
			return prevNotes.map((note) => {
				if (note.id === id) {
					return { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
				} else {
					return note
				}
			})
		})
	}

	function onDeleteNote(id: string) {
		setNotes((prev) => {
			const newNote = prev.filter((note) => note.id !== id)
			console.log(newNote)

			return [...newNote]
		})
	}

	function addTag(tag: Tag) {
		setTags((prev) => [...prev, tag])
	}

	return (
		<Container className="my-4">
			<Routes>
				<Route
					path="/"
					element={<NoteList availableTags={tags} notes={notesWithTags} />}
				/>
				<Route
					path="/new"
					element={
						<NewNote
							onSubmit={onCreateNote}
							onAddTag={addTag}
							availableTags={tags}
						/>
					}
				/>
				<Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
					<Route index element={<Note onDelete={onDeleteNote} />} />
					<Route
						path="edit"
						element={
							<EditNote
								onSubmit={onUpdateNote}
								onAddTag={addTag}
								availableTags={tags}
							/>
						}
					/>
				</Route>

				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Container>
	)
}

export default App
