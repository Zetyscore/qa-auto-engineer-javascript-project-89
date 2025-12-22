import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getWidget from '@hexlet/chatbot-v2'
import invalidSteps from '../__fixtures__/invalidSteps.js'

describe('Edge Cases: Chatbot Widget Error Handling', () => {
  describe('Invalid Configuration Data', () => {
    it('should render widget with broken nextStepId references', async () => {
      render(getWidget(invalidSteps))
      const user = userEvent.setup()

      const toggleButton = await screen.findByRole('button', { name: /открыть чат|open chat/i })
      await user.click(toggleButton)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText(/This configuration has invalid references/i)).toBeInTheDocument()
    })

    it('should handle clicking button with non-existent nextStepId', async () => {
      render(getWidget(invalidSteps))
      const user = userEvent.setup()

      await user.click(await screen.findByRole('button', { name: /открыть чат|open chat/i }))
      const brokenButton = await screen.findByRole('button', { name: /Go to non-existent step/i })

      await user.click(brokenButton)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should render with empty configuration array', async () => {
      render(getWidget([]))

      const toggleButton = await screen.findByRole('button', { name: /открыть чат|open chat/i })
      expect(toggleButton).toBeInTheDocument()
    })
  })
})
