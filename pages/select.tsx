import Select from '@components/Filter/Select'

import * as React from 'react'

const opt = [
  'aaaa',
  'bbbbb',
  'ccccc',
  'dddddd',
  'eeeeee',
  'ffffff',
  'ggggggg',
  'hhhhhhh',
  'iiiiiii',
]

const options = opt.map((i) => ({ name: i + i + i + i, value: i }))
const StyleSystem: React.FC = () => {
  const [state, setState] = React.useState<string | null>(null)
  return (
    <div className="grid grid-cols-1 gap-10 py-20 mx-auto lg:grid-cols-4 md:grid-cols-2 justify-items-center bg-frida-pink">
      <Select
        label="Artist"
        items={options}
        active={state}
        onChange={(v) => setState(v)}
      />
      <Select
        label="Artistr"
        items={options}
        active={state}
        onChange={(v) => setState(v)}
      />
      <Select
        label="Artistr"
        items={options}
        active={state}
        onChange={(v) => setState(v)}
      />
      <Select
        label="Artistr"
        items={options}
        active={state}
        onChange={(v) => setState(v)}
      />
    </div>
  )
}

export default StyleSystem
