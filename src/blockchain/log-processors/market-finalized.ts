import Augur from "augur.js";
import * as Knex from "knex";
import { FormattedEventLog, ErrorCallback } from "../../types";
import { augurEmitter } from "../../events";

export function processMarketFinalizedLog(db: Knex, augur: Augur, trx: Knex.Transaction, log: FormattedEventLog, callback: ErrorCallback): void {
  console.log("TODO: MarketFinalized");
  console.log(log);
  callback(null);
}

export function processMarketFinalizedLogRemoval(db: Knex, augur: Augur, trx: Knex.Transaction, log: FormattedEventLog, callback: ErrorCallback): void {
  console.log("TODO: MarketFinalized removal");
  console.log(log);
  augurEmitter.emit("MarketFinalized", log);
  callback(null);
}
