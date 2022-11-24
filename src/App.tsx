import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import NewNote from "./NewNote"
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
		console.log(tags)

		setNotes((prevNotes) => {
			return [
				...prevNotes,
				{ ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
			]
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
<<<<<<< HEAD
					element={
						<NoteList availableTags={tags} filteredNote={notesWithTags} />
					}
=======
					element={<NoteList availableTags={tags} notes={notesWithTags} />}
>>>>>>> 978658e7c57743f3bb814e84acc0f5961ad930a7
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
				<Route path="/:id">
					<Route index element={<h1>Show</h1>} />
					<Route path="edit" element={<h1>Edit</h1>} />
				</Route>

				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Container>
	)
}

export default App
