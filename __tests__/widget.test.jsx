import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import getWidget from '@hexlet/chatbot-v2'
import simpleSteps from '../__fixtures__/simpleSteps.js'
import invalidSteps from '../__fixtures__/invalidSteps.js'
import { setupUser } from './setup.js'
import { ChatbotWidgetPage } from './pages/ChatbotWidgetPage.js'

describe('Chatbot Widget', () => {
  describe('Базовый функционал', () => {
    it('отображает кнопку открытия чата', async () => {
      const user = setupUser()
      render(getWidget(simpleSteps))
      const widget = new ChatbotWidgetPage({ user })

      expect(widget.hasToggleButton()).toBe(true)
    })

    it('отображает первое сообщение и кнопки после открытия чата', async () => {
      const user = setupUser()
      render(getWidget(simpleSteps))
      const widget = new ChatbotWidgetPage({ user })

      await widget.open()

      expect(widget.isMessageVisible(/Welcome! This is a simple chatbot/i)).toBe(true)
      expect(widget.isButtonVisible(/^Start$/i)).toBe(true)
    })

    it('рендерится без ошибок', () => {
      render(getWidget(simpleSteps))
      expect(document.body).toBeTruthy()
    })
  })

  describe('Модальное окно', () => {
    it('открывает модальное окно при клике на кнопку', async () => {
      const user = setupUser()
      render(getWidget(simpleSteps))
      const widget = new ChatbotWidgetPage({ user })

      await widget.open()

      expect(widget.isOpen()).toBe(true)
      expect(widget.hasDialog()).toBe(true)
    })

    it('закрывает модальное окно при клике на кнопку закрытия', async () => {
      const user = setupUser()
      render(getWidget(simpleSteps))
      const widget = new ChatbotWidgetPage({ user })

      await widget.open()
      expect(widget.isOpen()).toBe(true)

      await widget.close()
      expect(widget.isClosed()).toBe(true)
    })
  })

  describe('Навигация между шагами', () => {
    it('переходит на следующий шаг при клике на кнопку', async () => {
      const user = setupUser()
      render(getWidget(simpleSteps))
      const widget = new ChatbotWidgetPage({ user })

      await widget.open()
      expect(widget.isMessageVisible(/Welcome! This is a simple chatbot/i)).toBe(true)

      await widget.clickButton(/^Start$/i)
      expect(widget.isMessageVisible(/What would you like to know/i)).toBe(true)
    })

    it('поддерживает навигацию назад', async () => {
      const user = setupUser()
      render(getWidget(simpleSteps))
      const widget = new ChatbotWidgetPage({ user })

      await widget.open()
      await widget.clickButton(/^Start$/i)
      expect(widget.isMessageVisible(/What would you like to know/i)).toBe(true)

      await widget.clickButton(/Go back/i)
      expect(widget.isButtonVisible(/^Start$/i)).toBe(true)
    })
  })

  describe('Краевые случаи', () => {
    it('отображает виджет с некорректными ссылками на шаги', async () => {
      render(getWidget(invalidSteps))
      const widget = new ChatbotWidgetPage()

      await widget.openWithFireEvent()

      expect(widget.isOpen()).toBe(true)
      expect(widget.isMessageVisible(/This configuration has invalid references/i)).toBe(true)
    })

    it('обрабатывает клик на кнопку с несуществующим nextStepId', async () => {
      render(getWidget(invalidSteps))
      const widget = new ChatbotWidgetPage()

      await widget.openWithFireEvent()
      await widget.clickButtonWithFireEvent(/Go to non-existent step/i)

      expect(widget.isOpen()).toBe(true)
    })

    it('отображается с пустой конфигурацией', async () => {
      const user = setupUser()
      render(getWidget([]))
      const widget = new ChatbotWidgetPage({ user })

      expect(await widget.findToggleButton()).toBeInTheDocument()
    })

    it('выбрасывает ошибку при buttons: null', async () => {
      const steps = [
        {
          id: 'welcome',
          messages: undefined,
          buttons: null,
        },
      ]

      render(getWidget(steps))
      const widget = new ChatbotWidgetPage()
      await expect(widget.openWithFireEvent()).rejects.toThrow()
    })
  })
})
