import { describe, it, expect } from 'vitest'
import simpleSteps from '../__fixtures__/simpleSteps.js'
import { renderChatbotWidget } from './utils/renderers.js'

describe('Chatbot User Interactions', () => {
  describe('Modal Window Operations', () => {
    it('should open chat modal when toggle button is clicked', async () => {
      const { chatbot } = renderChatbotWidget(simpleSteps)
      await chatbot.open()
      expect(chatbot.dialog).toHaveClass('show')
    })

    it('should close chat modal when close button is clicked', async () => {
      const { chatbot } = renderChatbotWidget(simpleSteps)
      await chatbot.open()
      chatbot.expectOpen()

      await chatbot.close()
      chatbot.expectClosed()
    })
  })

  describe('Navigation Between Steps', () => {
    it('should navigate to next step when button is clicked', async () => {
      const { chatbot } = renderChatbotWidget(simpleSteps)

      await chatbot.open()
      chatbot.expectMessageVisible(/Welcome! This is a simple chatbot/i)

      await chatbot.clickButton(/^Start$/i)
      chatbot.expectMessageVisible(/What would you like to know/i)
    })
  })
})
