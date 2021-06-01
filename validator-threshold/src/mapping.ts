import { ValidatorThreshold } from '../generated/schema'
import { substrate } from '@graphprotocol/graph-ts'
import {ActiveEraInfo, Balance, EraIndex, Exposure } from "@polkadot/types/interfaces";
import {Option} from "@polkadot/types"
import { ApiPromise } from '@polkadot/api';


export async function handleBlock({ block }: substrate.SubstrateEvent): Promise<void> {

  // in the early stage of kusama, staking.activeEra didn't exist
  if (!ApiPromise.query.staking.activeEra) return;
  const [activeEra] = await ApiPromise.queryMulti<[Option<ActiveEraInfo>, Option<EraIndex>]>([
    ApiPromise.query.staking.activeEra,
      // api.query.staking.currentEra
  ]);
  if (activeEra.isEmpty) return;
  const entity = new ValidatorThreshold(activeEra.unwrap().index.toString());
  const validators = await ApiPromise.query.session.validators();
  const exposureInfos = await ApiPromise.query.staking.erasStakers.multi<Exposure>(validators.map(validator=>[activeEra.unwrap().index, validator]));
  const thresholdValidator = exposureInfos.reduce<{accountId: string, total: Balance}>((acc, exposure, idx)=>{
      if (!acc || exposure.total.unwrap().lt(acc.total)) {
          return {accountId: validators[idx].toString(), total: exposure.total.unwrap()};
      }
      return acc;
  }, undefined );
  // entity.startBlock = block.block.header.number.toNumber();
  entity.startBlock = block.block.header.number;
  entity.timestamp = block.timestamp.toDateString();
  entity.totalValidators = validators.length;
  entity.validatorWithLeastBond = thresholdValidator.accountId;
  entity.leastStaked = thresholdValidator.total.toBigInt();
  entity.totalStaked = (await ApiPromise.query.staking.erasTotalStake(activeEra.unwrap().index)).toBigInt();
  entity.maxNominatorRewardedPerValidator = ApiPromise.consts.staking.maxNominatorRewardedPerValidator?.toNumber();
  await entity.save();
}