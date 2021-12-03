// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class TokenPair extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("count", Value.fromBigInt(BigInt.zero()));
    this.set("token0", Value.fromBytes(Bytes.empty()));
    this.set("token1", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenPair entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save TokenPair entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("TokenPair", id.toString(), this);
    }
  }

  static load(id: string): TokenPair | null {
    return changetype<TokenPair | null>(store.get("TokenPair", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get count(): BigInt {
    let value = this.get("count");
    return value!.toBigInt();
  }

  set count(value: BigInt) {
    this.set("count", Value.fromBigInt(value));
  }

  get token0(): Bytes {
    let value = this.get("token0");
    return value!.toBytes();
  }

  set token0(value: Bytes) {
    this.set("token0", Value.fromBytes(value));
  }

  get token1(): Bytes {
    let value = this.get("token1");
    return value!.toBytes();
  }

  set token1(value: Bytes) {
    this.set("token1", Value.fromBytes(value));
  }
}