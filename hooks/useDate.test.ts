import useDate from './useDate'

const testDate1 = '2021-07-06T16:00:22Z'
const testDate2 = '2021-07-06T16:00:22Z'

const testData = {
  startDate: '2020-09-06',
  startDateRes: '6.9.2020',
  endDate: '2022-03-02',
  endDateRes: '2.3.2022',

  sameYear: {
    start: '2022-09-06',
    end: '2022-10-07',
    res: '6.9 - 7.10.2022',
  },
  sameMonth: {
    start: '2022-10-06',
    end: '2022-10-07',
    res: '6 - 7.10.2022',
  },
}

describe('useDate', () => {
  it('should get one date', () => {
    expect(useDate({ date: testData.startDate })).toBe(testData.startDateRes)
    expect(useDate({ date: testData.endDate })).toBe(testData.endDateRes)
  })
  it('should return nothing on bad data', () => {
    //@ts-ignore
    const log = jest.spyOn(global.console, 'log')
    log.mockImplementation(() => {})
    expect(useDate({ date: 'bad' })).toBeUndefined()
    expect(useDate({ date: '2022347239847239487-09-06' })).toBeUndefined()
    expect(log).toHaveBeenCalledTimes(2)
    expect(useDate({ date: null })).toBeUndefined()
  })

  it('should return on date if start and end are same', () => {
    expect(
      useDate({ date: testData.startDate, endDate: testData.startDate })
    ).toBe(testData.startDateRes)
  })

  it('should return correct date if start and end Year are same', () => {
    expect(
      useDate({ date: testData.sameYear.start, endDate: testData.sameYear.end })
    ).toBe(testData.sameYear.res)
  })
  it('should return correct date if start and end Month are same', () => {
    expect(
      useDate({
        date: testData.sameMonth.start,
        endDate: testData.sameMonth.end,
      })
    ).toBe(testData.sameMonth.res)
  })
  it('should return startDate if endDate is before startDate', () => {
    expect(
      useDate({
        date: testData.endDate,
        endDate: testData.startDate,
      })
    ).toBe(testData.endDateRes)
  })
})
