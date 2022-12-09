export const consultBalance = (balance: number): number => {
  return balance;
}

export const addMoney = (balance: number, money: number): number => {
  balance += money;

  return balance;
}

export const removeMoney = (balance: number, money: number): number => {

  if (balance >= money) {
    balance -= money;
  } else {
    throw new Error("Only " + balance + "€ on your balance");
  }

  return balance;
}

export const transferMoney = (balance1: number, balance2: number, money: number): Array < number > => {

  if (balance1 >= money) {
    balance1 -= money;
    balance2 += money;
  } else {
    throw new Error("Only " + balance1 + "€ on your balance");
  }

  return [balance1, balance2];
}

export const loanMoney = (balance: number, bank: number, money: number): Array < number > => {

  if (bank >= money) {
    balance += money;
    bank -= money;
  } else {
    throw new Error("Only " + bank + "€ on the bank");
  }

  return [balance, bank];
}

export const changeCurrency = (newCurrency: string): string => {
  return newCurrency;
}

export const createAccount = (allAccounts: object, newAccount: string): string | object => {
  let res: string | object;

  let isValid = [];
  for (const account in allAccounts) {
    if (newAccount == account) {
      isValid.push(false);
    } else {
      isValid.push(true);
    }
  }

  if (isValid.includes(false)) {
    res = 'This account already exists';
  } else {
    allAccounts[`${newAccount}`] = 0
    res = allAccounts;
  }

  return res;
}

export const deleteAccount = (allAccounts: object, deleteAccount: string): string | object => {
  let res: string | object;

  let isValid = [];
  for (const account in allAccounts) {
    if (deleteAccount == account) {
      isValid.push(true);
    } else {
      isValid.push(false);
    }
  }

  if (isValid.includes(true)) {
    Reflect.deleteProperty(allAccounts, deleteAccount)
    res = allAccounts;
  } else {
    res = "This account doesn't exist";
  }

  return res;
}