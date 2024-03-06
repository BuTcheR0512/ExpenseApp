import React from 'react'
import {Progress} from 'antd'

const Analytics = ({allTransaction}) => {

    const categories = [
        'salary',
        'tip',
        'project',
        'food',
        'movie',
        'bill',
        'medical',
        'fee',
        'tax'
    ];

    const totalTransaction = allTransaction.length
    const totalIncomeTransaction = allTransaction.filter(
        transaction => transaction.type === 'income'
    )
    const totalExpenseTransaction = allTransaction.filter(
        transaction => transaction.type === 'expense'
    )
    const totalIncomePrecent = (totalIncomeTransaction.length / totalTransaction) * 100
    const totalExpensePrecent = (totalExpenseTransaction.length / totalTransaction) * 100

    //total turnover
    const totalTurnover = allTransaction.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    )
    const totalIncomeTurnover = allTransaction
        .filter(
            (transaction) => transaction.type === 'income'
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalExpenseTurnover = allTransaction
        .filter(
            (transaction) => transaction.type === 'expense'
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100
    return (
        <> < div className = 'row m -3' > <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total Transaction: {totalTransaction}
                </div>
                <div className='card-body'>
                    <h5 className='text-success'>Income:{totalIncomeTransaction.length}</h5>
                    <h5 className='text-danger'>Expense:{totalExpenseTransaction.length}</h5>
                    <div>
                        <Progress
                            type='circle'
                            strokeColor={'green'}
                            className='max-2'
                            percent={totalIncomePrecent.toFixed(0)}/>
                        <Progress
                            type='circle'
                            strokeColor={'red'}
                            className='max-2'
                            percent={totalExpensePrecent.toFixed(0)}/>

                    </div>
                </div>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total Turnover: {totalTurnover}
                </div>
                <div className='card-body'>
                    <h5 className='text-success'>Income:{totalIncomeTurnover.length}</h5>
                    <h5 className='text-danger'>Expense:{totalExpenseTurnover.length}</h5>
                    <div>
                        <Progress
                            type='circle'
                            strokeColor={'green'}
                            className='max-2'
                            percent={totalIncomeTurnoverPercent.toFixed(0)}/>
                        <Progress
                            type='circle'
                            strokeColor={'red'}
                            className='max-2'
                            percent={totalExpenseTurnoverPercent.toFixed(0)}/>

                    </div>
                </div>
            </div>
        </div>

    </div>
    <div className='row mt-3'>
        <div className='col md-4'>
            <h4>Categorywise Income</h4>
            {
                categories.map(category => {
                    const amount = allTransaction
                        .filter(
                            transaction => transaction.type === 'income' && transaction.category === category
                        )
                        .reduce((acc, transaction) => acc + transaction.amount, 0)
                    return (
                        amount > 0 && <div className='card'>
                            <div className='.card-body'>
                                <h5>{category}</h5>
                                <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}/>

                            </div>
                        </div>

                    )
                })
            }
        </div>
        <div className='col md-4'>
            <h4>Categorywise Expense</h4>
            {
                categories.map(category => {
                    const amount = allTransaction
                        .filter(
                            transaction => transaction.type === 'expense' && transaction.category === category
                        )
                        .reduce((acc, transaction) => acc + transaction.amount, 0)
                    return (
                        amount > 0 && <div className='card'>
                            <div className='.card-body'>
                                <h5>{category}</h5>
                                <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}/>

                            </div>
                        </div>

                    )
                })
            }
        </div>
    </div>

</>
    )
}

export default Analytics