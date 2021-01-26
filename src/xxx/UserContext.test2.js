import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { UserContext, UserProvider } from '../context/User'

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider {...providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  )
}

test('UserProvider composes full name from first, last', () => {
  const providerProps = {
    first: 'Boba',
    last: 'Fett',
  }
  customRender(
    <UserContext.Consumer>
      {(value) => <span>Received: {value}</span>}
    </UserContext.Consumer>,
    { providerProps }
  )
  expect(screen.getByText(/^Received:/).textContent).toBe('Received: Boba Fett')
})

/**
 * A tree containing both a providers and consumer can be rendered normally
 */
test('UserProvider/Consumer shows name of character', () => {
  const wrapper = ({ children }) => (
    <UserProvider first="Leia" last="Organa">
      {children}
    </UserProvider>
  )
  expect(screen.getByText(/^My Name Is:/).textContent).toBe(
    'My Name Is: Leia Organa'
  )
})