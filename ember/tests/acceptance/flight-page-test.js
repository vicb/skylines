import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { setupMirage } from 'ember-cli-mirage/test-support';
import { percySnapshot } from 'ember-percy';

import * as MockFlight from 'skylines/mirage/vcr/flights/87296';

module('Acceptance | Flight Page', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('it works', async function (assert) {
    this.server.get('/api/flights/87296/json', MockFlight.JSON);
    this.server.get('/api/flights/87296', MockFlight.EXTENDED);

    await visit('/flights/87296');
    await percySnapshot('Flight Page');
    assert.dom('[data-test-pilot-names]').hasText('Tobias Bieniek');
  });
});
