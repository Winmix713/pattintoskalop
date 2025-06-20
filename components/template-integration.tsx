"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Library, Plus, Sparkles, Code, Palette } from "lucide-react"
import { TemplateLibrary } from "./template-library"
import { TemplatePreviewModal } from "./template-preview-modal"
import type { ComponentTemplate } from "@/lib/component-templates"

interface TemplateIntegrationProps {
  onTemplateSelect?: (template: ComponentTemplate) => void
  className?: string
}

export function TemplateIntegration({ onTemplateSelect, className = "" }: TemplateIntegrationProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ComponentTemplate | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [activeView, setActiveView] = useState<"library" | "custom">("library")

  const handlePreviewTemplate = (template: ComponentTemplate) => {
    setSelectedTemplate(template)
    setIsPreviewOpen(true)
  }

  const handleUseTemplate = (template: ComponentTemplate) => {
    onTemplateSelect?.(template)
    setIsPreviewOpen(false)

    // Show success notification
    console.log("✅ Template applied:", template.name)
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false)
    setSelectedTemplate(null)
  }

  return (
    <div className={`bg-gray-50 min-h-screen ${className}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Library className="w-8 h-8 text-blue-600" />
                Component Templates
              </h1>
              <p className="text-gray-600">
                Browse our collection of pre-built components or create your own custom templates
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                <Sparkles className="w-3 h-3 mr-1" />
                50+ Templates
              </Badge>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Template
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Library className="w-4 h-4" />
              Template Library
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Custom Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="mt-6">
            <TemplateLibrary onSelectTemplate={handleUseTemplate} onPreviewTemplate={handlePreviewTemplate} />
          </TabsContent>

          <TabsContent value="custom" className="mt-6">
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Templates</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Create and manage your own component templates. Save frequently used components for quick reuse.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create New Template
                </Button>
                <Button variant="outline">Import Template</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Template Preview Modal */}
        <TemplatePreviewModal
          template={selectedTemplate}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          onUseTemplate={handleUseTemplate}
        />
      </div>
    </div>
  )
}
