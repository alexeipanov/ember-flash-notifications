import { module, test } from 'qunit';
import { setupTest } from 'dummy/tests/helpers';

module('Unit | Service | notifications', function (hooks) {
  setupTest(hooks);

  test('base operations on a notifications queue', function (assert) {
    let service = this.owner.lookup('service:notifications');
    assert.ok(service);

    assert.strictEqual(service.queue.length, 0, 'queue is empty');

    service.success('Test message');
    assert.strictEqual(service.queue.length, 1, 'queue length increased');
    assert.true(service.queue[0].isSuccess, 'is success');
    assert.false(service.queue[0].isInfo, 'is info');
    assert.false(service.queue[0].isWarning, 'is warning');
    assert.false(service.queue[0].isError, 'is error');
    assert.strictEqual(service.queue[0].message, 'Test message', 'message text is correct');

    service.error('Test message');
    assert.strictEqual(service.queue.length, 2, 'queue length increased');
    assert.true(service.queue[1].isError, 'is error');

    service.warning('Test message');
    assert.strictEqual(service.queue.length, 3, 'queue length increased');
    assert.true(service.queue[2].isWarning, 'is warning');

    service.info('Test message');
    assert.strictEqual(service.queue.length, 4, 'queue length increased');
    assert.true(service.queue[3].isInfo, 'is info');

    service.remove(service.queue[0]);
    assert.strictEqual(service.queue.length, 3, 'queue length decreased');
    assert.true(
      service.queue[0].isError,
      'first notification in the queue was removed, now the first message is the error message',
    );

    service.setOptions({ duration: 15_000 });
    service.info('Test message');
    assert.strictEqual(service.queue[3].options.duration, 15_000, 'set up new duration');

    service.registerShorthand('danger');
    // eslint-disable-next-line no-prototype-builtins
    assert.true(service.hasOwnProperty('danger'), 'is service.danger method exists');
    service.danger('Another warning message');
    assert.true(service.queue[4].isDanger, 'custom danger message');

    service.clear();
    assert.strictEqual(service.queue.length, 0, 'all notifications are removed');
  });
});
