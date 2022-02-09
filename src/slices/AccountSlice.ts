import { BigNumber, BigNumberish, ethers } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as sOHMv2 } from "../abi/sOhmv2.json";
import { abi as sHECv2 } from "../abi/sHECv2.json";
import { abi as wsHEC } from "../abi/wsHEC.json";
import { setAll } from "../helpers";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAddressAsyncThunk, ICalcUserBondDetailsAsyncThunk } from "./interfaces";
import { IERC20, SOhmv2 } from "src/typechain";
import multicall from "../helpers/multicall";
import { abi as calculateUserBondDetailsABI } from "../abi/custom/calculateUserBondDetails.json";

interface IUserBalances {
  balances: {
    busd: string;
    ohm: string;
    sohm: string;
  };
}

export const getBalances = createAsyncThunk(
  "account/getBalances",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk) => {
    console.log(`🚀 - address getBalance`, address);
    // const ohmContract = new ethers.Contract(addresses[networkID].MUSH_ADDRESS as string, ierc20Abi, provider) as IERC20;
    // const ohmBalance = await ohmContract.balanceOf(address);
    // const sohmContract = new ethers.Contract(
    //   addresses[networkID].SMUSH_ADDRESS as string,
    //   ierc20Abi,
    //   provider,
    // ) as IERC20;
    // const sohmBalance = await sohmContract.balanceOf(address);
    // const busdContract = new ethers.Contract(addresses[networkID].BUSD_ADDRESS as string, ierc20Abi, provider) as IERC20;
    // const busdBalance = await busdContract.balanceOf(address);

    const calls = [
      { address: addresses[networkID].BSCDAO_ADDRESS, name: "balanceOf", params: [address] },
      { address: addresses[networkID].sBSCDAO_ADDRESS, name: "balanceOf", params: [address] },
      { address: addresses[networkID].WSBSCDAO_ADDRESS, name: "balanceOf", params: [address] },
    ];

    const rawBalance = await multicall(networkID, provider, ierc20Abi, calls)
    const ohmBalance = rawBalance[0][0];
    console.log("My balance", Number(ohmBalance));
    const sohmBalance = rawBalance[1][0];
    const busdBalance = rawBalance[2][0];
    console.log(`🚀 - ethers`, ethers.utils.formatUnits(sohmBalance, "gwei"));
    //wrapping page balance data to be added here
    console.log(`🚀 - ethers.utils.formatUnits(busdBalance, "gwei")`, ethers.utils.formatUnits(busdBalance, "gwei"));
    return {
      balances: {
        ohm: ethers.utils.formatUnits(ohmBalance, "gwei"), //ohm => MUSH
        sohm: ethers.utils.formatUnits(sohmBalance, "gwei"), //sohm => SMUSH
        busd: ethers.utils.formatEther(busdBalance), //busd => WSMUSH
      },
    };
  },
);

interface IUserAccountDetails {
  staking: {
    ohmStake: number;
    ohmUnstake: number;
  };
}

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async ({ networkID, provider, address }: IBaseAddressAsyncThunk, { dispatch }) => {
    try {
      const ohmContract = new ethers.Contract(
        addresses[networkID].BSCDAO_ADDRESS as string,
        ierc20Abi,
        provider,
      ) as IERC20;
      const stakeAllowance = await ohmContract.allowance(address, addresses[networkID].STAKING_HELPER);
      const sohmContract = new ethers.Contract(
        addresses[networkID].sBSCDAO_ADDRESS as string,
        sOHMv2,
        provider,
      ) as SOhmv2;
      const unstakeAllowance = await sohmContract.allowance(address, addresses[networkID].STAKING_ADDRESS);

      const shecContract = new ethers.Contract(addresses[networkID].sBSCDAO_ADDRESS as string, sHECv2, provider);
      const wrapAllowance = await shecContract.allowance(address, addresses[networkID].WSBSCDAO_ADDRESS);
      const wshecContract = new ethers.Contract(addresses[networkID].WSBSCDAO_ADDRESS as string, wsHEC, provider);
      const unwrapAllowance = await wshecContract.allowance(address, addresses[networkID].WSBSCDAO_ADDRESS);
      console.log('Hit here!')
      await dispatch(getBalances({ address, networkID, provider }));

      return {
        staking: {
          ohmStake: +stakeAllowance,
          ohmUnstake: +unstakeAllowance,
        },
        wrapping: {
          hecWrap: +wrapAllowance,
          hecUnwrap: +unwrapAllowance,
        },
      };
    } catch (err) {
      console.log(`🚀 - err`, err);
    }
  },
);

export interface IUserBondDetails {
  allowance: number;
  interestDue: number;
  bondMaturationBlock: number;
  pendingPayout: string; //Payout formatted in gwei.
}
export const calculateUserBondDetails = createAsyncThunk(
  "account/calculateUserBondDetails",
  async ({ address, bond, networkID, provider }: ICalcUserBondDetailsAsyncThunk) => {
    try {
      if (!address) {
        return {
          bond: "",
          displayName: "",
          bondIconSvg: "",
          isLP: false,
          allowance: 0,
          balance: "0",
          interestDue: 0,
          bondMaturationBlock: 0,
          pendingPayout: "",
        };
      }
      // dispatch(fetchBondInProgress());

      // Calculate bond details.
      const bondContract = bond.getContractForBond(networkID, provider);
      const reserveContract = bond.getContractForReserve(networkID, provider);

      let pendingPayout, bondMaturationBlock;
      console.log("network", networkID);
      const bondAddress = bond.getAddressForBond(networkID);
      const reserveAddress = bond.getAddressForReserve(networkID);
      console.log(`🚀 - networkID`, networkID);
      console.log("bond address", bondAddress);
      console.log("bond  2 address", reserveAddress);
      // const bondHelper = addresses[networkID].BOND_HELPER;
      // console.log(`🚀 - bondHelper`, bondHelper);
      const calls = [
        { address: bondAddress, name: "bondInfo", params: [address] },
        { address: bondAddress, name: "pendingPayoutFor", params: [address] },
        { address: reserveAddress, name: "allowance", params: [address, bondAddress] }, //, bond.bondHelper ? bondHelper : bondAddress
        { address: reserveAddress, name: "balanceOf", params: [address] },
      ];
      console.log(`🚀 - calls`, calls);

      const rawBond = await multicall(networkID, provider, calculateUserBondDetailsABI, calls);

      // const bondDetails = await bondContract.bondInfo(address);
      const bondDetails = rawBond[0];

      let interestDue: BigNumberish = Number(bondDetails.payout.toString()) / Math.pow(10, 9);
      bondMaturationBlock = +bondDetails.vesting + +bondDetails.lastBlock;
      // pendingPayout = await bondContract.pendingPayoutFor(address);
      pendingPayout = rawBond[1][0];

      let allowance,
        balance = BigNumber.from(0);
      // allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
      allowance = rawBond[2][0];
      // balance = await reserveContract.balanceOf(address);
      balance = rawBond[3][0];
      // formatEthers takes BigNumber => String
      const balanceVal = ethers.utils.formatEther(balance);
      // balanceVal should NOT be converted to a number. it loses decimal precision
      return {
        bond: bond.name,
        displayName: bond.displayName,
        bondIconSvg: bond.bondIconSvg,
        isLP: bond.isLP,
        allowance: Number(allowance.toString()),
        balance: balanceVal,
        interestDue,
        bondMaturationBlock,
        pendingPayout: ethers.utils.formatUnits(pendingPayout, "gwei"),
      };
    } catch (error) {
      console.log(address);
      console.log(error);
    }
    console.log(`🚀 - address`, address);
  },
);

interface IAccountSlice extends IUserAccountDetails, IUserBalances {
  bonds: { [key: string]: IUserBondDetails };
  loading: boolean;
}

const initialState: IAccountSlice = {
  loading: false,
  bonds: {},
  balances: { busd: "", ohm: "", sohm: "" },
  staking: { ohmStake: 0, ohmUnstake: 0 },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(getBalances.pending, state => {
        state.loading = true;
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getBalances.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(calculateUserBondDetails.pending, state => {
        state.loading = true;
      })
      .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
        if (!action.payload) return;
        const bond = action.payload.bond;
        state.bonds[bond] = action.payload;
        state.loading = false;
      })
      .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      });
  },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
