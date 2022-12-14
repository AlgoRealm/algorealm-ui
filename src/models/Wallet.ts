/**
 * AlgoRealm
 * Copyright (C) 2022 AlgoRealm
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Transaction } from 'algosdk';

export enum WalletType {
  PeraWallet = `PeraWallet`,
  MyAlgoWallet = `MyAlgoWallet`,
  Mnemonic = `Mnemonic`,
}

export type WalletClient = {
  type: WalletType;
  supported: boolean;
  title: string;
  iconPath?: string;
};

export interface AlgoRealmWallet {
  address: () => string;
  signTransactions: (txnGroup: Transaction[]) => Promise<any[]>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  accounts(): string[];
  connected(): boolean;
}
