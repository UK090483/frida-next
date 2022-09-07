import { render, screen } from '@testing-library/react'
import SearchResults from './SearchResults'

const testText = 'test'

const testItems = ['a', 'b', 'c'].map((i) => ({
  href: i,
  label: `label-${i}`,
  text: `text-${i}`,
}))

describe('SearchResults', () => {
  const { getByTestId, queryByText, getByText } = screen
  it('should Render', () => {
    render(<SearchResults items={[]} />)
    expect(getByTestId('searchResults'))
  })
  it('should Render AltText', () => {
    render(<SearchResults alt={testText} items={[]} />)
    expect(getByText(testText))
  })
  it('should not Render AltText if has Items', () => {
    render(<SearchResults alt={testText} items={testItems} />)
    expect(queryByText(testText)).toBeNull()
  })

  it('should not Render  Items', () => {
    render(<SearchResults alt={testText} items={testItems} />)
    testItems.forEach((item) => {
      expect(getByText(item.label))
      expect(getByText(item.text))
      const link = getByTestId(
        `searchResults__link__${item.href}`
      ) as HTMLAnchorElement
      expect(link.href).toBe(`http://localhost/` + item.href)
    })
  })
})
