import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class FlashComponent extends Component {
  @service notifications;

  @action
  errorNotification() {
    this.notifications.error('This notification will be visible until you close it', { duration: 0 });
  }

  @action
  warningNotification() {
    this.notifications.warning('Disappeared in 10 seconds', { duration: 10_000 });
  }
}
