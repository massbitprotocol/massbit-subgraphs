import { Extrinsic } from '../generated/schema'
import { SignedBlock } from '@graphprotocol/graph-ts'

export function handleBlock(thisBlock: SignedBlock): void {
    const blockHash = thisBlock.block.header.hash.toString();

    //  thisBlock.block.extrinsics.map(extrinsic => {
    //     if (extrinsic.isSigned) {
    //         const origin = extrinsic.signer.toString();
    //         const entity = new Extrinsic(extrinsic.hash.toString());
    //         entity.blockHash = blockHash;
    //         entity.blockHeight = thisBlock.block.header.number.toBigInt();
    //         entity.origin = origin;
    //         entity.save();
    //     }
    // });

    for (let index = 0; index < thisBlock.block.extrinsics.length; index++) {
        const extrinsic = thisBlock.block.extrinsics[index];
        if (extrinsic.isSigned) {
            var origin = extrinsic.signer.toString();
            var entity = new Extrinsic(extrinsic.hash.toString());
            entity.blockHash = blockHash;
            entity.blockHeight = thisBlock.block.header.number.toBigInt();
            entity.origin = origin;
            entity.save();
        }
    }

}