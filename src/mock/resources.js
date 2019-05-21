export const resources = [
  {
    name: "Корпус 1",
    id: "C1",
    expanded: true,
    cellsDisabled: true,
    children: [
      {
        name: "Этаж 1",
        id: "L1",
        expanded: true,
        cellsDisabled: true,
        children: [
          {
            name: "Комната 11",
            id: "R11",
            rowMinHeight: '50px'
          },
          {
            name: "Комната 12",
            id: "R12",
            rowMinHeight: '50px'
          },
          {
            name: "Комната 13",
            id: "R13"
          }
          ],
      },{
        name: "Этаж 2",
        id: "L1",
        expanded: true,
        cellsDisabled: true,
        children: [
          {
            name: "Комната 21",
            id: "R21"
          },
          {
            name: "Комната 22",
            id: "R22"
          },
          {
            name: "Комната 23",
            id: "R23"
          }

        ]
      }
    ]
  },
  {name: "Resource 2", id: "R2"},
  {name: "Resource 3", id: "R3"}
]