import { render, screen } from '@testing-library/react'

import '../test-utility/shopifyMock'

import RouterWrap, { createMockRouter } from '../test-utility/nextRouterMock'

import App from '../pages/_app'
import { Router } from 'next/router'

const TestComponent = () => {
  return <div data-testid="content"> {'TestContent'}</div>
}

const customRender = () => {
  render(
    <RouterWrap>
      <App
        Component={TestComponent}
        pageProps={{}}
        router={createMockRouter({}) as Router}
      />
    </RouterWrap>
  )
}

describe('<App/>', () => {
  const { getByTestId, debug } = screen
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should render content', () => {
    customRender()
    getByTestId('content')
  })
  it('should render cart', () => {
    customRender()
    getByTestId('cart')
  })

  it('should handle page Transition', () => {
    customRender()
  })
})
