import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | flash-notification', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.notifications = this.owner.lookup('service:notifications');
    this.notification = this.notifications.success('Test message');

    await render(hbs`
      <div class="flash-list">
        <FlashNotification @notification={{this.notification}}>
          <div class={{this.notification.type}}>{{this.notification.message}}</div>
        </FlashNotification>
      </div>
    `);

    await waitFor('.success');
    assert.dom('.success').exists();
    this.notifications.destroy();
  });
});
