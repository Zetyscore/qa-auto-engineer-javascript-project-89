import { describe, it, expect } from 'vitest'
import App from '../src/App'
import { renderApp } from './utils/renderers.js'

describe('Integration: App with Chatbot Widget', () => {
  describe('Host Application Functionality', () => {
    it('should submit form and display results', async () => {
      const { form } = renderApp(<App />)

      await form.fill({
        email: 'test@example.com',
        password: 'password123',
        city: 'Москва',
        country: 'Россия',
        acceptRules: true,
      })
      await form.submitForm()

      form.expectResultsVisible()
      form.expectTableContains('test@example.com')
      form.expectTableContains('Москва')
      form.expectTableContains('Россия')
      form.expectTableContains('true')
    })
  })

  describe('Chatbot Widget Presence', () => {
    it('should open chatbot without affecting form', async () => {
      const { form, chatbot } = renderApp(<App />)

      await form.fill({ email: 'test@example.com' })
      await chatbot.open()
      chatbot.expectOpen()

      expect(form.email).toHaveValue('test@example.com')
    })
  })

  describe('Integration: Form and Chatbot Interaction', () => {
    it('should allow form submission while chatbot is open', async () => {
      const { form, chatbot } = renderApp(<App />)

      await form.fill({ email: 'integration@test.com', acceptRules: true })
      await chatbot.open()
      await form.submitForm()

      form.expectResultsVisible()
      form.expectTableContains('integration@test.com')
      form.expectTableContains('true')
      chatbot.expectOpen()
    })

    it('should maintain separate state for form and chatbot', async () => {
      const { form, chatbot } = renderApp(<App />)

      await form.fill({ email: 'state@test.com', country: 'Китай' })

      await chatbot.open()
      await chatbot.clickButton(/^Start$/i)
      await chatbot.clickButton(/Tell me about features/i)
      chatbot.expectMessageVisible(/This chatbot supports multiple messages/i)

      expect(form.email).toHaveValue('state@test.com')
      expect(form.country).toHaveValue('Китай')
    })
  })
})
