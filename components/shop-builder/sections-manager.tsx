"use client"

import { useState } from "react"
import { SectionEditorModal } from "./section-editor-modal"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DotsThreeVerticalIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
} from "@phosphor-icons/react"

interface SectionsManagerProps {
  sections: any[]
  setSections: (sections: any[]) => void
  onEditSection?: (section: any, index: number) => void
}

function SortableSection({ section, index, onEdit, onDelete }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.uniqueId || section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="mb-3 hover:border-primary transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {/* Drag Handle */}
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-2 hover:bg-accent rounded"
            >
              <DotsThreeVerticalIcon size={20} className="text-muted-foreground" />
            </button>

            {/* Section Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{section.thumbnail}</span>
                <div>
                  <p className="font-semibold text-sm">{section.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {section.category} • Position {index + 1}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(section, index)}
                className="gap-2"
              >
                <PencilIcon size={16} />
                Modifier
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(index)}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <TrashIcon size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function SectionsManager({
  sections,
  setSections,
  onEditSection,
}: SectionsManagerProps) {
  const [editingSection, setEditingSection] = useState<any>(null)
  const [editingIndex, setEditingIndex] = useState<number>(-1)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(
        (s) => (s.uniqueId || s.id) === active.id
      )
      const newIndex = sections.findIndex(
        (s) => (s.uniqueId || s.id) === over.id
      )

      setSections(arrayMove(sections, oldIndex, newIndex))
    }
  }

  const handleDelete = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index)
    setSections(newSections)
  }

  const handleEdit = (section: any, index: number) => {
    setEditingSection(section)
    setEditingIndex(index)
  }

  const handleSaveEdit = (updatedSection: any) => {
    const newSections = [...sections]
    newSections[editingIndex] = updatedSection
    setSections(newSections)
    setEditingSection(null)
    setEditingIndex(-1)
  }

  if (sections.length === 0) {
    return (
      <Card className="p-8 text-center border-dashed">
        <div className="space-y-2">
          <EyeIcon size={48} className="mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">
            Aucune section ajoutée. Sélectionnez des sections depuis la bibliothèque.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {sections.length} section{sections.length > 1 ? "s" : ""} • Glissez pour réorganiser
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.uniqueId || s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section, index) => (
            <SortableSection
              key={section.uniqueId || section.id}
              section={section}
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </DndContext>

      {/* Editor Modal */}
      <SectionEditorModal
        isOpen={editingSection !== null}
        onClose={() => {
          setEditingSection(null)
          setEditingIndex(-1)
        }}
        section={editingSection}
        onSave={handleSaveEdit}
      />
    </div>
  )
}
