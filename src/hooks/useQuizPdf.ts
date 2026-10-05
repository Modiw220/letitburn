import { jsPDF } from 'jspdf'
import type { FullReflectionReport } from '../types/quizResults'
import {
  generateReportFilename,
  reportFilenamePrefix,
} from '../utils/generateReportFilename'

export function generateQuizPdf(report: FullReflectionReport): void {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' })
  const margin = 48
  let y = margin
  const pageWidth = doc.internal.pageSize.getWidth()
  const contentWidth = pageWidth - margin * 2
  let pageNumber = 1

  const addPageIfNeeded = (height = 60) => {
    if (y + height > doc.internal.pageSize.getHeight() - margin) {
      doc.setFontSize(9)
      doc.setTextColor(120)
      doc.text(`Page ${pageNumber}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 24, {
        align: 'right',
      })
      doc.addPage()
      pageNumber += 1
      y = margin
    }
  }

  const writeParagraph = (text: string, fontSize = 11, spacing = 16) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(fontSize)
    doc.setTextColor(30)
    const lines = doc.splitTextToSize(text, contentWidth)
    lines.forEach((line: string) => {
      addPageIfNeeded(spacing)
      doc.text(line, margin, y)
      y += spacing
    })
  }

  const writeHeading = (text: string) => {
    addPageIfNeeded(28)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(20)
    doc.text(text, margin, y)
    y += 24
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('Let It Burn', margin, y)
  y += 28
  writeHeading(`${report.quizTitle} Full Reflection Report`)
  writeParagraph(`Completed: ${new Date(report.generatedAt).toLocaleDateString()}`)
  writeParagraph(report.summary)
  writeParagraph(
    'This report is for personal reflection and is not a medical or psychological diagnosis.',
  )

  writeHeading('Overall Reflection')
  writeParagraph(
    `${report.basicResult.range.label} Score: ${report.basicResult.totalScore} out of ${report.basicResult.maximumScore}.`,
  )
  writeParagraph(report.basicResult.range.explanation)
  writeParagraph(`Suggested next step: ${report.basicResult.range.suggestedNextStep}`)

  report.dimensionBreakdowns.forEach((section) => {
    writeHeading(section.title)
    writeParagraph(
      `${section.score} out of ${section.maximumScore} · ${section.interpretationLabel}`,
    )
    section.explanation.forEach((paragraph) => writeParagraph(paragraph))
    writeParagraph(`Reflection question: ${section.reflectionQuestion}`)
    writeParagraph(`Practical suggestion: ${section.practicalSuggestion}`)
  })

  writeHeading('Personalized Reflection Prompts')
  report.prompts.forEach((prompt, index) => writeParagraph(`${index + 1}. ${prompt}`))

  writeHeading('Calming Exercises')
  report.exercises.forEach((exercise) => {
    writeParagraph(`${exercise.title}: ${exercise.instructions}`)
  })

  writeHeading('Suggested Let It Burn Tools')
  writeParagraph('Write and Release: /burn-thoughts')
  writeParagraph('Listen to a Calming Sound: /sounds')
  writeParagraph('Try Relaxing Drawing: /relaxing-drawing')

  writeHeading('Privacy Note')
  writeParagraph(
    'This report was generated locally in your browser session. Let It Burn does not provide medical diagnosis.',
  )
  writeParagraph('Safety resources: /safety-resources')

  doc.setFontSize(9)
  doc.setTextColor(120)
  doc.text(`Page ${pageNumber}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 24, {
    align: 'right',
  })

  doc.save(generateReportFilename(reportFilenamePrefix(report.quizSlug)))
}

export function useQuizPdf() {
  return { generateQuizPdf }
}
