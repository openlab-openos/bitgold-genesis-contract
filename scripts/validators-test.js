const web3 = require('web3');
const RLP = require('rlp');

// Configure
const validators = [
  {
    consensusAddr: '0x87c665961223ceaecdbb718f7c6f4b8900705509',
    feeAddr: '0x87c665961223ceaecdbb718f7c6f4b8900705509',
    bscFeeAddr: '0x87c665961223ceaecdbb718f7c6f4b8900705509',
    votingPower: 0x0000000000000064,
  },
  {
    consensusAddr: '0xda1bda10eb6d24e32fecdeb9610a3dc1dcd5683b',
    feeAddr: '0xda1bda10eb6d24e32fecdeb9610a3dc1dcd5683b',
    bscFeeAddr: '0xda1bda10eb6d24e32fecdeb9610a3dc1dcd5683b',
    votingPower: 0x0000000000000064,
  },
  {
    consensusAddr: '0xe4e4362a234c1d756b55546d9d116e6511d5544e',
    feeAddr: '0xe4e4362a234c1d756b55546d9d116e6511d5544e',
    bscFeeAddr: '0xe4e4362a234c1d756b55546d9d116e6511d5544e',
    votingPower: 0x0000000000000064,
  },
];
const bLSPublicKeys = [
  '0x8227359f1fa979cde8b33a4bbc814d20452dac2b22fc81e1b3c2b451e4cdd6791e2ed83a07bb0b5d730b3d22acf5303e',
  '0xb6485114d2b369b9ce9bbea0409fe2f4c81379f3500b0fffb6b0f5af0d66ec463684843a3c816796f85c28411f2ad47a',
  '0x95de3c91e079a096fe215aa0102724629d7f3a22d1b490b1097f63c58b3e698ab213ea3c872985719f1d8c7e36e43559',
];

// ======== Do not edit below ========
function generateExtraData(validators) {
  let extraVanity = Buffer.alloc(32);
  let validatorsBytes = extraDataSerialize(validators);
  let extraSeal = Buffer.alloc(65);
  return Buffer.concat([extraVanity, validatorsBytes, extraSeal]);
}

function extraDataSerialize(validators) {
  let n = validators.length;
  let arr = [];
  for (let i = 0; i < n; i++) {
    let validator = validators[i];
    arr.push(Buffer.from(web3.utils.hexToBytes(validator.consensusAddr)));
  }
  return Buffer.concat(arr);
}

function validatorUpdateRlpEncode(validators, bLSPublicKeys) {
  let n = validators.length;
  let vals = [];
  for (let i = 0; i < n; i++) {
    vals.push([
      validators[i].consensusAddr,
      validators[i].bscFeeAddr,
      validators[i].feeAddr,
      validators[i].votingPower,
      bLSPublicKeys[i],
    ]);
  }
  let pkg = [0x00, vals];
  return web3.utils.bytesToHex(RLP.encode(pkg));
}

extraValidatorBytes = generateExtraData(validators);
validatorSetBytes = validatorUpdateRlpEncode(validators, bLSPublicKeys);

exports = module.exports = {
  extraValidatorBytes: extraValidatorBytes,
  validatorSetBytes: validatorSetBytes,
};
