import React, { useMemo, useState } from "react"
import {
	Badge,
	Button,
	Card,
	Col,
	Form,
	FormControl,
	Modal,
	Row,
	Stack,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Tag } from "./App"

import styles from "./NoteList.module.css"

type simplifiedNote = {
	id: string
	tags: Tag[]
	title: string
}

type NoteListProps = {
	availableTags: Tag[]
	notes: simplifiedNote[]
	onUpdateTags: (id: string, label: string) => void
	onDeleteTags: (id: string) => void
}

function NoteList({
	availableTags,
	notes,
	onUpdateTags,
	onDeleteTags,
}: NoteListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [title, setTitle] = useState<string>("")

	const [isEditTagsModalOpen, setEditTagsModalOpen] = useState(false)

	const filteredNotes = useMemo(() => {
		return notes.filter((note) => {
			return (
				(title === "" ||
					note.title.toLowerCase().includes(title.toLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every((tag) =>
						note.tags.some((noteTag) => tag.id === noteTag.id)
					))
			)
		})
	}, [title, selectedTags, notes])

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
						<Button
							onClick={() => setEditTagsModalOpen(true)}
							variant="outline-secondary"
						>
							Edits Tags
						</Button>
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
				{filteredNotes.map((note) => {
					return (
						<Col key={note.id}>
							<NoteCard id={note.id} title={note.title} tags={note.tags} />
						</Col>
					)
				})}
			</Row>
			<EditTagsModal
				show={isEditTagsModalOpen}
				handleClose={() => setEditTagsModalOpen(false)}
				availableTags={availableTags}
				onDeleteTags={onDeleteTags}
				onUpdateTags={onUpdateTags}
			/>
		</>
	)
}

export default NoteList

function NoteCard({ id, title, tags }: simplifiedNote) {
	return (
		<Card
			as={Link}
			to={`/${id}`}
			className={`h-100 text-reset text-decoration-none ${styles.card}`}
		>
			<Card.Body>
				<Stack
					gap={2}
					className="align-items-center justify-content-center h-100"
				>
					<span className="fs-5">{title}</span>
					{tags.length > 0 && (
						<Stack
							gap={1}
							direction="horizontal"
							className="justify-content-center flex-wrap"
						>
							{tags.map((tag) => (
								<Badge key={tag.id} className="text-truncate">
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Stack>
			</Card.Body>
		</Card>
	)
}

type EditTagsModalProps = {
	show: boolean
	handleClose: () => void
	availableTags: Tag[]
	onUpdateTags: (id: string, label: string) => void
	onDeleteTags: (id: string) => void
}

function EditTagsModal({
	show,
	handleClose,
	availableTags,
	onDeleteTags,
	onUpdateTags,
}: EditTagsModalProps) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit tags</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Stack gap={3} direction="vertical">
						{availableTags.map((tag) => {
							return (
								<Row key={tag.id}>
									<Col>
										<FormControl
											value={tag.label}
											onChange={(e) => {
												onUpdateTags(tag.id, e.target.value)
											}}
										/>
									</Col>
									<Col xs="auto">
										<Button
											onClick={() => onDeleteTags(tag.id)}
											variant="outline-danger"
										>
											&times;
										</Button>
									</Col>
								</Row>
							)
						})}
					</Stack>
				</Form>
			</Modal.Body>
		</Modal>
	)
}
