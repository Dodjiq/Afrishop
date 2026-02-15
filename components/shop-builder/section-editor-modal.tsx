"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SectionEditorModalProps {
  isOpen: boolean
  onClose: () => void
  section: any
  onSave: (updatedSection: any) => void
}

export function SectionEditorModal({
  isOpen,
  onClose,
  section,
  onSave,
}: SectionEditorModalProps) {
  const [editedSection, setEditedSection] = useState(section)

  useEffect(() => {
    setEditedSection(section)
  }, [section])

  const handleSave = () => {
    onSave(editedSection)
    onClose()
  }

  if (!section) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{section.thumbnail}</span>
            Modifier {section.name}
          </DialogTitle>
          <DialogDescription>
            Personnalisez le contenu de cette section
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Contenu</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4 mt-4">
            <FieldGroup>
              {/* Title */}
              <Field>
                <FieldLabel htmlFor="sectionTitle">Titre de la section</FieldLabel>
                <Input
                  id="sectionTitle"
                  placeholder="Ex: Comment ça marche ?"
                  value={editedSection.content?.title || ""}
                  onChange={(e) =>
                    setEditedSection({
                      ...editedSection,
                      content: {
                        ...editedSection.content,
                        title: e.target.value,
                      },
                    })
                  }
                />
              </Field>

              {/* Subtitle */}
              <Field>
                <FieldLabel htmlFor="sectionSubtitle">
                  Sous-titre (optionnel)
                </FieldLabel>
                <Input
                  id="sectionSubtitle"
                  placeholder="Ex: En 3 étapes simples"
                  value={editedSection.content?.subtitle || ""}
                  onChange={(e) =>
                    setEditedSection({
                      ...editedSection,
                      content: {
                        ...editedSection.content,
                        subtitle: e.target.value,
                      },
                    })
                  }
                />
              </Field>

              {/* Description */}
              <Field>
                <FieldLabel htmlFor="sectionDescription">Description</FieldLabel>
                <Textarea
                  id="sectionDescription"
                  placeholder="Décrivez cette section..."
                  rows={4}
                  value={editedSection.content?.description || ""}
                  onChange={(e) =>
                    setEditedSection({
                      ...editedSection,
                      content: {
                        ...editedSection.content,
                        description: e.target.value,
                      },
                    })
                  }
                />
              </Field>

              {/* Button Text */}
              <Field>
                <FieldLabel htmlFor="buttonText">
                  Texte du bouton (optionnel)
                </FieldLabel>
                <Input
                  id="buttonText"
                  placeholder="Ex: Acheter maintenant"
                  value={editedSection.content?.buttonText || ""}
                  onChange={(e) =>
                    setEditedSection({
                      ...editedSection,
                      content: {
                        ...editedSection.content,
                        buttonText: e.target.value,
                      },
                    })
                  }
                />
              </Field>
            </FieldGroup>
          </TabsContent>

          <TabsContent value="style" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Espacement</p>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="paddingTop">Padding haut</FieldLabel>
                    <select
                      id="paddingTop"
                      className="w-full h-10 px-3 rounded-md border bg-background"
                      value={editedSection.style?.paddingTop || "normal"}
                      onChange={(e) =>
                        setEditedSection({
                          ...editedSection,
                          style: {
                            ...editedSection.style,
                            paddingTop: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="none">Aucun</option>
                      <option value="small">Petit</option>
                      <option value="normal">Normal</option>
                      <option value="large">Grand</option>
                    </select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="paddingBottom">Padding bas</FieldLabel>
                    <select
                      id="paddingBottom"
                      className="w-full h-10 px-3 rounded-md border bg-background"
                      value={editedSection.style?.paddingBottom || "normal"}
                      onChange={(e) =>
                        setEditedSection({
                          ...editedSection,
                          style: {
                            ...editedSection.style,
                            paddingBottom: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="none">Aucun</option>
                      <option value="small">Petit</option>
                      <option value="normal">Normal</option>
                      <option value="large">Grand</option>
                    </select>
                  </Field>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Arrière-plan</p>
                <Field>
                  <FieldLabel htmlFor="backgroundColor">Couleur de fond</FieldLabel>
                  <select
                    id="backgroundColor"
                    className="w-full h-10 px-3 rounded-md border bg-background"
                    value={editedSection.style?.backgroundColor || "transparent"}
                    onChange={(e) =>
                      setEditedSection({
                        ...editedSection,
                        style: {
                          ...editedSection.style,
                          backgroundColor: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="transparent">Transparent</option>
                    <option value="white">Blanc</option>
                    <option value="muted">Gris clair</option>
                    <option value="primary">Couleur primaire</option>
                  </select>
                </Field>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
