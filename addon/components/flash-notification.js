import Component from '@glimmer/component';

export default class FlashNotificationComponent extends Component {
  onToggle = (event) => {
    let closeButton = event.target.querySelector('.flash-close');
    if (event.newState === 'close') {
      console.log(event.target.onclick);
      event.target.addEventListener('transitionend', this.removeNotification);
      closeButton?.removeEventListener('click', this.close);
    } else {
      closeButton?.addEventListener('click', this.close);
    }
  };

  removeNotification = (event) => {
    if (event.newState === 'close') {
      this.args.onClose(this.args.notification);
    }
  };

  close = (event) => {
    let popover = event.target.closest('.flash[popover]');
    console.log(popover.ontransitionend);
    popover?.hidePopover();
    popover?.removeEventListener('transitionend', this.removeNotification);
  };
}
