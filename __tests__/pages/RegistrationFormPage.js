import { screen, within } from '@testing-library/react'
import { expect } from 'vitest'

export class RegistrationFormPage {
  constructor({ user }) {
    this.user = user
  }

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

  expectResultsVisible() {
    expect(this.table).toBeInTheDocument()
    return this
  }

  expectTableContains(text) {
    expect(within(this.table).getByText(text)).toBeInTheDocument()
    return this
  }
}
