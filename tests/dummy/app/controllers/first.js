import { action } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service notifications;

  constructor() {
    super(...arguments);
    this.notifications.success('Test Title', 'Test message');
  }

  @action
  addNotification(type) {
    if (type === 'error') {
      this.notifications.error('Error', 'Something is going wrong!');
    }
  }
}
