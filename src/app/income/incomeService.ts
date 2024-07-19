import { Meta } from "../../utils/Meta";
import { incomeMapper } from "./incomeMapper";
import { getAllIncome, getIncomeCounts } from "./incomeRepo";
import { IFilterIncome, IncomeModelTypes } from "./incomeTypes";

export const getIncomeService = async ({ from, to, page = 1, perPage = 10 }: IFilterIncome) => {
    const fromDate = new Date(from as Date)
    const toDate = new Date(to as Date)



    // Menyesuaikan tanggal awal dan akhir pada hari yang sama
    const startDate = new Date(fromDate?.getFullYear(), fromDate?.getMonth(), fromDate?.getDate(), 0, 0, 0)
    const endDate = new Date(toDate?.getFullYear(), toDate?.getMonth(), toDate?.getDate(), 23, 59, 59)

    const getIncomes = await getAllIncome({ from: from ? startDate : undefined, to: to ? endDate : undefined, page, perPage }) as IncomeModelTypes[]
    const [incomes, totalData] = await Promise.all([
        incomeMapper(getIncomes),
        getIncomeCounts({ from: from ? startDate : undefined, to: to ? endDate : undefined })
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