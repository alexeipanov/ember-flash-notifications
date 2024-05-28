import { action } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service notifications;

  @action
  addNotification() {
    this.notifications.error('Something is going wrong!');
  }
}
