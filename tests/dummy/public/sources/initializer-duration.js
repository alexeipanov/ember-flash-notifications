export function initialize(owner) {
  let notifications = owner.lookup('service:notifications');
  notifications.setOptions({
    duration: 3_000,
  });
}

export default {
  initialize,
};
