import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | model/store-communicator', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:model/store-communicator');
    assert.ok(service);
  });
});
