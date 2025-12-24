import { screen, within } from '@testing-library/react'
import { expect } from 'vitest'

export class RegistrationFormPage {
  constructor({ user }) {
    this.user = user
  }

  // Элементы формы
  get email() {
    return screen.getByLabelText(/email/i)
  }

  get password() {
    return screen.getByLabelText(/пароль/i)
  }

  get address() {
    return screen.getByLabelText(/адрес/i)
  }

  get city() {
    return screen.getByLabelText(/город/i)
  }

  get country() {
    return screen.getByLabelText(/страна/i)
  }

  get acceptRules() {
    return screen.getByLabelText(/принять правила/i)
  }

  get submit() {
    return screen.getByRole('button', { name: /зарегистрироваться/i })
  }

  get table() {
    return screen.getByRole('table')
  }

  get backButton() {
    return screen.getByRole('button', { name: /назад/i })
  }

  // Действия
  async fill(fields) {
    if (fields.email != null) await this.user.type(this.email, fields.email)
    if (fields.password != null) await this.user.type(this.password, fields.password)
    if (fields.address != null) await this.user.type(this.address, fields.address)
    if (fields.city != null) await this.user.type(this.city, fields.city)
    if (fields.country != null) await this.user.selectOptions(this.country, fields.country)
    if (fields.acceptRules === true) await this.user.click(this.acceptRules)
  }

  async submitForm() {
    await this.user.click(this.submit)
  }

  async goBackToForm() {
    await this.user.click(this.backButton)
  }

  // Проверки состояния
  isFormVisible() {
    return screen.queryByRole('button', { name: /зарегистрироваться/i }) !== null
  }

  isResultsVisible() {
    return screen.queryByRole('table') !== null
  }

  hasBackButton() {
    return screen.queryByRole('button', { name: /назад/i }) !== null
  }

  hasTable() {
    return screen.queryByRole('table') !== null
  }

  // Ожидания (chainable)
  expectFormVisible() {
    expect(this.submit).toBeInTheDocument()
    return this
  }

  expectResultsVisible() {
    expect(this.table).toBeInTheDocument()
    return this
  }

  expectResultsNotVisible() {
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    return this
  }

  expectTableContains(text) {
    expect(within(this.table).getByText(text)).toBeInTheDocument()
    return this
  }

  expectBackButtonVisible() {
    expect(this.backButton).toBeInTheDocument()
    return this
  }

  expectBackButtonNotVisible() {
    expect(screen.queryByRole('button', { name: /назад/i })).not.toBeInTheDocument()
    return this
  }
}
