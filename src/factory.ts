import { BigInt, DataSourceTemplate } from "@graphprotocol/graph-ts";
import {
  FACTORY_ADDRESS,
  ZERO_BD,
  ZERO_BI
} from './helpers';
import { PairCreated } from '../generated/UniswapFactory/UniswapFactory';
import { UniswapFactory, Bundle, Token, Pair } from "../generated/schema";
import { V2Pair as PairTemplate } from "../generated/templates";


export function handlePairCreated(event: PairCreated): void {

  let factory = UniswapFactory.load(FACTORY_ADDRESS);
  if (factory === null) {
    factory = new UniswapFactory(FACTORY_ADDRESS)
    factory.pairCount = 0
    factory.totalVolumeETH = ZERO_BD
    factory.totalLiquidityETH = ZERO_BD
    factory.totalVolumeUSD = ZERO_BD
    factory.untrackedVolumeUSD = ZERO_BD
    factory.totalLiquidityUSD = ZERO_BD
    factory.txCount = ZERO_BI

    // create new bundle
    let bundle = new Bundle('1')
    bundle.ethPrice = ZERO_BD;
    bundle.save();
  }
  factory.pairCount = factory.pairCount + 1;
  factory.save();

  // create the tokens
  let token0 = Token.load(event.params.token0.toHexString());
  let token1 = Token.load(event.params.token1.toHexString());

  if (token0 === null) {
    token0 = new Token(event.params.token0.toHexString());
  }

  if (token1 === null) {
    token1 = new Token(event.params.token1.toHexString());
  }

  let pair = new Pair(event.params.pair.toHexString()) as Pair;
  pair.token0 = token0.id;
  pair.token1 = token1.id;

  pair.liquidityProviderCount = ZERO_BI;
  pair.createdAtTimestamp = event.block.timestamp;
  pair.createdAtBlockNumber = event.block.number;

  pair.token0Price = ZERO_BD;
  pair.token1Price = ZERO_BD;

  // create the tracked contract based on the template
  PairTemplate.create(event.params.pair);
  
  // save updated values
  token0.save()
  token1.save()
  pair.save();
  factory.save();


}
