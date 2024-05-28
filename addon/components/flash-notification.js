import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

const listenerOptions = {
  passive: false,
  once: true,
};

const closedState = 'closed';

export default class FlashNotification extends Component {
  @service notifications;

  willDestroy() {
    this.onClose(this.args.notification);
    super.willDestroy(...arguments);
  }

  get onClose() {
    return this.args.onClose || ((notification) => notification);
  }

  get duration() {
    return this.args.notification.options.duration;
  }

  onBeforeToggle = (event) => {
    let top = 0;
    let list = event.target.closest('.flash-list');
    let popovers = list?.querySelectorAll('[popover]:popover-open');

    for (let popover of popovers) {
      if (popover !== event.target) {
        top += popover.offsetHeight;
      }

      if (event.newState === closedState) {
        popover.style.top = top - popover.offsetHeight + 'px';
      } else {
        event.target.style.top = top + 'px';
      }
    }
  };

  onToggle = (event) => {
    if (event.newState === closedState) {
      event.target.addEventListener('transitionend', this.removeNotification, listenerOptions);
    } else {
      let closeButton = event.target.querySelector('[name="close"]');
      closeButton?.addEventListener('click', () => event.target.hidePopover(), listenerOptions);
    }
  };

  removeNotification = () => {
    this.notifications.remove(this.args.notification);
  };
}
