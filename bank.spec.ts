import {
  addMoney,
  consultBalance,
  removeMoney,
  transferMoney,
  loanMoney,
  changeCurrency,
  createAccount,
  deleteAccount,
} from './bank'

describe('bank', () => {
  let bank = 100000000;
  let currency = "€";

  let allAccounts = {
    balance: 50,
    balance2: 100,
    edson: 2
  }

  it.each([
    [allAccounts.balance, 50],
    [allAccounts.balance2, 100],
  ])('balance = %i€', (n, expected) => {
    expect(consultBalance(n)).toBe(expected);
  })

  it.each([
    [34, allAccounts.balance + 34],
    [40, allAccounts.balance + 40],
  ])('add %i€ => balance = %i€', (n, expected) => {
    expect(addMoney(allAccounts.balance, n)).toBe(expected);
  })

  it.each([
    [34, allAccounts.balance - 34],
    [50, allAccounts.balance - 50],
  ])('remove %i€ => balance = %i€', (n, expected) => {
    expect(removeMoney(allAccounts.balance, n)).toBe(expected);
  })

  it.each([
    [51, "Only " + allAccounts.balance + "€ on your balance"],
    [400, "Only " + allAccounts.balance + "€ on your balance"],
  ])("can't remove %i€ => only " + allAccounts.balance + "€ on your balance", (n, expected) => {
    expect(() => removeMoney(allAccounts.balance, n)).toThrow(expected);
  })

  it.each([
    [34, allAccounts.balance - 34, allAccounts.balance2 + 34],
    [40, allAccounts.balance - 40, allAccounts.balance2 + 40],
    [50, allAccounts.balance - 50, allAccounts.balance2 + 50],
  ])('transfer %i€ => balance1 = %i€ & balance2 = %i€', (n, expected, expected2) => {
    expect(transferMoney(allAccounts.balance, allAccounts.balance2, n)).toStrictEqual([expected, expected2]);
  })

  it.each([
    [51, "Only " + allAccounts.balance + "€ on your balance"],
    [400, "Only " + allAccounts.balance + "€ on your balance"],
  ])("can't transfer %i€ => only " + allAccounts.balance + "€ on your balance", (n, expected) => {
    expect(() => transferMoney(allAccounts.balance, allAccounts.balance2, n)).toThrow(expected);
  })

  it.each([
    [34, allAccounts.balance + 34, bank - 34],
    [40, allAccounts.balance + 40, bank - 40],
    [100000000, allAccounts.balance + 100000000, bank - 100000000],
  ])('loan of %i€ => balance1 = %i€ & bank = %i€', (n, expected, expected2) => {
    expect(loanMoney(allAccounts.balance, bank, n)).toStrictEqual([expected, expected2]);
  })

  it.each([
    [100000001, "Only " + bank + "€ on the bank"],
  ])("can't loan %i€ => only " + bank + "€ on the bank", (n, expected) => {
    expect(() => loanMoney(allAccounts.balance, bank, n)).toThrow(expected);
  })

  it.each([
    ['$', '$'],
    ['€', '€'],
    ['¥', '¥'],
  ])('previous currency = ' + currency + ' & current currency = %s', (n, expected) => {
    expect(changeCurrency(n)).toBe(expected);
  })

  it.each([
    ['julie', {
      balance: 50,
      balance2: 100,
      edson: 2,
      julie: 0
    }],
    ['alexis', {
      balance: 50,
      balance2: 100,
      edson: 2,
      julie: 0,
      alexis: 0,
    }],
    ['edson', 'This account already exists'],
  ])('add account %s => %s', (n, expected) => {
    expect(createAccount(allAccounts, n)).toStrictEqual(expected);
  })

  it.each([
    ['julie', {
      balance: 50,
      balance2: 100,
      edson: 2,
      alexis: 0
    }],
    ['alexis', {
      balance: 50,
      balance2: 100,
      edson: 2,
    }],
    ['eded', "This account doesn't exist"],
  ])('remove account %s => %s', (n, expected) => {
    expect(deleteAccount(allAccounts, n)).toStrictEqual(expected);
  })
})