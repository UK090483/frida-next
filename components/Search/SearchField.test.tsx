import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchField from './SearchField'

const testString = 'test'
const testId = {
  container: 'searchField',
  searchIcon: 'searchField__searchIcon',
  clearIcon: 'searchField__clearIcon',
  loadingIcon: 'searchField__loadingIcon',
}

describe('SearchBar', () => {
  const { getByTestId, getByRole, queryByTestId } = screen
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })
  it('should render', () => {
    render(<SearchField value="" loading={false} onChange={() => null} />)
    expect(getByTestId(testId.container))
    expect(getByTestId(testId.searchIcon))
  })

  it('should show Value', async () => {
    render(
      <SearchField value={testString} loading={false} onChange={() => null} />
    )
    const field = getByRole('search') as HTMLInputElement
    expect(field.value).toBe(testString)
  })

  it('should take input', async () => {
    const mockOnChange = jest.fn()
    render(<SearchField value="" loading={false} onChange={mockOnChange} />)
    const field = getByRole('search')
    await userEvent.type(field, testString)
    expect(mockOnChange).toHaveBeenCalledTimes(testString.length)
    expect(mockOnChange).toHaveBeenCalledWith(testString[0])
  })

  it('should Erase Value', async () => {
    const mockOnChange = jest.fn()
    render(<SearchField value="a" loading={false} onChange={mockOnChange} />)
    const field = getByTestId(testId.clearIcon)
    await userEvent.click(field)
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('should Show loading state', async () => {
    render(<SearchField value="" loading={true} onChange={() => null} />)
    expect(getByTestId(testId.loadingIcon))
    const notThere = await queryByTestId(testId.searchIcon)
    expect(notThere).toBeNull()
  })
})
