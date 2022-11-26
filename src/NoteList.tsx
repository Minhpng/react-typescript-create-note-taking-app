import { useState } from "react"
import { Badge, Button, Card, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import Select from "react-select"
import { Note, Tag } from "./App"

type NoteListProps = {
	notes: Note[]
	availableTags: Tag[]
	onUpdateTag: (id: string, label: string) => void
}

function NoteList({ notes, availableTags, onUpdateTag }: NoteListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [title, setTitle] = useState("")
	const filteredNotes = notes.filter((note) => {
		return (
			(title == "" || note.title.includes(title)) &&
			(selectedTags.length === 0 ||
				selectedTags.every((tag) =>
					note.tags.some((noteTag) => tag.id === noteTag.id)
				))
		)
	})
	return (
		<>
			<Row className="mb-4">
				<Col>
					<h1>Notes</h1>
				</Col>
				<Col xs="auto">
					<Stack direction="horizontal" gap={2}>
						<Link to="/new">
							<Button variant="primary">Create</Button>
						</Link>
						<Button variant="outline-secondary">Edit Tags</Button>
					</Stack>
				</Col>
			</Row>
			<Form className="mb-4">
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								type="text"
								placeholder="Search notes"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>Tags</Form.Label>
							<Select
								value={selectedTags.map((tag) => {
									return { label: tag.label, value: tag.id }
								})}
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => {
											return { id: tag.value, label: tag.label }
										})
									)
								}}
								isMulti
								options={availableTags.map((tag) => {
									return { label: tag.label, value: tag.id }
								})}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
				{filteredNotes.map((note) => {
					return (
						<Col key={note.id}>
							<NoteCard
								key={note.id}
								title={note.title}
								tags={note.tags}
								id={note.id}
							/>
						</Col>
					)
				})}
			</Row>
			<EditTag availableTags={availableTags} onUpdateTag={onUpdateTag} />
		</>
	)
}

export default NoteList

type simplifiedNote = {
	id: string
	title: string
	tags: Tag[]
}

function NoteCard({ id, title, tags }: simplifiedNote) {
	return (
		<>
			<Card as={Link} to={`/${id}`} className="text-decoration-none text-reset">
				<Card.Body>
					<Stack gap={2} className="align-items-center">
						<span className="fs-5">{title}</span>
						<Stack
							direction="horizontal"
							className="flex-wrap align-items-center justify-content-center"
							gap={1}
						>
							{tags.length > 0 &&
								tags.map((tag) => {
									return <Badge key={tag.id}>{tag.label}</Badge>
								})}
						</Stack>
					</Stack>
				</Card.Body>
			</Card>
		</>
	)
}

type EditTagProps = {
	availableTags: Tag[]
	onUpdateTag: (id: string, label: string) => void
}

function EditTag({ availableTags, onUpdateTag }: EditTagProps) {
	return (
		<Form>
			<Stack gap={2}>
				{availableTags.map((tag) => {
					return (
						<Form.Control
							key={tag.id}
							defaultValue={tag.label}
							onChange={(e) => onUpdateTag(tag.id, e.target.value)}
						/>
					)
				})}
			</Stack>
		</Form>
	)
}
