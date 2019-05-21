import {DayPilot} from 'daypilot-pro-vue'

export const events = [
  // { id: 1, start: "2018-10-01T00:00:00", end: "2018-10-05T00:00:00", text: "Event 1", resource: "R1" },
  { 
    id: 1, 
    start: DayPilot.Date.today().addDays(2), 
    end: DayPilot.Date.today().addDays(5), 
    text: "Иванов И.И.", 
    resource: "R11", 
    status: 'Отменен',
    complete: 0 
  },
  { 
    id: 2, 
    start: DayPilot.Date.today().addDays(-7), 
    end: DayPilot.Date.today().addDays(7), 
    text: "Петров П.П.", 
    resource: "R11", 
    complete: 50, 
    status: 'Бронь'
  },
  { id: 3, start: DayPilot.Date.today().addDays(-10), end: DayPilot.Date.today().addDays(5), text: "Сидоров С.С.", resource: "R12", complete: 30},
  { id: 4, start: DayPilot.Date.today().addDays(-2), end: DayPilot.Date.today().addDays(5), text: "Примеров П.П.", resource: "R13", complete: 100}
];
