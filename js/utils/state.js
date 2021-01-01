class State {
    constructor(data) {
        this.balance = data.balance;
        this.monthIncomesValue = data.monthIncomesValue;
        this.monthExpensesValue = data.monthExpensesValue;
        this.monthExpensesPercentage = data.monthExpensesPercentage;
        this.incomes = data.incomes;
        this.expenses = data.expenses;
        this.curency = data.curency;
    }

    calcPercentage() {
        let result = (this.monthExpensesValue * 100) / this.monthIncomesValue;
        result = result.toFixed(2);
        this.monthExpensesPercentage = parseFloat(result);
    }

    updateIncomes(newIncome) {
        this.incomes.push(newIncome);

        let sum = 0;
        this.incomes.forEach(income => sum += income.value);
        this.monthIncomesValue = sum;
        this.updateBalance();
    }

    updateExpeses(newExpense) {
        this.expenses.push(newExpense);

        let sum = 0;
        this.expenses.forEach(expense => sum += expense.value);
        this.monthExpensesValue = sum;
        this.calcPercentage();
        this.updateBalance();
    }

    updateBalance() {
        this.balance = this.monthIncomesValue - this.monthExpensesValue;
    }

    deleteIncome(dataId) {
        const newIncomes = [];
        this.incomes.forEach(income => {
            if(income.id !== dataId) {
                newIncomes.push(income);
            }else {
                this.monthIncomesValue -= income.value;
            }
        });

        this.incomes = newIncomes;
        this.updateBalance();
    }

    deleteExpense(dataId) {
        const newExpenses = [];
        this.expenses.forEach(expense => {
            if(expense.id !== dataId) {
                newExpenses.push(expense);
            }else {
                this.monthExpensesValue -= expense.value;
            }
        });

        this.expenses = newExpenses;
        this.calcPercentage()
        this.updateBalance();
    }
}

export default State;