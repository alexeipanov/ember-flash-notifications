export function initialize(owner) {
  let notifications = owner.lookup('service:notifications');

  notifications.registerShorthand('custom');

  notifications.setOptions({
    duration: 3_000,
  });
}

export default {
  initialize,
};
