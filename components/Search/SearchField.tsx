import Icon from '@components/Icon'
import Input from '@components/inputs/Input'
import * as React from 'react'

interface ISearchfieldProps {
  loading: boolean
  onChange: (v: string) => void
  value: string
}

const Searchfield: React.FunctionComponent<ISearchfieldProps> = (props) => {
  const { onChange, value, loading } = props
  return (
    <div
      data-testid="searchField"
      className="relative w-full max-w-[300px] mx-auto text-frida-pink "
    >
      <Input
        role="search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className=" flex justify-center items-center absolute left-2 top-1.5 bottom-1.5  z-10">
        {loading ? <LoadingSVG /> : <SearchIcon />}
      </div>
      <div className=" flex justify-center items-center absolute right-2 top-1.5 bottom-1.5  z-10">
        {value && (
          <Icon
            data-testid="searchField__clearIcon"
            icon="x"
            size="s"
            onClick={() => onChange('')}
            bgColor="pink"
          />
        )}
      </div>
    </div>
  )
}

export default Searchfield

const LoadingSVG = () => {
  return (
    <svg
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      className=" w-7 h-7 stroke-2  stroke-current "
      data-testid="searchField__loadingIcon"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="16" strokeWidth="6" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  )
}

const SearchIcon = () => {
  return (
    <svg
      data-testid="searchField__searchIcon"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className=" w-7 h-7  stroke-2  stroke-current"
    >
      <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
    </svg>
  )
}
