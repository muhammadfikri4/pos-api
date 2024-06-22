import { Meta } from "utils/Meta";
import { incomeMapper } from "./incomeMapper";
import { getAllIncome, getIncomeCounts } from "./incomeRepo";
import { IFilterIncome, IncomeModelTypes } from "./incomeTypes";

export const getIncomeService = async ({ from, page = 1, perPage = 10, to }: IFilterIncome) => {
    const today = new Date()

    const firstDayMonth = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1))
    const lastDayMonth = new Date(Date.UTC(today.getFullYear(), today.getMonth() + 1, 0))

    const getIncomes = await getAllIncome({ from: from ? new Date(from) : firstDayMonth, page, perPage, to: to ? new Date(to) : lastDayMonth }) as IncomeModelTypes[]
    const [incomes, totalData] = await Promise.all([
        incomeMapper(getIncomes),
        getIncomeCounts({ from: from ? new Date(from) : firstDayMonth, to: to ? new Date(to) : lastDayMonth })
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