import Component from '@glimmer/component';

const closedState = 'closed';

const listenerOptions = {
  passive: false,
  once: true,
};

export default class FlashNotificationComponent extends Component {
  onToggle = (event) => {
    if (event.newState === closedState) {
      event.target.addEventListener(
        'transitionend',
        this.removeNotification,
        listenerOptions,
      );
    } else {
      let closeButton = event.target.querySelector('button[name="close"]');
      closeButton?.addEventListener('click', this.close, listenerOptions);
    }
  };

  removeNotification = () => {
    this.args.onClose(this.args.notification);
  };

  close = (event) => {
    let popover = event.target.closest('[popover]');
    popover?.hidePopover();
  };
}
