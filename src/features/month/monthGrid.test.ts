import { describe, expect, it } from 'vitest'

import { buildMonthGrid, chunkIntoWeeks } from './monthGrid'

describe('buildMonthGrid', () => {
  it('returns 42 days starting on a Monday', () => {
    const grid = buildMonthGrid(new Date(2026, 7, 1))
    const [firstDay] = grid

    expect(grid).toHaveLength(42)
    expect(firstDay?.date.getDay()).toBe(1)
  })

  it('flags only days in the target month, including leading days from the prior month', () => {
    // August 2026 starts on a Saturday, so the grid leads with trailing July days.
    const grid = buildMonthGrid(new Date(2026, 7, 15))
    const [firstDay] = grid

    expect(grid.filter((d) => d.inCurrentMonth)).toHaveLength(31)
    expect(firstDay?.inCurrentMonth).toBe(false)
    expect(firstDay?.date.getMonth()).toBe(6)
  })

  it('chunks into 6 weeks of 7 days each', () => {
    const weeks = chunkIntoWeeks(buildMonthGrid(new Date(2026, 7, 1)))

    expect(weeks).toHaveLength(6)
    weeks.forEach((week) => expect(week).toHaveLength(7))
  })
})
