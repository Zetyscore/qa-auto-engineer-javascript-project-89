import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getWidget from '@hexlet/chatbot-v2'

import { ChatbotWidgetPage } from '../pages/ChatbotWidgetPage.js'
import { RegistrationFormPage } from '../pages/RegistrationFormPage.js'

export const setupUser = () => userEvent.setup()

export const renderChatbotWidget = (steps, { user } = {}) => {
  const actualUser = user ?? setupUser()
  const result = render(getWidget(steps))
  const chatbot = new ChatbotWidgetPage({ user: actualUser })
  return { user: actualUser, chatbot, ...result }
}

export const renderApp = (AppComponent, { user } = {}) => {
  const actualUser = user ?? setupUser()
  const result = render(AppComponent)
  const form = new RegistrationFormPage({ user: actualUser })
  const chatbot = new ChatbotWidgetPage({ user: actualUser })
  return { user: actualUser, form, chatbot, ...result }
}
