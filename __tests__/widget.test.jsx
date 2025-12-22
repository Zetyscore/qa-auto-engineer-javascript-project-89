import { describe, it, expect } from 'vitest'
import simpleSteps from '../__fixtures__/simpleSteps.js'
import { renderChatbotWidget } from './utils/renderers.js'

describe('Chatbot Widget', () => {
  it('should display the chat toggle button', async () => {
    const { chatbot } = renderChatbotWidget(simpleSteps)
    expect(await chatbot.findToggleButton()).toBeInTheDocument()
  })

  it('should display the first step message and buttons after opening chat', async () => {
    const { chatbot } = renderChatbotWidget(simpleSteps)
    await chatbot.open()
    chatbot.expectMessageVisible(/Welcome! This is a simple chatbot/i)
    chatbot.expectButtonVisible(/^Start$/i)
  })

  it('should render without errors', () => {
    renderChatbotWidget(simpleSteps)
    expect(document.body).toBeTruthy()
  })
})
