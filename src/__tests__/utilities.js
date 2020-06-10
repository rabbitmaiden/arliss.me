import { hashStr, addMoreArliss, arlissify } from '../utilities'
import { ExpansionPanelActions } from '@material-ui/core'

describe('utilities', () => {
  describe('hashStr', () => {
    it('should return 0 for an empty string', () => {
      const result = hashStr('')
      expect(result).toEqual(0)
    })

    it('should return a deterministic number', () => {
      const testStr = 'a test string'
      const result = hashStr(testStr)
      expect(result).toEqual(expect.any(Number))
      expect(result).toEqual(hashStr(testStr))
    })
  })

  describe('addMoreArliss', () => {
    describe('for an empty word', () => {
      it('should do nothing', () => {
        const result = addMoreArliss('')
        expect(result).toEqual('')
      })
    })

    describe("for 'a", () => {
      it("should return 'arliss", () => {
        const result = addMoreArliss('a')
        expect(result).toEqual('arliss')
      })
    })

    describe("for 'bab", () => {
      it("should return 'barlissb", () => {
        const result = addMoreArliss('bab')
        expect(result).toEqual('barlissb')
      })
    })

    describe("for 'Erin", () => {
      it("should return 'Erlissn", () => {
        const result = addMoreArliss('Erin')
        expect(result).toEqual('Erlissn')
      })
    })

    describe("for 'Darke", () => {
      it("should return 'Darlisske", () => {
        const result = addMoreArliss('Darke')
        expect(result).toEqual('Darlisske')
      })
    })

    describe("for 'general'", () => {
      it("should return 'genarliss'", () => {
        const result = addMoreArliss('general')
        expect(result).toEqual('generliss')
      })
    })

    describe("for 'Robert'", () => {
      it("should return 'Roberlisst'", () => {
        const result = addMoreArliss('Robert')
        expect(result).toEqual('Roberlisst')
      })
    })

    describe("for 'Wuhl'", () => {
      it("should return 'Wuhliss'", () => {
        const result = addMoreArliss('Wuhl')
        expect(result).toEqual('Wuhliss')
      })
    })

    describe("for 'Mattis'", () => {
      it("should return 'Marlissttis'", () => {
        const result = addMoreArliss('Mattis')
        expect(result).toEqual('Marlissttis')
      })
    })

    describe("for a string that doesn't match arliss at all", () => {
      it("should append 'liss' on the end of the word", () => {
        const result = addMoreArliss('fff')
        expect(result).toEqual('fffliss')
      })
    })
  })

  describe('arlissify', () => {
    describe('for zero thresholds', () => {
      describe('with moreArliss = false', () => {
        it('should return the name unchanged', () => {
          const result = arlissify('Test Name', 0, 0, false)
          expect(result).toEqual('Test Name')
        })
      })

      describe('with moreArliss = true', () => {
        it("should replace all s's with $", () => {
          const result = arlissify('Test Name', 0, 0, true)
          expect(result).not.toMatch(/s/)
        })
      })
    })

    describe('for maximum thresholds', () => {
      it('should replace every possible character', () => {
        const result = arlissify('Test Name z', 4, 4, false)
        expect(result).not.toMatch(/t|e|s|n|a|m|e/)
        expect(result).toMatch(/z/)
      })
    })
  })
})
