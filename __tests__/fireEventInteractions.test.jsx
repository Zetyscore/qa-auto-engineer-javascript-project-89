import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'
import { ChatbotWidgetPage } from './pages/ChatbotWidgetPage.js'

describe('Chatbot interactions via fireEvent()', () => {
  it('integration: chatbot clicks do not submit the host form (fireEvent)', async () => {
    render(<App />)
    const chatbot = new ChatbotWidgetPage()

    expect(screen.queryByRole('button', { name: /назад/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()

    await chatbot.openWithFireEvent()
    await chatbot.clickButtonWithFireEvent(/^Start$/i)

    expect(screen.getByText(/What would you like to know/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /назад/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
