import { CONNECTED_WALLET_TYPE } from '@/common/constants';
import { AlgoRealmWallet, WalletType } from '@/models/Wallet';
import { onSessionUpdate, reset } from '@/redux/slices/walletConnectSlice';
import store from '@/redux/store';
import algosdk, { Account, encodeAddress, Transaction } from 'algosdk';

export default class MnemonicClient implements AlgoRealmWallet {
  private client: Account | undefined;
  private mnemonic: string;

  constructor(mnemonic: string) {
    this.mnemonic = mnemonic;
    this.client = undefined;
  }

  public connect = async () => {
    this.client = algosdk.mnemonicToSecretKey(this.mnemonic);
    store.dispatch(onSessionUpdate([this.client.addr]));
    localStorage.setItem(CONNECTED_WALLET_TYPE, WalletType.Mnemonic);
    return Promise.resolve();
  };

  public address = () => {
    if (this.client) {
      return this.client.addr;
    } else {
      throw new Error(`Client not connected`);
    }
  };

  public accounts = () => {
    if (this.client) {
      return [this.client.addr];
    } else {
      throw new Error(`Client not connected`);
    }
  };

  public signTransactions = async (txnGroup: Transaction[]) => {
    return txnGroup.map((txn) => {
      if (this.client?.addr === encodeAddress(txn.from.publicKey)) {
        return txn.signTxn(this.client.sk);
      } else {
        return null;
      }
    });
  };

  public disconnect = async () => {
    this.client = undefined;
    localStorage.removeItem(CONNECTED_WALLET_TYPE);
    store.dispatch(reset());
    return;
  };

  public connected = () => {
    return this.client !== undefined;
  };
}
