enum EventType {
  WASTE_BIN_FULL = 'WasteBinFull',
  WASTE_BIN_NOT_INSTALLED = 'WasteBinNotInstalled',
  CAT_LEFTED = 'CatLefted',
}

enum EventLevel {
  INFO = 'Info',
  WARNING = 'Warning',
  ERROR = 'Error',
}

type EventItem = {
  type: EventType;
  level: EventLevel;
  timestamp: number;
}

export class Event {
  push(event: EventItem) {
  }
}