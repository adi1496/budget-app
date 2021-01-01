class State {
    constructor() {
        this.balance = 0;
        this.monthIncomesValue = 0;
        this.monthExpensesValue = 0;
        this.monthExpensesPercentage = 0;
        this.incomes = [];
        this.expenses = [];
        this.curency = '€';
    }

    updateIncomes(newIncome) {
        this.monthIncomesValue += newIncome.value;
        this.incomes.push(newIncome);
        this.updateBalance();
    }

    updateExpeses(newExpense) {
        this.monthExpensesValue += newExpense.value;
        this.monthExpensesPercentage = (this.monthExpensesValue * 100) / this.monthIncomesValue;
        this.expenses.push(newExpense);
        this.updateBalance();
    }

    updateBalance() {
        this.balance = this.monthIncomesValue - this.monthExpensesValue;
    }
}

export default State;