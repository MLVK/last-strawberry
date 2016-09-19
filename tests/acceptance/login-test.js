import Ember from "ember";
import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import loginPage from "last-strawberry/tests/pages/login";
import { page as salesOrderPage } from "last-strawberry/tests/pages/sales-orders";

import {
  mockFindAll
} from "ember-data-factory-guy";

const successfulResponse = {"id":1,"token":"admin_token","first_name":"Tony","last_name":"Starks","email":"admin@wutang.com","role":"driver"};
const unauthorizedResponse = {"error":"Invalid email or password."};
const failedResponse = {"error":"Could not connect to the server."};

moduleForAcceptance("Acceptance | login", {
  beforeEach() {
    mockFindAll("order");
    mockFindAll("item");
    mockFindAll("company");
  }
});

test("redirects to landing when already logged in", async function(assert) {
  authenticateSession(this.application);

  await loginPage.visit();

  assert.equal(currentURL(), "/sales-orders");
});

test("redirects to login when not authenticated", async function(assert) {
  await salesOrderPage.visit();

  assert.equal(currentURL(), "/login");
});

test("successful login redirects to to default landing area", async function(assert) {
  Ember.$.mockjax({ url: `/users/sign_in`, responseText:successfulResponse , type: "POST" });

  mockFindAll("order");

  await loginPage.visit();
  await loginPage.clickSubmit();

  assert.equal(currentURL(), "/sales-orders");
});

test("displays errors when unauthorized", async function(assert) {
  Ember.$.mockjax({ url: `/users/sign_in`, responseText:unauthorizedResponse, status:401, type: "POST"});

  mockFindAll("route-plan");

  await loginPage.visit();
  await loginPage.clickSubmit();

  assert.equal(currentURL(), "/login");
  assert.equal(loginPage.errorMessage, unauthorizedResponse.error);
});

test("displays errors when failed with 500", async function(assert) {
  Ember.$.mockjax({ url: `/users/sign_in`, responseText:failedResponse, status:500, type: "POST"});

  mockFindAll("route-plan");

  await loginPage.visit();
  await loginPage.clickSubmit();

  assert.equal(currentURL(), "/login");
  assert.equal(loginPage.errorMessage, failedResponse.error);
});
