import { render, screen } from '@testing-library/react'
import Layout from './Layout'
import 'test-utility/intersectionMock'
import RouterWrap, { MockRouterProps } from 'test-utility/nextRouterMock'

const customRender = (props?: { RouterPros?: MockRouterProps }) => {
  render(
    <RouterWrap {...props?.RouterPros}>
      <Layout title="testTitle">
        <div data-testid="content">content</div>
      </Layout>
    </RouterWrap>
  )
}

describe('<Layout/>', () => {
  const { getByTestId, debug, queryByTestId } = screen

  it('should render content', () => {
    customRender()
    getByTestId('content')
  })
  it('should render Header', () => {
    customRender()
    getByTestId('header')
  })
  it('should render Footer', () => {
    customRender()
    getByTestId('footer')
  })

  it('should hide preview Indexer', () => {
    customRender({ RouterPros: { isPreview: false } })
    expect(queryByTestId('PreviewIndexer')).toBeFalsy()
  })

  it('should show preview Indexer', () => {
    customRender({ RouterPros: { isPreview: true } })
    getByTestId('PreviewIndexer')
  })
})
