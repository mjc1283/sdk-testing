/**
 * Copyright 2018-2019, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from 'react';
import { UserAttributes } from '@optimizely/optimizely-sdk';
import { ReactSDKClient } from './client';
declare type UserInfo = {
    id: string;
    attributes?: UserAttributes;
};
interface OptimizelyProviderProps {
    optimizely: ReactSDKClient;
    timeout?: number;
    isServerSide?: boolean;
    user?: Promise<UserInfo> | UserInfo;
    userId?: string;
    userAttributes?: UserAttributes;
}
interface OptimizelyProviderState {
    userId: string;
    attributes: {
        [key: string]: string;
    } | undefined;
}
export declare class OptimizelyProvider extends React.Component<OptimizelyProviderProps, OptimizelyProviderState> {
    constructor(props: OptimizelyProviderProps);
    componentDidUpdate(prevProps: OptimizelyProviderProps): void;
    render(): JSX.Element;
}
export {};
