import Modifier from 'ember-modifier';
import { cancel, later } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default class ShowPopover extends Modifier {
  @service notifications;

  constructor() {
    super(...arguments);
    // this.closeTask = this.autoClose();
  }

  modify(element) {
    // this.element = element;
    element.showPopover();
    later(
      this,
      function () {
        element.hidePopover();
      },
      this.notifications.duration,
    );
  }

  // autoClose() {
  //   return later(
  //     this,
  //     function () {
  //       this.element.hidePopover();
  //     },
  //     this.notifications.duration,
  //   );
  // }
}
