import { describe, it, expect } from 'vitest'
import getWidget from '@hexlet/chatbot-v2'
import { render } from '@testing-library/react'
import { ChatbotWidgetPage } from './pages/ChatbotWidgetPage.js'

describe('Additional edge cases: invalid and unusual step data', () => {
  it('throws when buttons is null (observed behavior)', async () => {
    const steps = [
      {
        id: 'welcome',
        messages: undefined,
        buttons: null,
      },
    ]

    render(getWidget(steps))
    const chatbot = new ChatbotWidgetPage()
    await expect(chatbot.openWithFireEvent()).rejects.toThrow()
  })
})
