import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class FlashComponent extends Component {
  @service notifications;

  @action
  clearNotifications() {
    this.notifications.clear();
  }
}
