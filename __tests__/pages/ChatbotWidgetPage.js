import { screen, fireEvent } from '@testing-library/react'
import { expect } from 'vitest'

export class ChatbotWidgetPage {
  constructor({ user } = {}) {
    this.user = user
  }

  get toggleButton() {
    return screen.getByRole('button', { name: /открыть чат|open chat/i })
  }

  async findToggleButton() {
    return await screen.findByRole('button', { name: /открыть чат|open chat/i })
  }

  get closeButton() {
    return screen.getByRole('button', { name: /close/i })
  }

  get dialog() {
    return screen.getByRole('dialog')
  }

  async open() {
    if (!this.user) throw new Error('ChatbotWidgetPage.open() requires userEvent instance')
    await this.user.click(await this.findToggleButton())
  }

  async openWithFireEvent() {
    fireEvent.click(await this.findToggleButton())
  }

  async close() {
    if (!this.user) throw new Error('ChatbotWidgetPage.close() requires userEvent instance')
    await this.user.click(this.closeButton)
  }

  async clickButton(nameOrRegex) {
    if (!this.user) throw new Error('ChatbotWidgetPage.clickButton() requires userEvent instance')
    await this.user.click(await screen.findByRole('button', { name: nameOrRegex }))
  }

  async clickButtonWithFireEvent(nameOrRegex) {
    fireEvent.click(await screen.findByRole('button', { name: nameOrRegex }))
  }

  expectOpen() {
    expect(this.dialog).toBeInTheDocument()
    return this
  }

  expectClosed() {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    return this
  }

  expectMessageVisible(textOrRegex) {
    expect(screen.getByText(textOrRegex)).toBeInTheDocument()
    return this
  }

  expectButtonVisible(nameOrRegex) {
    expect(screen.getByRole('button', { name: nameOrRegex })).toBeInTheDocument()
    return this
  }
}
