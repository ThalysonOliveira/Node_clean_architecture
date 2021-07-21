import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  encrypterStub: Encrypter
  sut: DbAddAccount
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()

  const sut = new DbAddAccount(encrypterStub)

  return {
    encrypterStub, sut
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenLastCalledWith('valid_password')
  })
})
