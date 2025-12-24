import { describe, it, expect } from 'vitest'
import { render, within } from '@testing-library/react'
import App from '../src/App'
import { setupUser } from './setup.js'
import { ChatbotWidgetPage } from './pages/ChatbotWidgetPage.js'
import { RegistrationFormPage } from './pages/RegistrationFormPage.js'

describe('Приложение с виджетом чат-бота', () => {
  describe('Функционал формы', () => {
    it('отправляет форму и отображает результаты', async () => {
      const user = setupUser()
      render(<App />)
      const form = new RegistrationFormPage({ user })

      await form.fill({
        email: 'test@example.com',
        password: 'password123',
        city: 'Москва',
        country: 'Россия',
        acceptRules: true,
      })
      await form.submitForm()

      expect(form.isResultsVisible()).toBe(true)
      expect(form.hasTable()).toBe(true)
      expect(within(form.table).getByText('test@example.com')).toBeInTheDocument()
      expect(within(form.table).getByText('Москва')).toBeInTheDocument()
      expect(within(form.table).getByText('Россия')).toBeInTheDocument()
      expect(within(form.table).getByText('true')).toBeInTheDocument()
    })

    it('не отображает таблицу и кнопку "Назад" до отправки формы', async () => {
      const user = setupUser()
      render(<App />)
      const form = new RegistrationFormPage({ user })

      expect(form.isFormVisible()).toBe(true)
      expect(form.isResultsVisible()).toBe(false)
      expect(form.hasBackButton()).toBe(false)
    })
  })

  describe('Присутствие виджета', () => {
    it('открывает чат-бот без влияния на форму', async () => {
      const user = setupUser()
      render(<App />)
      const form = new RegistrationFormPage({ user })
      const chatbot = new ChatbotWidgetPage({ user })

      await form.fill({ email: 'test@example.com' })
      await chatbot.open()

      expect(chatbot.isOpen()).toBe(true)
      expect(form.email).toHaveValue('test@example.com')
    })
  })

  describe('Взаимодействие формы и чат-бота', () => {
    it('позволяет отправить форму при открытом чат-боте', async () => {
      const user = setupUser()
      render(<App />)
      const form = new RegistrationFormPage({ user })
      const chatbot = new ChatbotWidgetPage({ user })

      await form.fill({ email: 'integration@test.com', acceptRules: true })
      await chatbot.open()
      await form.submitForm()

      expect(form.isResultsVisible()).toBe(true)
      expect(within(form.table).getByText('integration@test.com')).toBeInTheDocument()
      expect(within(form.table).getByText('true')).toBeInTheDocument()
      expect(chatbot.isOpen()).toBe(true)
    })

    it('сохраняет независимое состояние формы и чат-бота', async () => {
      const user = setupUser()
      render(<App />)
      const form = new RegistrationFormPage({ user })
      const chatbot = new ChatbotWidgetPage({ user })

      await form.fill({ email: 'state@test.com', country: 'Китай' })

      await chatbot.open()
      await chatbot.clickButton(/^Start$/i)
      await chatbot.clickButton(/Tell me about features/i)

      expect(chatbot.isMessageVisible(/This chatbot supports multiple messages/i)).toBe(true)
      expect(form.email).toHaveValue('state@test.com')
      expect(form.country).toHaveValue('Китай')
    })

    it('клики в чат-боте не отправляют родительскую форму (fireEvent)', async () => {
      const user = setupUser()
      render(<App />)
      const form = new RegistrationFormPage({ user })
      const chatbot = new ChatbotWidgetPage()

      expect(form.hasBackButton()).toBe(false)
      expect(form.hasTable()).toBe(false)

      await chatbot.openWithFireEvent()
      await chatbot.clickButtonWithFireEvent(/^Start$/i)

      expect(chatbot.isMessageVisible(/What would you like to know/i)).toBe(true)
      expect(form.isFormVisible()).toBe(true)
      expect(form.hasBackButton()).toBe(false)
      expect(form.hasTable()).toBe(false)
    })
  })
})
