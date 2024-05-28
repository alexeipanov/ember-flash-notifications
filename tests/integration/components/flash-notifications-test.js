import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | flash-notifications', function (hooks) {
  setupRenderingTest(hooks);

  test('render standard notification', async function (assert) {
    this.notifications = this.owner.lookup('service:notifications');
    this.notifications.success('Test Title', 'Test message');
    await render(hbs`<FlashNotifications />`);
    assert.dom('.flash-list').exists();
    assert.dom('.flash-list .flash.success').exists();
  });
});
