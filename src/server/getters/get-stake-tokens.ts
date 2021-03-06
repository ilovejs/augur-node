import * as Knex from "knex";
import * as _ from "lodash";
import { Address, ReportingState, StakeTokensRowWithReportingState, StakeTokenState, UIStakeTokenInfo, UIStakeTokens } from "../../types";
import { getMarketsWithReportingState, reshapeStakeTokensRowToUIStakeTokenInfo } from "./database";

export function getStakeTokens(db: Knex, universe: Address, account: Address, stakeTokenState: StakeTokenState|null, callback: (err: Error|null, result?: any) => void): void {
    if (universe == null || account == null) return callback(new Error("Must provide both universe and account"));
    const query: Knex.QueryBuilder = getMarketsWithReportingState(db, ["stake_tokens.*", "reports.claimed", "reports.winningToken", "market_state.reportingState"]).from("stake_tokens");
    query.sum("reports.amountStaked as amountStaked").groupBy("stake_tokens.stakeToken");
    query.join("markets", "markets.marketID", "stake_tokens.marketID").join("reports", "reports.stakeToken", "stake_tokens.stakeToken");
    query.where("universe", universe).where("reports.reporter", account);
    if ( stakeTokenState == null || stakeTokenState === StakeTokenState.ALL ) {
      // currently, do nothing, leaving this in case we want to flavor how we group or present response
    } else if ( stakeTokenState === StakeTokenState.UNFINALIZED ) {
      query.whereNot("market_state.reportingState", ReportingState.FINALIZED);
    } else if ( stakeTokenState === StakeTokenState.UNCLAIMED ) {
      query.where("reports.winningToken", 1).where("reports.claimed", 0);
    } else {
      return callback(new Error("Invalid stakeTokenState"));
    }
    query.asCallback((err: Error|null, stakeTokens: Array<StakeTokensRowWithReportingState>): void => {
      if (err) return callback(err);
      callback(null, stakeTokens.reduce((acc: UIStakeTokens, cur) => {acc[cur.stakeToken] = reshapeStakeTokensRowToUIStakeTokenInfo(cur); return acc; }, {}));
    });
}
