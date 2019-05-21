import { DayPilot } from 'daypilot-pro-vue'

export default class EventService {
  constructor(scheduler){
    this.scheduler = scheduler;
  }

  templateEvent = ({
        id, 
        start, 
        end, 
        text, 
        resource, 
        barColor,
        status = 'Бронь',
        complete = 0 
      }) => ({
        id, 
        start, 
        end, 
        text, 
        resource, 
        barColor,
        status,
        complete
      })

  updateEvent(data) {
    const { id } = data; 
    const event = this.scheduler.events.find(typeof id === 'function' ? id() : id )
    if (!event) return;
    Object.keys(this.templateEvent(data)).forEach(key => {
      let value = typeof data[key] === 'function' ? data[key]() : data[key]
      if (typeof value === 'object'){
        value = DayPilot.Date(value.format('YYYY-MM-DD'));
      } 
      event.data[key] = value;
    })
    this.scheduler.events.update(event);
  }

  createEvent(data) {
    const eventData = this.templateEvent({
      ...data,
      start: DayPilot.Date(data.start.format('YYYY-MM-DD')),
      end: DayPilot.Date(data.end.format('YYYY-MM-DD')),
      id: DayPilot.guid()
    });
    this.scheduler.events.add(new DayPilot.Event(eventData));
  }

  
}
