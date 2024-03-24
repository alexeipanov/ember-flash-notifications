export function initialize(owner) {
  let notifications = owner.lookup('service:notifications');
  notifications.setup({
    duration: 5000,
  });
}

export default {
  initialize,
};
