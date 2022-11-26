import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate, useOutletContext } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import NewNote from "./NewNote"
import NoteList from "./NoteList"
import useLocalStorage from "./useLocalStorage"

export type Note = {
	id: string
} & NoteData

export type NoteData = {
	title: string
	tags: Tag[]
	markdown: string
}

export type Tag = {
	id: string
	label: string
}

function App() {
	const [notes, setNotes] = useLocalStorage<Note[]>("NOTES", [])
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [
		{ id: "asdfasd", label: "morning" },
	])

	function onCreateNote({ title, tags, markdown }: NoteData) {
		setNotes((prevNotes) => {
			return [...prevNotes, { id: uuidV4(), title, tags, markdown }]
		})
	}

	function onCreateTags(data: Tag) {
		setTags((prevTags) => {
			return [...prevTags, data]
		})
	}

<<<<<<< HEAD
=======
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

	function onDeleteTags(id: string) {
		console.log(id)
		setTags((prevtags) => {
			return tags.filter((tag) => tag.id !== id)
		})
	}

	function onUpdateTags(id: string, label: string) {
		setTags((prevTags) => {
			return prevTags.map((tag) => {
				if (tag.id === id) {
					return { ...tag, label }
				} else {
					return tag
				}
			})
		})
	}

>>>>>>> 667f1dd08275f72fca1350088353b14395fce2fd
	return (
		<Container className="my-4">
			<Routes>
				<Route
					path="/"
<<<<<<< HEAD
					element={<NoteList notes={notes} availableTags={tags} />}
				></Route>
=======
					element={
						<NoteList
							availableTags={tags}
							notes={notesWithTags}
							onDeleteTags={onDeleteTags}
							onUpdateTags={onUpdateTags}
						/>
					}
				/>
>>>>>>> 667f1dd08275f72fca1350088353b14395fce2fd
				<Route
					path="/new"
					element={
						<NewNote
							availableTags={tags}
							onSubmit={onCreateNote}
							onAddTag={onCreateTags}
						/>
					}
				></Route>
				<Route path="/:id">
					<Route index element={<h1>Show</h1>}></Route>
					<Route path="edit" element={<h1>Edit Note</h1>}></Route>
				</Route>
				<Route path="*" element={<Navigate to="/" replace />}></Route>
			</Routes>
		</Container>
	)
}

export default App
