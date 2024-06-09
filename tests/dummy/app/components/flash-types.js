import { action } from '@ember/object';
import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';

export default class FlashComponent extends Component {
  @service notifications;

  @action
  errorNotification() {
    this.notifications.error('Something is going wrong!');
  }

  @action
  warningNotification() {
    this.notifications.warning('Doubtful but OK');
  }

  @action
  successNotification() {
    this.notifications.success('Working as expected');
  }

  @action
  infoNotification() {
    this.notifications.info(htmlSafe('Some useful info splitted<br>to multiple lines'));
  }
}
