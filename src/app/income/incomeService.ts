import { Meta } from "utils/Meta";
import { incomeMapper } from "./incomeMapper";
import { getAllIncome, getIncomeCounts } from "./incomeRepo";
import { IFilterIncome, IncomeModelTypes } from "./incomeTypes";

export const getIncomeService = async ({ from, page = 1, perPage = 10, to }: IFilterIncome) => {
    // const today = new Date()

    // const firstDayMonth = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1))
    // const lastDayMonth = new Date(Date.UTC(today.getFullYear(), today.getMonth() + 1, 0))
    const first = new Date(from as Date || new Date()).toISOString()
    const end = new Date(to as Date || new Date()).toISOString()
    // console.log({ firstDayMonth, lastDayMonth })

    const getIncomes = await getAllIncome({ from: from ? first : undefined, page, perPage, to: to ? end : undefined }) as IncomeModelTypes[]
    const [incomes, totalData] = await Promise.all([
        incomeMapper(getIncomes),
        getIncomeCounts({ from: from ? first : undefined, to: to ? end : undefined })
    ])

    const data = {
        incomes,
        totalIncome: incomes.reduce((acc, curr) => acc + curr.nominal, 0)
    }

    return {
        data,
        meta: Meta(page, perPage, totalData)
    }

}