import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Note } from "./App"
import { useNote } from "./NoteLayout"

type NoteProps = {
	onDeleteNote: (id: string) => void
}

function NotePage({ onDeleteNote }: NoteProps) {
	const note = useNote()

	const navigate = useNavigate()

	const handleDeleteNote = () => {
		onDeleteNote(note.id)

		navigate("/")
	}

	return (
		<Row>
			<Col>
				<h1>{note.title}</h1>
				<Stack gap={2} direction="horizontal" className="flex-wrap">
					{note.tags.length > 0 &&
						note.tags.map((tag) => {
							return <Badge key={tag.id}>{tag.label}</Badge>
						})}
				</Stack>
			</Col>
			<Col xs="auto">
				<Stack gap={2} direction="horizontal">
					<Link to={`/${note.id}/edit`}>
						<Button variant="primary">Edit</Button>
					</Link>
					<Button onClick={handleDeleteNote} variant="outline-danger">
						Delete
					</Button>
					<Link to="..">
						<Button variant="outline-secondary">Back</Button>
					</Link>
				</Stack>
			</Col>
		</Row>
	)
}

export default NotePage
