import React, { useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Note, Tag } from "./App"

type NoteListProps = {
	availableTags: Tag[]
	filteredNote: Note[]
}

function NoteList({ availableTags, filteredNote }: NoteListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [title, setTitle] = useState<string>()
	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>Notes</h1>
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to="/new">
							<Button variant="primary">Create</Button>
						</Link>
						<Button variant="outline-secondary">Edits Tags</Button>
					</Stack>
				</Col>
			</Row>
			<Form>
				<Row className="my-4">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<ReactSelect
								value={selectedTags.map((tag) => {
									return { label: tag.label, value: tag.id }
								})}
								options={availableTags.map((tag) => {
									return { label: tag.label, value: tag.id }
								})}
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => {
											return { label: tag.label, id: tag.value }
										})
									)
								}}
								isMulti
								placeholder="Chọn tag..."
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>

			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
				{filteredNote.map((note: Note) => {
					return <div>{note.title}</div>
				})}
			</Row>
		</>
	)
}

export default NoteList
