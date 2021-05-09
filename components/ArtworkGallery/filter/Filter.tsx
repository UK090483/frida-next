import React, { useState } from 'react'
import DropDown from '../../lib/input/DropDown'

// import { useQueryParams, StringParam } from 'use-query-params'
import { ArtworkRecord } from 'types'

const preisOptions = [
  { label: '100-500', value: '100-500' },
  { label: '500-1000', value: '500-1000' },
  { label: '1000-2000', value: '1000-2000' },
  { label: '2000-3000', value: '2000-3000' },
  { label: '3000-5000', value: '3000-5000' },
]

type FilterProps = {
  artworks: ArtworkRecord[]
}

const Filter: React.FC<FilterProps> = ({ artworks }) => {
  const [currentlyOpen, setCurrentlyOpen] = useState('')
  const [filter, setF] = useState({})

  // const [query, setQuery] = useQueryParams({
  //   artist: StringParam,
  //   stil: StringParam,
  //   medium: StringParam,
  //   price: StringParam,
  // })

  const getOptions = () => {
    const artists: string[] = []
    const ArtistsOptions: any[] = []
    const stils: string[] = []
    const StilOptions: any[] = []
    const mediums: string[] = []
    const MediumOptions: any[] = []

    artworks.forEach((artwork: any) => {
      const { artistName, stil, medium } = artwork

      if (!artists.includes(artistName)) {
        artists.push(artistName)
        ArtistsOptions.push({ label: artistName, value: artistName })
      }
      if (!stils.includes(stil)) {
        stils.push(stil)
        StilOptions.push({ label: stil, value: stil })
      }
      if (!mediums.includes(medium)) {
        mediums.push(medium)
        MediumOptions.push({ label: medium, value: medium })
      }
    })

    const sortedArtists = [...ArtistsOptions].sort(function (a, b) {
      var labelA = a.label.toUpperCase()
      var labelB = b.label.toUpperCase()
      if (labelA < labelB) {
        return -1
      }
      if (labelA > labelB) {
        return 1
      }
      return 0
    })

    return {
      artist: sortedArtists,
      stil: StilOptions,
      medium: MediumOptions,
    }
  }

  const options = getOptions()

  const handleSetOpen = (i: string | false) => {
    setCurrentlyOpen(i ? i : '')
  }

  const setFilter = (name: string, value: string | boolean) => {
    let nextFilter: { [k: string]: string | boolean } = { ...filter }
    nextFilter[name] = value

    const nextQuery = Object.entries(nextFilter).reduce((acc, [key, item]) => {
      if (key === 'Preis') {
        key = 'price'
      }
      return { ...acc, ...(item ? { [key.toLowerCase()]: item } : {}) }
    }, {})

    // setQuery(nextQuery, 'push')
  }

  return (
    <div
      className={
        'w-full flex flex-wrap xl:flex-nowrap  items-center justify-center'
      }
    >
      <DropDown
        label={'Künstler'}
        name={'Artist'}
        options={options.artist}
        open={currentlyOpen === 'Künstler'}
        setOpen={(i) => handleSetOpen(i)}
        onChange={setFilter}
        fixedHeight={true}
      ></DropDown>
      <DropDown
        label={'Stil'}
        name={'Stil'}
        options={options.stil}
        open={currentlyOpen === 'Stil'}
        setOpen={(i) => handleSetOpen(i)}
        onChange={setFilter}
      ></DropDown>
      <DropDown
        label={'Medium'}
        name={'Medium'}
        options={options.medium}
        open={currentlyOpen === 'Medium'}
        setOpen={(i) => handleSetOpen(i)}
        onChange={setFilter}
      ></DropDown>
      <DropDown
        label={'Preis'}
        name={'Preis'}
        options={preisOptions}
        open={currentlyOpen === 'Preis'}
        setOpen={(i) => handleSetOpen(i)}
        onChange={setFilter}
      ></DropDown>
    </div>
  )
}

export default Filter
