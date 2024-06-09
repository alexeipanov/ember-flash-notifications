import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | flash-notifications', function (hooks) {
  setupRenderingTest(hooks);

  test('render notifications list', async function (assert) {
    this.notifications = this.owner.lookup('service:notifications');

    await render(hbs`
      <FlashNotifications as |notification|>
        <FlashNotification @notification={{notification}}>
          <div class={{notification.type}}>{{notification.message}}</div>
        </FlashNotification>
      </FlashNotifications>
    `);

    assert.dom('.flash-list').exists();
    assert.dom('.success').doesNotExist();
    assert.dom('.warning').doesNotExist();
    this.notifications.success('Test message');
    await waitFor('.flash-list .success');
    assert.dom('.success').exists();
    assert.dom('.warning').doesNotExist();
    assert.strictEqual(this.notifications.queue.length, 1);
    this.notifications.warning('Test message');
    await waitFor('.flash-list .warning');
    assert.dom('.warning').exists();
    assert.strictEqual(this.notifications.queue.length, 2);
    this.notifications.clear();
    assert.strictEqual(this.notifications.queue.length, 0);
    this.notifications.destroy();
  });
});
