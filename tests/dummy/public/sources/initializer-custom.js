export function initialize(owner) {
  let notifications = owner.lookup('service:notifications');

  notifications.registerShorthand('custom');
}

export default {
  initialize,
};
