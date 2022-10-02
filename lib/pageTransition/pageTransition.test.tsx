import { render, screen as s, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import PageTransition from './PageTransition'

const testPages = ['page1', 'page2', 'page3']
const TestComponent = (props: { name: string }) => {
  return <div data-testid={props.name}></div>
}

const TestRender = (props?: { onEnter?: () => {} }) => {
  const [page, setPage] = useState(testPages[0])
  return (
    <>
      {testPages.map((name) => (
        <button
          key={name}
          data-testid={`link-${name}`}
          onClick={() => {
            setPage(name)
          }}
        />
      ))}
      <PageTransition onEnter={props?.onEnter}>
        <TestComponent key={page} name={page} />
      </PageTransition>
    </>
  )
}

describe('<PageTransition/>', () => {
  it('should render child', () => {
    render(<TestRender />)
    s.getByTestId('page1')

    expect(s.getByTestId('pageSwitchWrap')).toHaveStyle({ opacity: 1 })
  })
  it('should transition Page out', async () => {
    render(<TestRender />)
    await userEvent.click(s.getByTestId('link-page2'))
    s.getByTestId('page1')
    expect(s.getByTestId('pageSwitchWrap')).toHaveStyle({ opacity: 0 })
  })

  it('should change Page after transition out', async () => {
    render(<TestRender />)
    await userEvent.click(s.getByTestId('link-page2'))
    fireEvent.transitionEnd(s.getByTestId('pageSwitchWrap'))
    s.getByTestId('page2')
  })

  it('should callback after transition out', async () => {
    const onEnter = jest.fn()
    render(<TestRender onEnter={onEnter} />)
    await userEvent.click(s.getByTestId('link-page2'))
    fireEvent.transitionEnd(s.getByTestId('pageSwitchWrap'))
    expect(onEnter).toHaveBeenCalledTimes(1)
  })

  it('should transition in after Page change', async () => {
    render(<TestRender />)
    await userEvent.click(s.getByTestId('link-page2'))
    fireEvent.transitionEnd(s.getByTestId('pageSwitchWrap'))
    expect(s.getByTestId('pageSwitchWrap')).toHaveStyle({ opacity: 1 })
  })

  it('should transition Page', async () => {
    render(<TestRender />)

    await userEvent.click(s.getByTestId('link-page2'))
    expect(s.getByTestId('pageSwitchWrap')).toHaveStyle({ opacity: 0 })
    s.getByTestId('page1')
    fireEvent.transitionEnd(s.getByTestId('pageSwitchWrap'))
    expect(s.getByTestId('pageSwitchWrap')).toHaveStyle({ opacity: 1 })
    fireEvent.transitionEnd(s.getByTestId('pageSwitchWrap'))
    s.getByTestId('page2')

    await userEvent.click(s.getByTestId('link-page3'))
    expect(s.getByTestId('pageSwitchWrap')).toHaveStyle({ opacity: 0 })
    s.getByTestId('page2')
    fireEvent.transitionEnd(s.getByTestId('pageSwitchWrap'))
    expect(s.getByTestId('pageSwitchWrap')).toHaveStyle({ opacity: 1 })
    fireEvent.transitionEnd(s.getByTestId('pageSwitchWrap'))
    s.getByTestId('page3')

    await userEvent.click(s.getByTestId('link-page1'))
    expect(s.getByTestId('pageSwitchWrap')).toHaveStyle({ opacity: 0 })
    s.getByTestId('page3')
    fireEvent.transitionEnd(s.getByTestId('pageSwitchWrap'))
    expect(s.getByTestId('pageSwitchWrap')).toHaveStyle({ opacity: 1 })
    fireEvent.transitionEnd(s.getByTestId('pageSwitchWrap'))
    s.getByTestId('page1')
  })
  it('should not transition if PageKey is same', async () => {
    render(<TestRender />)

    await userEvent.click(s.getByTestId('link-page1'))
    expect(s.getByTestId('pageSwitchWrap')).toHaveStyle({ opacity: 1 })
  })
})
