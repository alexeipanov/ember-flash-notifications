import Modifier from 'ember-modifier';
import { cancel, later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { registerDestructor } from '@ember/destroyable';

const cleanup = function (instance) {
  cancel(instance.closeTask);
};

export default class ShowPopover extends Modifier {
  @service notifications;

  constructor() {
    super(...arguments);
    registerDestructor(this, cleanup);
  }

  modify(element) {
    element.showPopover();
    this.closeTask = this.autoClose(element);
  }

  autoClose(element) {
    return later(
      this,
      function () {
        element.hidePopover();
      },
      this.notifications.duration,
    );
  }
}
