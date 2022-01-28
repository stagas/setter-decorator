import { settable, setter } from '../src'

describe('settable/setter', () => {
  it('attaches setters to properties in a class decorated as settable', () => {
    @settable
    class Data {
      @setter(value => (value != null ? +value : value))
      foo?: number

      @setter(value => value != null)
      bar!: boolean

      @setter(value => value[0].toUpperCase() + value.slice(1).toLowerCase())
      name = 'john'
    }

    const data = new Data()
    expect(data.foo).toBeUndefined()
    data.foo = '42' as unknown as number
    expect(data.foo).toEqual(42)
    expect(data.bar).toEqual(false)
    data.bar = 'anything' as unknown as boolean
    expect(data.bar).toEqual(true)
    data.bar = null as unknown as boolean
    expect(data.bar).toEqual(false)
    expect(data.name).toEqual('John')
    data.name = 'sofia'
    expect(data.name).toEqual('Sofia')
  })

  it('works with prefactoried decorators', () => {
    const nullableNumber = setter(value => (value != null ? +value : value))
    const boolean = setter(value => value != null)
    const personName = setter(value => value[0].toUpperCase() + value.slice(1).toLowerCase())

    @settable
    class Data {
      @nullableNumber
      foo?: number

      @boolean
      bar!: boolean

      @personName
      name = 'john'
    }

    const data = new Data()
    expect(data.foo).toBeUndefined()
    data.foo = '42' as unknown as number
    expect(data.foo).toEqual(42)
    expect(data.bar).toEqual(false)
    data.bar = 'anything' as unknown as boolean
    expect(data.bar).toEqual(true)
    data.bar = null as unknown as boolean
    expect(data.bar).toEqual(false)
    expect(data.name).toEqual('John')
    data.name = 'sofia'
    expect(data.name).toEqual('Sofia')
  })

  it('passes old value as second parameter', () => {
    @settable
    class Data {
      @setter((value, oldValue = 0) => oldValue + value)
      sum = 0
    }
    const data = new Data()
    data.sum = 10
    expect(data.sum).toEqual(10)
    data.sum = 5
    expect(data.sum).toEqual(15)
    data.sum = 20
    expect(data.sum).toEqual(35)
  })

  it('uses context', () => {
    @settable
    class Data {
      min = 2
      max = 6

      @setter(function (this: Data, value) {
        return Math.max(this.min, Math.min(this.max, value))
      })
      value = 0
    }
    const data = new Data()
    expect(data.value).toEqual(2)
    data.value = 10
    expect(data.value).toEqual(6)
    data.value = -10
    expect(data.value).toEqual(2)
  })
})
