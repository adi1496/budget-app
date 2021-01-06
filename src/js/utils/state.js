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
        this.updateIncExpValue('inc');
        
        this.updateBalance();
    }

    updateExpeses(newExpense) {
        this.expenses.push(newExpense);
        this.updateIncExpValue('exp');

        this.calcPercentage();
        this.updateBalance();
    }

    updateBalance() {
        const val = this.monthIncomesValue - this.monthExpensesValue;
        this.balance = parseFloat(val.toFixed(2));
    }

    updateIncExpValue(type) {
        let sum = 0;
        if(type === 'inc') {
            this.incomes.forEach(income => sum += income.value);
            this.monthIncomesValue = parseFloat(sum.toFixed(2));
        }else if(type === 'exp') {
            this.expenses.forEach(expense => sum += expense.value);
            this.monthExpensesValue = parseFloat(sum.toFixed(2));
        }
    }

    deleteIncome(dataId) {
        const newIncomes = [];
        this.incomes.forEach(income => {
            if(income.id !== dataId) {
                newIncomes.push(income);
            }
        });
        this.incomes = newIncomes;

        this.updateIncExpValue('inc');
        this.updateBalance();
    }

    deleteExpense(dataId) {
        const newExpenses = [];
        this.expenses.forEach(expense => {
            if(expense.id !== dataId) {
                newExpenses.push(expense);
            }
        });

        this.expenses = newExpenses;
        this.updateIncExpValue('exp');
        this.calcPercentage()
        this.updateBalance();
    }
}

export default State;