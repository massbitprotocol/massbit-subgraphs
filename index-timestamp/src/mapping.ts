import { MasterChefModel } from '../generated/schema'
import { BlockTs } from '../generated/schema'
import { ethereum } from '@graphprotocol/graph-ts'
import { substrate } from '@graphprotocol/graph-ts'
// import {Compact} from '@polkadot/types';
// import {Moment} from '@polkadot/types/interfaces';

export function handleBlock(block: ethereum.Block): void {
  let id = block.hash.toHex()
  let entity = new MasterChefModel(id)
  entity.timestamp = block.timestamp;
  entity.save()
}

// export function handleTimestampSet(extrinsic: substrate.SubstrateExtrinsic): void {
//   const record = new BlockTs(extrinsic.block.block.header.hash.toString());
//   record.blockHeight = extrinsic.block.block.header.number.toString();
//   // const moment = extrinsic.extrinsic.args[0] as Compact<Moment>;
//   // record.timestamp = new Date(moment.toNumber()).toDateString();
//   record.save();
// }
