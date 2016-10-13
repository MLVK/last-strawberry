import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import page from "last-strawberry/tests/pages/users";

import {
  buildList,
  makeList,
  mockQuery,
  mockDelete
} from "ember-data-factory-guy";

moduleForAcceptance("Acceptance | users", {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test("displays users when present", async function(assert) {
  const users = buildList("user", 3);
  mockQuery("user").returns({json:users});

  await page.visit();

  assert.equal(page.users().count, 3);
});

test("displays user information when present", async function(assert) {
  const users = makeList("user", 2);
  mockQuery("user").returns({models:users});

  await page.visit();

  const firstDisplayUser = page.users(0);
  const firstUser = users.get(0);

  assert.equal(firstDisplayUser.firstName, firstUser.get("firstName"));
  assert.equal(firstDisplayUser.lastName, firstUser.get("lastName"));
  assert.equal(firstDisplayUser.email, firstUser.get("email"));
  assert.equal(firstDisplayUser.role, firstUser.get("role").capitalize());
  assert.equal(firstDisplayUser.password, firstUser.get("password"));
  assert.equal(firstDisplayUser.phone, firstUser.get("phone"));
});

test("filters users", async function(assert) {
  const aUsers = buildList("user", 2, { firstName: "AAA" });
  const users = buildList("user", 2, { firsName: "BBB" });
  users.data = _.union(users.data, aUsers.data);

  mockQuery("user").returns({ json: users });

  await page
    .visit()
    .fillFilterInput("aa");

  assert.equal(page.users().count, 2);
});

test("deletes users", async function(assert) {
  const users = makeList("user", 2);
  mockQuery("user").returns({ models: users });

  mockDelete("user");

  await page.visit();

  await page
    .users(0)
    .delete();

  assert.equal(page.users().count, users.length - 1);
});
