import { SumReward } from '../generated/schema'
import { NoBondRecordAccount } from '../generated/schema'
import { substrate } from '@graphprotocol/graph-ts'

//TODO import Balance
// import {Balance} from '@polkadot/types/interfaces';
// import {NoBondRecordAccount} from "../types/models/NoBondRecordAccount";

function createSumReward(accountId: string): SumReward {
  let entity = new SumReward(accountId);
    // entity.accountReward = BigInt(0);
    // entity.accountSlash = BigInt(0);
    // entity.accountTotal = BigInt(0);
    entity.accountReward = 0;
    entity.accountSlash = 0;
    entity.accountTotal = 0;
    return entity;
}

export function handleBond(substrateEvent: substrate.SubstrateEvent): void {
    // const {event: {data: [account, balance]}} = event;
    let account = substrateEvent.event.account;
    // const entity =  SumReward.get(account.toString());
    let entity =  SumReward.load(account);
    if (!entity){
         createSumReward(account).save();
    }
}


export function handleReward(substrateEvent: substrate.SubstrateEvent): void {
    // const {event: {data: [account, newReward]}} = event;

    let account = substrateEvent.event.account;
    // let entity =  SumReward.get(account.toString());
    let entity =  SumReward.load(account);
    if (!entity){
        // in early stage of kusama, some validators didn't need to bond to start staking
        // to not break our code, we will create a SumReward record for them and log them in NoBondRecordAccount
        entity = createSumReward(account);
        const errorRecord = new NoBondRecordAccount(account);
        // errorRecord.firstRewardAt = substrateEvent.block.block.header.number.toNumber();
        errorRecord.firstRewardAt = substrateEvent.block.block.header.number.toI32();
        errorRecord.save();
    }

    // entity.accountReward = entity.accountReward + (newReward as Balance).toBigInt();
    entity.accountTotal = entity.accountReward - entity.accountSlash;
    entity.save();
}

export function handleSlash(substrateEvent: substrate.SubstrateEvent): void {
    // const {event: {data: [account, newSlash]}} = event;

    let account = substrateEvent.event.account;
    // const entity =  SumReward.get(account.toString());
    let entity =  SumReward.load(account);

    // entity.accountSlash = entity.accountSlash + (newSlash as Balance).toBigInt();
    entity.accountTotal = entity.accountReward - entity.accountSlash;
    entity.save();
}
