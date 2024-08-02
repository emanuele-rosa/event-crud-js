let ids = 0;
let events = [];

module.exports = {
  new(name, place, description) {
    let event = {
      id: ++ids,
      name: name,
      place: place,
      description: description,
    };
    events.push(event);
    return event;
  },
  getPositionById(id) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].id == id) {
        return i;
      }
    }
    return -1;
  },
  update(id, name, place, description) {
    let pos = this.getPositionById(id);
    if (pos >= 0) {
      events[pos].name = name;
      events[pos].place = place;
      events[pos].description = description;
    }
    return events[pos];
  },
  list() {
    return events;
  },
  getElementById(id) {
    let pos = this.getPositionById(id);
    if (pos >= 0) {
      return events[pos];
    }
    return null;
  },
  delete(id) {
    let i = this.getPositionById(id);
    if (i >= 0) {
      events.splice(i, 1);
      return true;
    }
    return false;
  },
};
