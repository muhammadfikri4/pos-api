import { Meta } from "../../utils/Meta";
import { incomeMapper } from "./incomeMapper";
import { getAllIncome, getIncomeCounts } from "./incomeRepo";
import { IFilterIncome, IncomeModelTypes } from "./incomeTypes";

export const getIncomeService = async ({ date, page = 1, perPage = 10 }: IFilterIncome) => {
    const today = new Date(date as Date)

    // Menyesuaikan tanggal awal dan akhir pada hari yang sama
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)

    console.log({ date, endDate, startDate })

    const getIncomes = await getAllIncome({ startDate: date ? startDate : undefined, endDate: date ? endDate : undefined, page, perPage }) as IncomeModelTypes[]
    const [incomes, totalData] = await Promise.all([
        incomeMapper(getIncomes),
        getIncomeCounts({ startDate: date ? startDate : undefined, endDate: date ? endDate : undefined })
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