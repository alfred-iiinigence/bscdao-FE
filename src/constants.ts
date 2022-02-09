export const THE_GRAPH_URL = "https://api.thegraph.com/subgraphs/name/jay6404/fantom-dao-v4";
export const EPOCH_INTERVAL = 28800;

// NOTE could get this from an outside source since it changes slightly over time
export const BLOCK_RATE_SECONDS = 1;

export const TOKEN_DECIMALS = 9;

export const POOL_GRAPH_URLS = {
  4: "https://api.thegraph.com/subgraphs/name/jay6404/fantom-dao-v4",
  1: "https://api.thegraph.com/subgraphs/name/jay6404/fantom-dao-v4",
};

interface IAddresses {
  [key: number]: { [key: string]: string };
}

//BUSD => DAI
//MUSH => OHM
export const addresses: IAddresses = {
  97: {
    BSCDAO_ADDRESS: "0x6Be9454798f20F57ec2cF6bb80E49F0A0AC7e6ed",
    sBSCDAO_ADDRESS: "0xbA63edFDF5500B5C6a711E2838225A3D49Ba0f8a",
    DAI_ADDRESS: "0xCe4A2DC898467b1aFA2E510C1E054dFC837329A0",
    FRAX_ADDRESS: "0xc867bCca8e7b8d63121bddD486Bb2A5819cBc2f5",
    TREASURY_ADDRESS: "0xCb37956926a3aBfBe2e353b66f1cb612121575f0",
    DISTRIBUTOR_ADDRESS: "0xd9Acc18c1Ebc4cEB2bfdAD311e99E143Fc5D4591",
    BONDINGCALC_ADDRESS: "0x9150ed88426803D6AeB86576168C32f18bc2E679",
    STAKING_ADDRESS: "0x6e13831521b130A2ECD58fAc85A3D1d784381854",
    STAKING_WARMUP: "0xF79846bEE5C1F5D8E7CcC2038c2d215832f6b8EE",
    STAKING_HELPER: "0xC78Ee91689105bE3A41e402Fe50605399417B01C",
    DAIBOND_ADDRESS: "0xFA7d701f263c6bf754f39b5E070086AF72156F0E",
    FRAXBOND_ADDRESS: "0xBFC755448DE154E065EA0f3E0d2952c80dE8e972",
    BUSD_ADDRESS: "0xE507e671B2c205073ad49DcccB0822fA03849573", // duplicate
    CIRCULATING_SUPPLY_ADDRESS: "0x1C3F499AD1793f557Aa3847a84dE500B0e6B3f60",
    WSBSCDAO_ADDRESS: "0x52EA3FEDc49145Fb395e42CCD81419A361df112B",
  },
  250: {
    BUSD_ADDRESS: "0xE507e671B2c205073ad49DcccB0822fA03849573", // duplicate
    MUSH_ADDRESS: "0x59a1BffBbb1d7b5bd21A3495b0C85027C888cE78",
    STAKING_ADDRESS: "0x66E9cB939990e0046f7Ed919ec462F3036b12B86",
    STAKING_HELPER_ADDRESS: "0x652c9551165ABBCc48c0670d57e248eD13d890d7",
    OLD_STAKING_ADDRESS: "0xb640AA9082ad720c60102489b806E665d67DCE32", // Old mAY bE REMOVE
    SMUSH_ADDRESS: "0xAE0D27b0619897F03e8f21Ea5bfbECbB206A3a1d",
    WSMUSH_ADDRESS: "0x2d60F7001E2f154981348A0FfE0F6165b2c8869b",
    OLD_SOHM_ADDRESS: "0x8Fc4167B0bdA22cb9890af2dB6cB1B818D6068AE", // mAY BE REMOVE
    MIGRATE_ADDRESS: "0x3BA7C6346b93DA485e97ba55aec28E8eDd3e33E2",
    DISTRIBUTOR_ADDRESS: "0x29Df3d540292684b8889C10F1D86ef496c9862FB",
    BONDINGCALC_ADDRESS: "0xBbe4C5919b33A404eDc5EAF292F2011F8D86ce3E",
    CIRCULATING_SUPPLY_ADDRESS: "0xFC1c194DE6eC826BCbc7864FbCB3245aBAACbDd5", // Sypple Address WHY HERE ?
    TREASURY_ADDRESS: "0x7c8d92eefec8a736e94ded4cd08de444dd994c41",
    REDEEM_HELPER_ADDRESS: "0x943B32F40D0d5b31E93C60Fc84Addd8cC31E6948",
    PT_TOKEN_ADDRESS: "0x0a2d026bacc573a8b5a2b049f956bdf8e5256cfd", // JAY :: LP ADDRESS  33T token address, taken from `ticket` function on PRIZE_STRATEGY_ADDRESS
    PT_PRIZE_POOL_ADDRESS: "0xf9081132864ed5e4980CFae83bDB122d86619281", // NEW JAY :: LP ADDRESS
    PT_PRIZE_STRATEGY_ADDRESS: "0x2Df17EA8D6B68Ec444c9a698315AfB36425dac8b", // NEW JAY :: LP ADDRESS
    REFERRAL: "0x83f678B7f8d57A448bDB6dd4EEF603942c87C664", // May Be Not needed
    BOND_HELPER: "0x8a1C08cf83e7291C98d7ce0957F8a0e766F892B8", // Check this
  },
  //HEC = MUSH
  //SHEC = SMUSH
  //WSHEC = WSMUSH
  4002: {
    BUSD_ADDRESS: "0x670D56E6739595659C18F88B5d17dbFD0448EDAD", // duplicate
    MUSH_ADDRESS: "0x01003Bc1B1e9Be3e792b4EDcBaCeCaCdb7ee2c39", // HEC
    STAKING_ADDRESS: "0x446DEF17F6B01F26D4aA69Df58Ce839ED7e2859d",
    STAKING_HELPER_ADDRESS: "0x1e53d1620ACD4EdA731CAad2732e2c48a071F244",
    OLD_STAKING_ADDRESS: "0xb640AA9082ad720c60102489b806E665d67DCE32", // Old mAY bE REMOVE
    SMUSH_ADDRESS: "0x526Ee10Eebc05b6bBF945ED47e06633dAB00a630", // sHEC
    //This address is for the Wraping contract that was previously here
    WSMUSH_ADDRESS: "0x9Fc4f5e92343Aac25bb0B409304609c290c97e33", //wsHEC
    WSOHM_ADDRESS: "0x2D321B9CE0c838C64a060c0785C67523BEe3F282",
    ///
    OLD_SOHM_ADDRESS: "0x8Fc4167B0bdA22cb9890af2dB6cB1B818D6068AE", // mAY BE REMOVE
    MIGRATE_ADDRESS: "0x3BA7C6346b93DA485e97ba55aec28E8eDd3e33E2",
    DISTRIBUTOR_ADDRESS: "Contract0x6b7E681841FA780DfFc5778b59Cd3aDF7b9e05ce",
    BONDINGCALC_ADDRESS: "0xC8b8Dd79145EcE0f93EC7f8ACd4054eF2Fc64142",
    CIRCULATING_SUPPLY_ADDRESS: "0xa9E636A7dB12ABFc714ce25C94B75409d7f99ed3", // Sypple Address WHY HERE ?
    TREASURY_ADDRESS: "0x9592Aa95cad6F015019027bBcf6CBE9CCb3bc602",
    REDEEM_HELPER_ADDRESS: "0x12A2f8836213B3526ca7d4333DbA1b41b5Af619b",
    PT_TOKEN_ADDRESS: "0x0a2d026bacc573a8b5a2b049f956bdf8e5256cfd", // JAY :: LP ADDRESS  33T token address, taken from `ticket` function on PRIZE_STRATEGY_ADDRESS
    PT_PRIZE_POOL_ADDRESS: "0xf9081132864ed5e4980CFae83bDB122d86619281", // NEW JAY :: LP ADDRESS
    PT_PRIZE_STRATEGY_ADDRESS: "0x2Df17EA8D6B68Ec444c9a698315AfB36425dac8b", // NEW JAY :: LP ADDRESS
    REFERRAL: "0x83f678B7f8d57A448bDB6dd4EEF603942c87C664", // May Be Not needed
    BOND_HELPER: "0x8a1C08cf83e7291C98d7ce0957F8a0e766F892B8", // Check this
  },
  56: {
    BUSD_ADDRESS: "0xe9e7cea3dedca5984780bafc599bd69add087d56", // duplicate
    MUSH_ADDRESS: "0xddC7aebCAd4d6d4b4d437A97faE76d4042e6a9Cc",
    STAKING_ADDRESS: "0xe3C4b4aBf37D1C21FeCE57e8921ee4BA1ADB4fc1", // The new staking contract
    STAKING_HELPER_ADDRESS: "0x1846C682E13a7B4653B58e0e46AcaCA0D6cdeB88", // Helper contract used for Staking only
    OLD_STAKING_ADDRESS: "0x0822F3C03dcc24d200AFF33493Dc08d0e1f274A2",
    SMUSH_ADDRESS: "0x7442d4Ab4DC4744eee08584522BbC5AD65879d7c",
    WSOHM_ADDRESS: "0xca76543cf381ebbb277be79574059e32108e3e65",
    OLD_SOHM_ADDRESS: "0x31932E6e45012476ba3A3A4953cbA62AeE77Fbbe",
    MIGRATE_ADDRESS: "0xC7f56EC779cB9e60afA116d73F3708761197dB3d",
    DISTRIBUTOR_ADDRESS: "0x759085Ee0a151eCEC1ffdabeD5A790cf964b4176",
    BONDINGCALC_ADDRESS: "0x6d070413b722E0ae243584DaecBdc411103a7CDC",
    CIRCULATING_SUPPLY_ADDRESS: "0x9ed07F198437b0382F408d993530A85d3A31F6d4",
    TREASURY_ADDRESS: "0x9dAbf84d6D243A58033305D9a6a65Ea2F544376d",
    REDEEM_HELPER_ADDRESS: "0xf7db8a8Cb6c90B90ed50721412e95c27AcEde484",
    PT_TOKEN_ADDRESS: "0x0E930b8610229D74Da0A174626138Deb732cE6e9", // 33T token address, taken from `ticket` function on PRIZE_STRATEGY_ADDRESS
    PT_PRIZE_POOL_ADDRESS: "0xEaB695A8F5a44f583003A8bC97d677880D528248", // NEW
    PT_PRIZE_STRATEGY_ADDRESS: "0xf3d253257167c935f8C62A02AEaeBB24c9c5012a", // NEW
    REFERRAL: "0x998f2aCa17b1fd7025faB497a7d35FDb49690A9c",
    BOND_HELPER: "0x8a1C08cf83e7291C98d7ce0957F8a0e766F892B8",
  },
};
