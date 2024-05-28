import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

class Notification {
  type = 'info';
  message = '';

  constructor(type, message, options = {}) {
    this.type = type;
    this.message = message;
    this.options = options;
  }

  get isSuccess() {
    return this.type === 'success';
  }

  get isError() {
    return this.type === 'error';
  }

  get isWarning() {
    return this.type === 'warning';
  }

  get isInfo() {
    return this.type === 'info';
  }

  get isCustom() {
    return this.type === 'custom';
  }

  get duration() {
    return this.options.duration;
  }
}

const defaults = {
  duration: 5000,
};

const mergeOptions = (defaults, custom) => ({ ...defaults, ...custom });

export default class NotificationsService extends Service {
  @tracked
  queue = A([]);

  setup(options) {
    this.options = mergeOptions(defaults, options);
  }

  add(type, message, options) {
    this.queue.pushObject(new Notification(type, message, mergeOptions(this.options, options)));
  }

  remove(notification) {
    this.queue.removeObject(notification);
  }

  clear() {
    this.queue = A([]);
  }

  success(message, options = {}) {
    this.add('success', message, options);
  }

  error(message, options = {}) {
    this.add('error', message, options);
  }

  warning(message, options = {}) {
    this.add('warning', message, options);
  }

  info(message, options = {}) {
    this.add('info', message, options);
  }

  custom(message, options) {
    this.add('custom', message, options);
  }
}
