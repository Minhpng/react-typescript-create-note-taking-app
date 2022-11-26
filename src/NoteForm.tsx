import React, { FormEvent, useRef, useState } from "react"
import { Row, Col, Form, Stack, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "./App"

import { v4 as uuidV4 } from "uuid"

type NoteFormProps = {
	availableTags: Tag[]
	onSubmit: (data: NoteData) => void
	onAddTag: (data: Tag) => void
	note?: NoteData
}

function NoteForm({
	availableTags,
	onSubmit,
	onAddTag,
	note = { title: "", tags: [], markdown: "" },
}: NoteFormProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>(note.tags)

	const titleRef = useRef<HTMLInputElement>(null)
	const markdownRef = useRef<HTMLTextAreaElement>(null)

	const navigate = useNavigate()
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
		})

		navigate("/")
	}
	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={3}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								ref={titleRef}
								type="text"
								required
								defaultValue={note.title}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect
								onCreateOption={(label) => {
									const newTag = { id: uuidV4(), label: label }
									onAddTag(newTag)
									setSelectedTags((prev) => [...prev, newTag])
								}}
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
							/>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control
						required
						ref={markdownRef}
						as="textarea"
						rows={15}
						defaultValue={note.markdown}
					/>
				</Form.Group>

				<Stack gap={1} direction="horizontal" className="justify-content-end">
					<Button variant="primary" type="submit">
						Save
					</Button>
					<Link to="..">
						<Button variant="outline-secondary">Cancel</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	)
}

export default NoteForm
