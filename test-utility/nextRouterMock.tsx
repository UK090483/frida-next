import { NextRouter } from 'next/router'

import { RouterContext } from 'next/dist/shared/lib/router-context'

export type MockRouterProps = Partial<NextRouter>
export function createMockRouter(router: MockRouterProps): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    ...router,
  }
}

const RouterWrap: React.FC<MockRouterProps> = ({ children, ...rest }) => {
  return (
    <RouterContext.Provider value={createMockRouter({ ...rest })}>
      {children}
    </RouterContext.Provider>
  )
}

export default RouterWrap
