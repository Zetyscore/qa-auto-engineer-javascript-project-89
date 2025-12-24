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

  // Действия
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

  async startConversation() {
    await this.open()
    await this.clickButton(/^Start$/i)
  }

  // Проверки состояния
  isOpen() {
    return screen.queryByRole('dialog') !== null
  }

  isClosed() {
    return screen.queryByRole('dialog') === null
  }

  isMessageVisible(textOrRegex) {
    return screen.queryByText(textOrRegex) !== null
  }

  isButtonVisible(nameOrRegex) {
    return screen.queryByRole('button', { name: nameOrRegex }) !== null
  }

  hasToggleButton() {
    return screen.queryByRole('button', { name: /открыть чат|open chat/i }) !== null
  }

  hasCloseButton() {
    return screen.queryByRole('button', { name: /close/i }) !== null
  }

  hasDialog() {
    return screen.queryByRole('dialog') !== null
  }

  // Ожидания (chainable)
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

  expectMessageNotVisible(textOrRegex) {
    expect(screen.queryByText(textOrRegex)).not.toBeInTheDocument()
    return this
  }

  expectButtonVisible(nameOrRegex) {
    expect(screen.getByRole('button', { name: nameOrRegex })).toBeInTheDocument()
    return this
  }

  expectButtonNotVisible(nameOrRegex) {
    expect(screen.queryByRole('button', { name: nameOrRegex })).not.toBeInTheDocument()
    return this
  }

  expectDialogHasClass(className) {
    expect(this.dialog).toHaveClass(className)
    return this
  }
}
