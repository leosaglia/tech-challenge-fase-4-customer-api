import { describe, it, expect } from 'vitest'
import { Document } from './document'
import { InvalidDocumentError } from '@core/enterprise/custom-exceptions/invalid-document'

describe('Document', () => {
  it('deve criar um Document válido com CPF correto', () => {
    const doc = new Document('529.982.247-25')
    expect(doc.getValue()).toBe('52998224725')
  })

  it('deve lançar erro para CPF inválido', () => {
    expect(() => new Document('123.456.789-00')).toThrow(InvalidDocumentError)
  })

  it('deve lançar erro para CPF com todos dígitos iguais', () => {
    expect(() => new Document('111.111.111-11')).toThrow(InvalidDocumentError)
  })

  it('deve lançar erro para CPF com menos de 11 dígitos', () => {
    expect(() => new Document('123.456.789-0')).toThrow(InvalidDocumentError)
  })

  it('deve aceitar CPF válido mesmo com caracteres não numéricos', () => {
    const doc = new Document('529-982-247.25')
    expect(doc.getValue()).toBe('52998224725')
  })
})
