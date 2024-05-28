import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class FlashMinimal extends Component {
  @service notifications;

  onClose() {
    this.args.onClose();
  }

  @action
  addNotification() {
    this.notifications.error('Something is going wrong!');
  }
}
