import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const defaults = {
  duration: 5_000,
};

const defaultTypes = ['success', 'error', 'warning', 'info'];

const capitalize = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);

const mergeOptions = (defaults, custom) => ({ ...defaults, ...custom });

class Notification {
  constructor(type, message, options = {}) {
    this.type = type;
    this.message = message;
    this.options = options;
  }

  get duration() {
    return this.options.duration;
  }
}

export default class NotificationsService extends Service {
  @tracked
  queue = A([]);
  types = defaultTypes;

  constructor() {
    super(...arguments);
    this.setOptions();
    this.types.forEach((type) => this.registerShorthand(type));
  }

  setOptions(options = {}) {
    this.options = mergeOptions(defaults, options);
  }

  registerShorthand(type) {
    if (!type) {
      throw new Error('A notification type should be a non-empty string');
    }

    this.types.push(type);

    Object.defineProperty(Notification.prototype, `is${capitalize(type)}`, {
      configurable: true,
      get() {
        return type === this.type;
      },
    });

    Object.defineProperty(this, type, {
      configurable: true,
      value: (message, options) => this.#add(type, message, options),
    });
  }

  #add(type, message, options) {
    let merged = mergeOptions(this.options, options);
    let notification = new Notification(type, message, merged);
    this.queue.pushObject(notification);
    return notification;
  }

  remove(notification) {
    this.queue.removeObject(notification);
  }

  clear() {
    this.queue = A([]);
  }
}
