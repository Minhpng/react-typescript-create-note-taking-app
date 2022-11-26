import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate, useOutletContext } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import NewNote from "./NewNote"
import NotePage from "./NotePage"
import NoteLayout from "./NoteLayout"
import NoteList from "./NoteList"
import useLocalStorage from "./useLocalStorage"
import EditNote from "./EditNote"

type RawNote = {
	id: string
} & RawData

type RawData = {
	title: string
	markdown: string
	tagIds: string[]
}

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
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

	const notesWithTags = notes.map((note) => {
		return {
			...note,
			tags: tags.filter((tag) => {
				console.log(note)

				return note.tagIds.includes(tag.id)
			}),
		}
	})

	function onCreateNote({ title, tags, markdown }: NoteData) {
		setNotes((prevNotes) => {
			return [
				...prevNotes,
				{ id: uuidV4(), title, markdown, tagIds: tags.map((tag) => tag.id) },
			]
		})
	}

	function onCreateTags(data: Tag) {
		setTags((prevTags) => {
			return [...prevTags, data]
		})
	}

	function onDeleteNote(id: string) {
		setNotes((prevNotes) => {
			const newNote = prevNotes.filter((note) => note.id !== id)
			return newNote
		})
	}

	function onUpdateNote(id: string, data: NoteData) {
		setNotes((prevNotes) => {
			const newNote = [...prevNotes]
			return newNote.map((note) => {
				if (note.id == id) {
					return { ...note, tagIds: data.tags.map((tag) => tag.id) }
				} else {
					return note
				}
			})
		})
	}

	function onUpdateTag(id: string, label: string) {
		setTags((prevtag) => {
			return prevtag.map((tag) => {
				if (tag.id == id) {
					return { ...tag, label }
				} else {
					return tag
				}
			})
		})
	}

	return (
		<Container className="my-4">
			<Routes>
				<Route
					path="/"
					element={
						<NoteList
							notes={notesWithTags}
							availableTags={tags}
							onUpdateTag={onUpdateTag}
						/>
					}
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
				<Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
					<Route
						index
						element={<NotePage onDeleteNote={onDeleteNote} />}
					></Route>
					<Route
						path="edit"
						element={
							<EditNote
								onUpdateNote={onUpdateNote}
								availableTags={tags}
								onAddTag={onCreateTags}
							/>
						}
					></Route>
				</Route>
				<Route path="*" element={<Navigate to="/" replace />}></Route>
			</Routes>
		</Container>
	)
}

export default App
