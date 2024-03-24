import { module, test } from 'qunit';
import { setupTest } from 'dummy/tests/helpers';

module('Unit | Service | notifications', function (hooks) {
  setupTest(hooks);

  test('base operations on a notifications queue', function (assert) {
    let service = this.owner.lookup('service:notifications');
    assert.ok(service);

    assert.strictEqual(service.queue.length, 0);

    service.success('Test Title', 'Test message');
    assert.strictEqual(service.queue.length, 1);
    assert.strictEqual(service.queue[0].type, 'success');
    assert.strictEqual(service.queue[0].title, 'Test Title');
    assert.strictEqual(service.queue[0].message, 'Test message');

    service.error('Test Title', 'Test message');
    assert.strictEqual(service.queue.length, 2);
    assert.strictEqual(service.queue[1].type, 'error');

    service.warning('Test Title', 'Test message');
    assert.strictEqual(service.queue.length, 3);
    assert.strictEqual(service.queue[2].type, 'warning');

    service.info('Test Title', 'Test message');
    assert.strictEqual(service.queue.length, 4);
    assert.strictEqual(service.queue[3].type, 'info');

    service.remove(service.queue[0]);
    assert.strictEqual(service.queue.length, 3);
    assert.strictEqual(service.queue[0].type, 'error');
  });
});
