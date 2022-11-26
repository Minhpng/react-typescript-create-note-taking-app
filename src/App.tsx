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

	return (
		<Container className="my-4">
			<Routes>
				<Route
					path="/"
					element={<NoteList notes={notes} availableTags={tags} />}
				></Route>
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
