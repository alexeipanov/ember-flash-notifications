import { A } from '@ember/array';
import Service from '@ember/service';

class Notification {
  title = '';

  message = '';

  type = 'success';

  constructor(type, title, message) {
    this.type = type;
    this.title = title;
    this.message = message;
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
}

export default class NotificationsService extends Service {
  queue = A([]);

  setup(options) {
    this.duration = options.duration;
  }

  add(notification) {
    this.queue.pushObject(notification);
  }

  remove(notification) {
    this.queue.removeObject(notification);
  }

  success(title, message) {
    let notification = new Notification('success', title, message);
    this.add(notification);
  }

  error(title, message) {
    let notification = new Notification('error', title, message);
    this.add(notification);
  }

  warning(title, message) {
    let notification = new Notification('warning', title, message);
    this.add(notification);
  }

  info(title, message) {
    let notification = new Notification('info', title, message);
    this.add(notification);
  }
}
