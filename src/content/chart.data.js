import { last12months } from '../utils/dateUtils'
export const head  = (table) => ([
    {
      key: "month",
      content: <p style={{textAlign: 'center'}}>{"Month"}</p>,
      width: 100/2,
    },
    {
      key: "number",
      content: <p style={{textAlign: 'center'}}>{table}</p>,
      width: 100/2,
    },
  ])

export const chartTableData = (data) =>
    data && data.map((item, index) => ({
      key: index,
      cells: [
        {
          key: "month",
          content: <p style={{textAlign: 'center'}}>{last12months()[index]}</p>,
        },
        {
          key: "number",
          content: <p style={{textAlign: 'center'}}>{item}</p>,
        }
      ]
    }))