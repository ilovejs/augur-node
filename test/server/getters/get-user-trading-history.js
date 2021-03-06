"use strict";

const assert = require("chai").assert;
const setupTestDb = require("../../test.database");
const { getUserTradingHistory } = require("../../../build/server/getters/get-user-trading-history");

describe("server/getters/get-user-trading-history", () => {
  const test = (t) => {
    it(t.description, (done) => {
      setupTestDb((err, db) => {
        assert.isNull(err);
        getUserTradingHistory(db, t.params.universe, t.params.account, t.params.marketID, t.params.outcome, t.params.orderType, t.params.earliestCreationTime, t.params.latestCreationTime, t.params.sortBy, t.params.isSortDescending, t.params.limit, t.params.offset, (err, userTradingHistory) => {
          t.assertions(err, userTradingHistory);
          done();
        });
      });
    });
  };
  test({
    description: "user was filler in 1 trade in market and outcome",
    params: {
      universe: null,
      account: "0x000000000000000000000000000000000000d00d",
      marketID: "0x0000000000000000000000000000000000000001",
      outcome: 0,
      orderType: null,
      sortBy: null,
      isSortDescending: null,
      limit: null,
      offset: null,
    },
    assertions: (err, userTradingHistory) => {
      assert.isNull(err);
      assert.deepEqual(userTradingHistory, [{
        transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000C00",
        logIndex: 0,
        type: "sell",
        price: 5.5,
        amount: 0.2,
        maker: false,
        marketCreatorFees: 0,
        reporterFees: 0,
        settlementFees: "0",
        marketID: "0x0000000000000000000000000000000000000001",
        outcome: 0,
        shareToken: "0x1000000000000000000000000000000000000000",
        timestamp: 1506474500,
        tradeGroupID: null,
      }]);
    },
  });
  test({
    description: "user was creator in many markets and outcomes",
    params: {
      universe: "0x000000000000000000000000000000000000000b",
      account: "0x0000000000000000000000000000000000000b0b",
      marketID: null,
      outcome: 0,
      orderType: null,
      sortBy: "timestamp",
      isSortDescending: true,
      limit: null,
      offset: null,
    },
    assertions: (err, userTradingHistory) => {
      assert.isNull(err);
      assert.deepEqual(userTradingHistory, [
        {
          transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000C04",
          logIndex: 0,
          amount: 0.2,
          maker: true,
          marketID: "0x0000000000000000000000000000000000000012",
          outcome: 0,
          price: 5.5,
          marketCreatorFees: 0,
          reporterFees: 0,
          settlementFees: "0",
          shareToken: "0x1000000000000000000000000000000000000000",
          timestamp: 1506474515,
          tradeGroupID: null,
          type: "sell",
        },
        {
          transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000C00",
          logIndex: 0,
          amount: 0.2,
          maker: true,
          marketID: "0x0000000000000000000000000000000000000001",
          outcome: 0,
          price: 5.5,
          marketCreatorFees: 0,
          reporterFees: 0,
          settlementFees: "0",
          shareToken: "0x1000000000000000000000000000000000000000",
          timestamp: 1506474500,
          tradeGroupID: null,
          type: "sell",
        },
        {
          transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000C01",
          logIndex: 0,
          amount: 0.2,
          maker: true,
          marketID: "0x0000000000000000000000000000000000000002",
          outcome: 0,
          price: 5.5,
          marketCreatorFees: 0,
          reporterFees: 0,
          settlementFees: "0",
          shareToken: "0x1000000000000000000000000000000000000000",
          timestamp: 1506474500,
          tradeGroupID: null,
          type: "sell",
        },
        {
          transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000C02",
          logIndex: 0,
          amount: 0.2,
          maker: true,
          marketID: "0x0000000000000000000000000000000000000003",
          outcome: 0,
          price: 5.5,
          marketCreatorFees: 0,
          reporterFees: 0,
          settlementFees: "0",
          shareToken: "0x1000000000000000000000000000000000000000",
          timestamp: 1506474500,
          tradeGroupID: null,
          type: "sell",
        },
        {
          transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000C03",
          logIndex: 0,
          amount: 0.2,
          maker: true,
          marketID: "0x0000000000000000000000000000000000000011",
          outcome: 0,
          price: 5.5,
          marketCreatorFees: 0,
          reporterFees: 0,
          settlementFees: "0",
          shareToken: "0x1000000000000000000000000000000000000000",
          timestamp: 1506474500,
          tradeGroupID: null,
          type: "sell",
        },
        {
          transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000C05",
          logIndex: 0,
          amount: 0.2,
          maker: true,
          marketID: "0x0000000000000000000000000000000000000013",
          outcome: 0,
          price: 5.5,
          marketCreatorFees: 0,
          reporterFees: 0,
          settlementFees: "0",
          shareToken: "0x1000000000000000000000000000000000000000",
          timestamp: 1506474500,
          tradeGroupID: null,
          type: "sell",
        },
        {
          transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000C06",
          logIndex: 0,
          amount: 0.2,
          maker: true,
          marketID: "0x0000000000000000000000000000000000000014",
          outcome: 0,
          price: 5.5,
          marketCreatorFees: 0,
          reporterFees: 0,
          settlementFees: "0",
          shareToken: "0x1000000000000000000000000000000000000000",
          timestamp: 1506474500,
          tradeGroupID: null,
          type: "buy",
        },
        {
          transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000C07",
          logIndex: 0,
          amount : 0.2,
          maker: true,
          marketID: "0x0000000000000000000000000000000000000015",
          outcome: 0,
          price: 5.5,
          marketCreatorFees: 0,
          reporterFees: 0,
          settlementFees: "0",
          shareToken: "0x1000000000000000000000000000000000000000",
          timestamp: 1506474500,
          tradeGroupID: null,
          type: "buy",
        },
      ]);
    },
  });
  test({
    description: "user was creator in many markets and outcomes, filter to one market",
    params: {
      universe: null,
      account: "0x0000000000000000000000000000000000000b0b",
      marketID: "0x0000000000000000000000000000000000000001",
      outcome: 0,
      orderType: null,
      sortBy: null,
      isSortDescending: null,
      limit: null,
      offset: null,
    },
    assertions: (err, userTradingHistory) => {
      assert.isNull(err);
      assert.deepEqual(userTradingHistory, [
        {
          transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000C00",
          logIndex: 0,
          amount: 0.2,
          maker: true,
          marketID: "0x0000000000000000000000000000000000000001",
          outcome: 0,
          price: 5.5,
          marketCreatorFees: 0,
          reporterFees: 0,
          settlementFees: "0",
          shareToken: "0x1000000000000000000000000000000000000000",
          timestamp: 1506474500,
          tradeGroupID: null,
          type: "sell",
        },
      ]);
    },
  });
  test({
    description: "user was creator in many markets and outcomes, filter to one market by timestamp",
    params: {
      universe: "0x000000000000000000000000000000000000000b",
      account: "0x0000000000000000000000000000000000000b0b",
      marketID: null,
      outcome: 0,
      orderType: null,
      sortBy: null,
      isSortDescending: null,
      limit: null,
      offset: null,
      earliestCreationTime: 1506474514,
      latestCreationTime: 1506474516,
    },
    assertions: (err, userTradingHistory) => {
      assert.isNull(err);
      assert.deepEqual(userTradingHistory, [
        {
          transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000C04",
          logIndex: 0,
          amount: 0.2,
          maker: true,
          marketID: "0x0000000000000000000000000000000000000012",
          outcome: 0,
          price: 5.5,
          marketCreatorFees: 0,
          reporterFees: 0,
          settlementFees: "0",
          shareToken: "0x1000000000000000000000000000000000000000",
          timestamp: 1506474515,
          tradeGroupID: null,
          type: "sell",
        },
      ]);
    },
  });
  test({
    description: "user has not performed any trades",
    params: {
      universe: "0x000000000000000000000000000000000000000b",
      account: "0x0000000000000000000000000000000000000bbb",
      marketID: null,
      outcome: null,
      orderType: null,
      sortBy: null,
      isSortDescending: null,
      limit: null,
      offset: null,
    },
    assertions: (err, userTradingHistory) => {
      assert.isNull(err);
      assert.deepEqual(userTradingHistory, []);
    },
  });
});
