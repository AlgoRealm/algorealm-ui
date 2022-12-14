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

import {
  Dispatch,
  Middleware,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import { StoreGetSate } from '../store';

const logger: Middleware =
  ({ getState }: { getState: StoreGetSate }) =>
  (next: Dispatch) =>
  (action: PayloadAction<any, string, any, SerializedError>) => {
    if (action.type === `walletConnect/setChain`) {
      console.log(`switch chain: `, action.payload);
    }
    if (action.type === `walletConnect/getAccountAssets/pending`) {
      console.log(`loading assets...`);
    }
    if (action.type === `walletConnect/getAccountAssets/fulfilled`) {
      console.log(`assets sucessfully loaded`);
    }
    if (action.type === `walletConnect/getAccountAssets/rejected`) {
      console.error(action.error.message);
    }

    const result = next(action);
    if (action.type === `walletConnect/reset`) {
      console.log(`reset state`, getState().walletConnect);
    }

    return result;
  };

export default logger;
