'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var logging = require('@optimizely/js-sdk-logging');
var hoistNonReactStatics = require('hoist-non-react-statics');
var optimizely = require('@optimizely/optimizely-sdk');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var hoistNonReactStatics__default = /*#__PURE__*/_interopDefaultLegacy(hoistNonReactStatics);

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
var OptimizelyContext = React.createContext({
    optimizely: null,
    isServerSide: false,
    timeout: 0,
});
var OptimizelyContextConsumer = OptimizelyContext.Consumer;
var OptimizelyContextProvider = OptimizelyContext.Provider;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/**
 * Copyright 2019, Optimizely
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
function areUsersEqual(user1, user2) {
    if (user1.id !== user2.id) {
        return false;
    }
    var user1keys = Object.keys(user1.attributes);
    var user2keys = Object.keys(user2.attributes);
    user1keys.sort();
    user2keys.sort();
    var areKeysLenEqual = user1keys.length === user2keys.length;
    if (!areKeysLenEqual) {
        return false;
    }
    for (var i = 0; i < user1keys.length; i++) {
        var key1 = user1keys[i];
        var key2 = user2keys[i];
        if (key1 !== key2) {
            return false;
        }
        if (user1.attributes[key1] !== user2.attributes[key2]) {
            return false;
        }
    }
    return true;
}
function hoistStaticsAndForwardRefs(Target, Source, displayName) {
    // Make sure to hoist statics and forward any refs through from Source to Target
    // From the React docs:
    //   https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
    //   https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components
    var forwardRef = function (props, ref) { return React.createElement(Target, __assign({}, props, { forwardedRef: ref })); };
    forwardRef.displayName = displayName + "(" + (Source.displayName || Source.name) + ")";
    return hoistNonReactStatics__default['default'](React.forwardRef(forwardRef), Source);
}
function coerceUnknownAttrsValueForComparison(maybeAttrs) {
    if (typeof maybeAttrs === 'object' && maybeAttrs !== null) {
        return maybeAttrs;
    }
    return {};
}
/**
 * Equality check applied to override user attributes passed into hooks. Used to determine when we need to recompute
 * a decision because a new set of override attributes was passed into a hook.
 * @param {UserAttributes|undefined} oldAttrs
 * @param {UserAttributes|undefined} newAttrs
 * @returns boolean
 */
function areAttributesEqual(maybeOldAttrs, maybeNewAttrs) {
    var oldAttrs = coerceUnknownAttrsValueForComparison(maybeOldAttrs);
    var newAttrs = coerceUnknownAttrsValueForComparison(maybeNewAttrs);
    var oldAttrsKeys = Object.keys(oldAttrs);
    var newAttrsKeys = Object.keys(newAttrs);
    if (oldAttrsKeys.length !== newAttrsKeys.length) {
        // Different attr count - must update
        return false;
    }
    return oldAttrsKeys.every(function (oldAttrKey) {
        return oldAttrKey in newAttrs && oldAttrs[oldAttrKey] === newAttrs[oldAttrKey];
    });
}

var logger = logging.getLogger('<OptimizelyProvider>');
var OptimizelyProvider = /** @class */ (function (_super) {
    __extends(OptimizelyProvider, _super);
    function OptimizelyProvider(props) {
        var _this = _super.call(this, props) || this;
        var optimizely = props.optimizely, userId = props.userId, userAttributes = props.userAttributes, user = props.user;
        // check if user id/attributes are provided as props and set them ReactSDKClient
        var finalUser = null;
        if (user) {
            if ('then' in user) {
                user.then(function (res) {
                    optimizely.setUser(res);
                });
            }
            else {
                finalUser = {
                    id: user.id,
                    attributes: user.attributes || {},
                };
            }
        }
        else if (userId) {
            finalUser = {
                id: userId,
                attributes: userAttributes || {},
            };
            // deprecation warning
            logger.warn('Passing userId and userAttributes as props is deprecated, please switch to using `user` prop');
        }
        if (finalUser) {
            optimizely.setUser(finalUser);
        }
        return _this;
    }
    OptimizelyProvider.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.isServerSide) {
            // dont react to updates on server
            return;
        }
        var optimizely = this.props.optimizely;
        if (this.props.user && 'id' in this.props.user) {
            if (!optimizely.user.id) {
                // no user is set in optimizely, update
                optimizely.setUser(this.props.user);
            }
            else if (
            // if the users aren't equal update
            !areUsersEqual({
                id: optimizely.user.id,
                attributes: optimizely.user.attributes,
            }, {
                id: this.props.user.id,
                // TODO see if we can use computeDerivedStateFromProps
                attributes: this.props.user.attributes || {},
            })) {
                optimizely.setUser(this.props.user);
            }
        }
    };
    OptimizelyProvider.prototype.render = function () {
        var _a = this.props, optimizely = _a.optimizely, children = _a.children, timeout = _a.timeout;
        var isServerSide = !!this.props.isServerSide;
        var value = {
            optimizely: optimizely,
            isServerSide: isServerSide,
            timeout: timeout,
        };
        return React.createElement(OptimizelyContextProvider, { value: value }, children);
    };
    return OptimizelyProvider;
}(React.Component));

/**
 * Copyright 2020, Optimizely
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
/**
 * Utility to setup listeners for changes to the datafile or user attributes and invoke the provided callback.
 * Returns an unListen function
 */
var setupAutoUpdateListeners = function (optimizely$1, type, value, logger, callback) {
    var loggerSuffix = "re-evaluating " + type + "=\"" + value + "\" for user=\"" + optimizely$1.user.id + "\"";
    var optimizelyNotificationId = optimizely$1.notificationCenter.addNotificationListener(optimizely.enums.NOTIFICATION_TYPES.OPTIMIZELY_CONFIG_UPDATE, function () {
        logger.info(optimizely.enums.NOTIFICATION_TYPES.OPTIMIZELY_CONFIG_UPDATE + ", " + loggerSuffix);
        callback();
    });
    var unregisterConfigUpdateListener = function () {
        return optimizely$1.notificationCenter.removeNotificationListener(optimizelyNotificationId);
    };
    var unregisterUserListener = optimizely$1.onUserUpdate(function () {
        logger.info("User update, " + loggerSuffix);
        callback();
    });
    return function () {
        unregisterConfigUpdateListener();
        unregisterUserListener();
    };
};

var hooksLogger = logging.getLogger('ReactSDK');
var HookType;
(function (HookType) {
    HookType["EXPERIMENT"] = "Experiment";
    HookType["FEATURE"] = "Feature";
})(HookType || (HookType = {}));
/**
 * Equality check applied to decision inputs passed into hooks (experiment/feature keys, override user IDs, and override user attributes).
 * Used to determine when we need to recompute a decision because different inputs were passed into a hook.
 * @param {DecisionInputs} oldDecisionInputs
 * @param {DecisionInput} newDecisionInputs
 * @returns boolean
 */
function areDecisionInputsEqual(oldDecisionInputs, newDecisionInputs) {
    return (oldDecisionInputs.entityKey === newDecisionInputs.entityKey &&
        oldDecisionInputs.overrideUserId === newDecisionInputs.overrideUserId &&
        areAttributesEqual(oldDecisionInputs.overrideAttributes, newDecisionInputs.overrideAttributes));
}
/**
 * Subscribe to changes in initialization state of the argument client. onInitStateChange callback
 * is called on the following events:
 * - optimizely successfully becomes ready
 * - timeout is reached prior to optimizely becoming ready
 * - optimizely becomes ready after the timeout has already passed
 * @param {ReactSDKClient} optimizely
 * @param {number|undefined} timeout
 * @param {Function} onInitStateChange
 */
function subscribeToInitialization(optimizely, timeout, onInitStateChange) {
    optimizely
        .onReady({ timeout: timeout })
        .then(function (res) {
        if (res.success) {
            hooksLogger.info('Client became ready');
            onInitStateChange({
                clientReady: true,
                didTimeout: false,
            });
            return;
        }
        hooksLogger.info("Client did not become ready before timeout of " + timeout + "ms, reason=\"" + (res.reason || '') + "\"");
        onInitStateChange({
            clientReady: false,
            didTimeout: true,
        });
        res.dataReadyPromise.then(function () {
            hooksLogger.info('Client became ready after timeout already elapsed');
            onInitStateChange({
                clientReady: true,
                didTimeout: true,
            });
        });
    })
        .catch(function () {
        hooksLogger.error("Error initializing client. The core client or user promise(s) rejected.");
    });
}
function useCompareAttrsMemoize(value) {
    var ref = React.useRef();
    if (!areAttributesEqual(value, ref.current)) {
        ref.current = value;
    }
    return ref.current;
}
/**
 * A React Hook that retrieves the variation for an experiment, optionally
 * auto updating that value based on underlying user or datafile changes.
 *
 * Note: The react client can become ready AFTER the timeout period.
 *       ClientReady and DidTimeout provide signals to handle this scenario.
 */
var useExperiment = function (experimentKey, options, overrides) {
    if (options === void 0) { options = {}; }
    if (overrides === void 0) { overrides = {}; }
    var _a = React.useContext(OptimizelyContext), optimizely = _a.optimizely, isServerSide = _a.isServerSide, timeout = _a.timeout;
    if (!optimizely) {
        throw new Error('optimizely prop must be supplied via a parent <OptimizelyProvider>');
    }
    var overrideAttrs = useCompareAttrsMemoize(overrides.overrideAttributes);
    var getCurrentDecision = React.useCallback(function () { return ({
        variation: optimizely.activate(experimentKey, overrides.overrideUserId, overrideAttrs),
    }); }, [optimizely, experimentKey, overrides.overrideUserId, overrideAttrs]);
    var isClientReady = isServerSide || optimizely.isReady();
    var _b = React.useState(function () {
        var decisionState = isClientReady ? getCurrentDecision() : { variation: null };
        return __assign({}, decisionState, { clientReady: isClientReady, didTimeout: false });
    }), state = _b[0], setState = _b[1];
    // Decision state is derived from entityKey and overrides arguments.
    // Track the previous value of those arguments, and update state when they change.
    // This is an instance of the derived state pattern recommended here:
    // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
    var currentDecisionInputs = {
        entityKey: experimentKey,
        overrideUserId: overrides.overrideUserId,
        overrideAttributes: overrideAttrs,
    };
    var _c = React.useState(currentDecisionInputs), prevDecisionInputs = _c[0], setPrevDecisionInputs = _c[1];
    if (!areDecisionInputsEqual(prevDecisionInputs, currentDecisionInputs)) {
        setPrevDecisionInputs(currentDecisionInputs);
        setState(function (prevState) { return (__assign({}, prevState, getCurrentDecision())); });
    }
    var finalReadyTimeout = options.timeout !== undefined ? options.timeout : timeout;
    React.useEffect(function () {
        if (!isClientReady) {
            subscribeToInitialization(optimizely, finalReadyTimeout, function (initState) {
                setState(__assign({}, getCurrentDecision(), initState));
            });
        }
    }, [isClientReady, finalReadyTimeout, setState, getCurrentDecision, optimizely]);
    React.useEffect(function () {
        if (options.autoUpdate) {
            return setupAutoUpdateListeners(optimizely, HookType.EXPERIMENT, experimentKey, hooksLogger, function () {
                setState(function (prevState) { return (__assign({}, prevState, getCurrentDecision())); });
            });
        }
        return function () { };
    }, [isClientReady, options.autoUpdate, optimizely, experimentKey, setState, getCurrentDecision]);
    return [state.variation, state.clientReady, state.didTimeout];
};
/**
 * A React Hook that retrieves the status of a feature flag and its variables, optionally
 * auto updating those values based on underlying user or datafile changes.
 *
 * Note: The react client can become ready AFTER the timeout period.
 *       ClientReady and DidTimeout provide signals to handle this scenario.
 */
var useFeature = function (featureKey, options, overrides) {
    if (options === void 0) { options = {}; }
    if (overrides === void 0) { overrides = {}; }
    var _a = React.useContext(OptimizelyContext), optimizely = _a.optimizely, isServerSide = _a.isServerSide, timeout = _a.timeout;
    if (!optimizely) {
        throw new Error('optimizely prop must be supplied via a parent <OptimizelyProvider>');
    }
    var overrideAttrs = useCompareAttrsMemoize(overrides.overrideAttributes);
    var getCurrentDecision = React.useCallback(function () { return ({
        isEnabled: optimizely.isFeatureEnabled(featureKey, overrides.overrideUserId, overrideAttrs),
        variables: optimizely.getFeatureVariables(featureKey, overrides.overrideUserId, overrideAttrs),
    }); }, [optimizely, featureKey, overrides.overrideUserId, overrideAttrs]);
    var isClientReady = isServerSide || optimizely.isReady();
    var _b = React.useState(function () {
        var decisionState = isClientReady ? getCurrentDecision() : { isEnabled: false, variables: {} };
        return __assign({}, decisionState, { clientReady: isClientReady, didTimeout: false });
    }), state = _b[0], setState = _b[1];
    // Decision state is derived from entityKey and overrides arguments.
    // Track the previous value of those arguments, and update state when they change.
    // This is an instance of the derived state pattern recommended here:
    // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
    var currentDecisionInputs = {
        entityKey: featureKey,
        overrideUserId: overrides.overrideUserId,
        overrideAttributes: overrides.overrideAttributes,
    };
    var _c = React.useState(currentDecisionInputs), prevDecisionInputs = _c[0], setPrevDecisionInputs = _c[1];
    if (!areDecisionInputsEqual(prevDecisionInputs, currentDecisionInputs)) {
        setPrevDecisionInputs(currentDecisionInputs);
        setState(function (prevState) { return (__assign({}, prevState, getCurrentDecision())); });
    }
    var finalReadyTimeout = options.timeout !== undefined ? options.timeout : timeout;
    React.useEffect(function () {
        if (!isClientReady) {
            subscribeToInitialization(optimizely, finalReadyTimeout, function (initState) {
                setState(__assign({}, getCurrentDecision(), initState));
            });
        }
    }, [isClientReady, finalReadyTimeout, setState, getCurrentDecision, optimizely]);
    React.useEffect(function () {
        if (options.autoUpdate) {
            return setupAutoUpdateListeners(optimizely, HookType.FEATURE, featureKey, hooksLogger, function () {
                setState(function (prevState) { return (__assign({}, prevState, getCurrentDecision())); });
            });
        }
        return function () { };
    }, [isClientReady, options.autoUpdate, optimizely, featureKey, setState, getCurrentDecision]);
    return [state.isEnabled, state.variables, state.clientReady, state.didTimeout];
};

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
var FeatureComponent = function (props) {
    var feature = props.feature, timeout = props.timeout, autoUpdate = props.autoUpdate, children = props.children, overrideUserId = props.overrideUserId, overrideAttributes = props.overrideAttributes;
    var _a = useFeature(feature, { timeout: timeout, autoUpdate: autoUpdate }, { overrideUserId: overrideUserId, overrideAttributes: overrideAttributes }), isEnabled = _a[0], variables = _a[1], clientReady = _a[2], didTimeout = _a[3];
    if (!clientReady && !didTimeout) {
        // Only block rendering while were waiting for the client within the allowed timeout.
        return null;
    }
    // Wrap the return value here in a Fragment to please the HOC's expected React.ComponentType
    // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
    return React.createElement(React.Fragment, null, children(isEnabled, variables, clientReady, didTimeout));
};
var OptimizelyFeature = FeatureComponent;

function withOptimizely(Component) {
    var WithOptimizely = /** @class */ (function (_super) {
        __extends(WithOptimizely, _super);
        function WithOptimizely() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WithOptimizely.prototype.render = function () {
            var _a = this.props, forwardedRef = _a.forwardedRef, rest = __rest(_a, ["forwardedRef"]);
            // Note: Casting props to P is necessary because of this TypeScript issue:
            // https://github.com/microsoft/TypeScript/issues/28884
            return (React.createElement(OptimizelyContextConsumer, null, function (value) { return (React.createElement(Component, __assign({}, rest, { optimizelyReadyTimeout: value.timeout, optimizely: value.optimizely, isServerSide: value.isServerSide, ref: forwardedRef }))); }));
        };
        return WithOptimizely;
    }(React.Component));
    var withRefsForwarded = hoistStaticsAndForwardRefs(WithOptimizely, Component, 'withOptimizely');
    return withRefsForwarded;
}

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
var Experiment = function (props) {
    var experiment = props.experiment, autoUpdate = props.autoUpdate, timeout = props.timeout, overrideUserId = props.overrideUserId, overrideAttributes = props.overrideAttributes, children = props.children;
    var _a = useExperiment(experiment, { timeout: timeout, autoUpdate: autoUpdate }, { overrideUserId: overrideUserId, overrideAttributes: overrideAttributes }), variation = _a[0], clientReady = _a[1], didTimeout = _a[2];
    if (!clientReady && !didTimeout) {
        // Only block rendering while were waiting for the client within the allowed timeout.
        return null;
    }
    if (children != null && typeof children === 'function') {
        // Wrap the return value here in a Fragment to please the HOC's expected React.ComponentType
        // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
        return React.createElement(React.Fragment, null, children(variation, clientReady, didTimeout));
    }
    var match = null;
    // We use React.Children.forEach instead of React.Children.toArray().find()
    // here because toArray adds keys to all child elements and we do not want
    // to trigger an unmount/remount
    React.Children.forEach(children, function (child) {
        if (match || !React.isValidElement(child)) {
            return;
        }
        if (child.props.variation) {
            if (variation === child.props.variation) {
                match = child;
            }
        }
        else if (child.props.default) {
            match = child;
        }
    });
    return match ? React.cloneElement(match, { variation: variation }) : null;
};
var OptimizelyExperiment = Experiment;

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
// Wrap the return value here in a Fragment to please the HOC's expected React.ComponentType
// See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
var Variation = function (_a) {
    var children = _a.children;
    return React.createElement(React.Fragment, null, children);
};
var OptimizelyVariation = Variation;

/**
 * Copyright 2019-2020, Optimizely
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
var logger$1 = logging.getLogger('ReactSDK');
var REACT_SDK_CLIENT_ENGINE = 'react-sdk';
var REACT_SDK_CLIENT_VERSION = '2.4.0';
var DEFAULT_ON_READY_TIMEOUT = 5000;
var OptimizelyReactSDKClient = /** @class */ (function () {
    /**
     * Creates an instance of OptimizelyReactSDKClient.
     * @param {optimizely.Config} [config={}]
     */
    function OptimizelyReactSDKClient(config) {
        var _this = this;
        this.user = {
            id: null,
            attributes: {},
        };
        this.isUserPromiseResolved = false;
        this.onUserUpdateHandlers = [];
        this.dataReadyPromiseFulfilled = false;
        this.initialConfig = config;
        this.userPromiseResovler = function () { };
        var configWithClientInfo = __assign({}, config, { clientEngine: REACT_SDK_CLIENT_ENGINE, clientVersion: REACT_SDK_CLIENT_VERSION });
        this._client = optimizely.createInstance(configWithClientInfo);
        this.userPromise = new Promise(function (resolve) {
            _this.userPromiseResovler = resolve;
        }).then(function () { return ({ success: true }); });
        this.dataReadyPromise = Promise.all([this.userPromise, this._client.onReady()]).then(function () {
            _this.dataReadyPromiseFulfilled = true;
            return {
                success: true,
                reason: 'datafile and user resolved',
            };
        });
    }
    OptimizelyReactSDKClient.prototype.onReady = function (config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        var timeoutId;
        var timeout = DEFAULT_ON_READY_TIMEOUT;
        if (config && config.timeout !== undefined) {
            timeout = config.timeout;
        }
        var timeoutPromise = new Promise(function (resolve) {
            timeoutId = setTimeout(function () {
                resolve({
                    success: false,
                    reason: 'failed to initialize onReady before timeout, either the datafile or user info was not set before the timeout',
                    dataReadyPromise: _this.dataReadyPromise,
                });
            }, timeout);
        });
        return Promise.race([this.dataReadyPromise, timeoutPromise]).then(function (res) {
            clearTimeout(timeoutId);
            return res;
        });
    };
    OptimizelyReactSDKClient.prototype.setUser = function (userInfo) {
        var _this = this;
        // TODO add check for valid user
        if (userInfo.id) {
            this.user.id = userInfo.id;
        }
        if (userInfo.attributes) {
            this.user.attributes = userInfo.attributes;
        }
        if (!this.isUserPromiseResolved) {
            this.userPromiseResovler(this.user);
            this.isUserPromiseResolved = true;
        }
        this.onUserUpdateHandlers.forEach(function (handler) { return handler(_this.user); });
    };
    OptimizelyReactSDKClient.prototype.onUserUpdate = function (handler) {
        var _this = this;
        this.onUserUpdateHandlers.push(handler);
        return function () {
            var ind = _this.onUserUpdateHandlers.indexOf(handler);
            if (ind > -1) {
                _this.onUserUpdateHandlers.splice(ind, 1);
            }
        };
    };
    OptimizelyReactSDKClient.prototype.isReady = function () {
        return this.dataReadyPromiseFulfilled;
    };
    /**
     * Buckets visitor and sends impression event to Optimizely
     * @param {string} experimentKey
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.activate = function (experimentKey, overrideUserId, overrideAttributes) {
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        if (user.id === null) {
            logger$1.info('Not activating experiment "%s" because userId is not set', experimentKey);
            return null;
        }
        return this._client.activate(experimentKey, user.id, user.attributes);
    };
    /**
     * Gets variation where visitor will be bucketed
     * @param {string} experimentKey
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.getVariation = function (experimentKey, overrideUserId, overrideAttributes) {
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        if (user.id === null) {
            logger$1.info('getVariation returned null for experiment "%s" because userId is not set', experimentKey);
            return null;
        }
        return this._client.getVariation(experimentKey, user.id, user.attributes);
    };
    /**
     * Sends conversion event to Optimizely
     * @param {string} eventKey
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @param {optimizely.EventTags} [eventTags]
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.track = function (eventKey, overrideUserId, overrideAttributes, eventTags) {
        if (typeof overrideUserId !== 'undefined' && typeof overrideUserId !== 'string') {
            eventTags = overrideUserId;
            overrideUserId = undefined;
            overrideAttributes = undefined;
        }
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        if (user.id === null) {
            logger$1.info('track for event "%s" not being sent because userId is not set', eventKey);
            return;
        }
        return this._client.track(eventKey, user.id, user.attributes, eventTags);
    };
    /**
     * Returns true if the feature is enabled for the given user
     * @param {string} feature
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {boolean}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.isFeatureEnabled = function (feature, overrideUserId, overrideAttributes) {
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        if (user.id === null) {
            logger$1.info('isFeatureEnabled returning false for feature "%s" because userId is not set', feature);
            return false;
        }
        return this._client.isFeatureEnabled(feature, user.id, user.attributes);
    };
    /**
     * @deprecated since 2.1.0
     * getAllFeatureVariables is added in JavaScript SDK which is similarly returning all the feature variables, but
     * it sends only single notification of type "all-feature-variables" instead of sending for each variable.
     * As getFeatureVariables was added when this functionality wasn't provided by JavaScript SDK, so there is no
     * need of it now and it would be removed in next major release
     *
     * Get all variables for a feature, regardless of the feature being enabled/disabled
     * @param {string} featureKey
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {VariableValuesObject}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.getFeatureVariables = function (featureKey, overrideUserId, overrideAttributes) {
        var _this = this;
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        var userId = user.id;
        if (userId === null) {
            logger$1.info('getFeatureVariables returning `{}` for feature "%s" because userId is not set', featureKey);
            return {};
        }
        var userAttributes = user.attributes;
        var variableObj = {};
        var optlyConfig = this._client.getOptimizelyConfig();
        if (!optlyConfig) {
            return {};
        }
        var feature = optlyConfig.featuresMap[featureKey];
        if (!feature) {
            return {};
        }
        Object.keys(feature.variablesMap).forEach(function (key) {
            var variable = feature.variablesMap[key];
            variableObj[variable.key] = _this._client.getFeatureVariable(featureKey, variable.key, userId, userAttributes);
        });
        return variableObj;
    };
    /**
     * Returns value for the given string variable attached to the given feature
     * flag
     * @param {string} feature
     * @param {string} variable
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.getFeatureVariableString = function (feature, variable, overrideUserId, overrideAttributes) {
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        if (user.id === null) {
            return null;
        }
        return this._client.getFeatureVariableString(feature, variable, user.id, user.attributes);
    };
    /**
     * Returns value for the given boolean variable attached to the given feature
     * flag
     * @param {string} feature
     * @param {string} variable
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.getFeatureVariableBoolean = function (feature, variable, overrideUserId, overrideAttributes) {
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        if (user.id === null) {
            return null;
        }
        return this._client.getFeatureVariableBoolean(feature, variable, user.id, user.attributes);
    };
    /**
     * Returns value for the given integer variable attached to the given feature
     * flag
     * @param {string} feature
     * @param {string} variable
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.getFeatureVariableInteger = function (feature, variable, overrideUserId, overrideAttributes) {
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        if (user.id === null) {
            return null;
        }
        return this._client.getFeatureVariableInteger(feature, variable, user.id, user.attributes);
    };
    /**
     * Returns value for the given double variable attached to the given feature
     * flag
     * @param {string} feature
     * @param {string} variable
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.getFeatureVariableDouble = function (feature, variable, overrideUserId, overrideAttributes) {
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        if (user.id === null) {
            return null;
        }
        return this._client.getFeatureVariableDouble(feature, variable, user.id, user.attributes);
    };
    /**
     * Returns value for the given json variable attached to the given feature
     * flag
     * @param {string} feature
     * @param {string} variable
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(unknown | null)}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.getFeatureVariableJSON = function (feature, variable, overrideUserId, overrideAttributes) {
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        if (user.id === null) {
            return null;
        }
        return this._client.getFeatureVariableJSON(feature, variable, user.id, user.attributes);
    };
    /**
     * Returns dynamically-typed value of the variable attached to the given
     * feature flag. Returns null if the feature key or variable key is invalid.
     * @param {string} featureKey
     * @param {string} variableKey
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(unknown | null)}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.getFeatureVariable = function (featureKey, variableKey, overrideUserId, overrideAttributes) {
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        if (user.id === null) {
            return null;
        }
        return this._client.getFeatureVariable(featureKey, variableKey, user.id, user.attributes);
    };
    /**
     * Returns values for all the variables attached to the given feature flag
     * @param {string} featureKey
     * @param {string} overrideUserId
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {({ [variableKey: string]: unknown } | null)}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.getAllFeatureVariables = function (featureKey, overrideUserId, overrideAttributes) {
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        if (user.id === null) {
            return {};
        }
        return this._client.getAllFeatureVariables(featureKey, user.id, user.attributes);
    };
    /**
     * Get an array of all enabled features
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideUserId]
     * @returns {Array<string>}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.getEnabledFeatures = function (overrideUserId, overrideAttributes) {
        var user = this.getUserContextWithOverrides(overrideUserId, overrideAttributes);
        if (user.id === null) {
            return [];
        }
        return this._client.getEnabledFeatures(user.id, user.attributes);
    };
    /**
     * Gets the forced variation for a given user and experiment
     * @param {string} experiment
     * @param {string} [overrideUserId]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.getForcedVariation = function (experiment, overrideUserId) {
        var user = this.getUserContextWithOverrides(overrideUserId);
        if (user.id === null) {
            return null;
        }
        return this._client.getForcedVariation(experiment, user.id);
    };
    /**
     * Force a user into a variation for a given experiment
     * @param {string} experiment
     * @param {string} overrideUserIdOrVariationKey
     * @param {string} [variationKey]
     * @returns {boolean}
     * @memberof OptimizelyReactSDKClient
     */
    OptimizelyReactSDKClient.prototype.setForcedVariation = function (experiment, overrideUserIdOrVariationKey, variationKey) {
        var finalUserId = null;
        var finalVariationKey = null;
        if (arguments.length === 2) {
            finalVariationKey = overrideUserIdOrVariationKey;
            finalUserId = this.getUserContextWithOverrides().id;
        }
        else if (arguments.length === 3) {
            finalUserId = this.getUserContextWithOverrides(overrideUserIdOrVariationKey).id;
            if (variationKey === undefined) {
                // can't have undefined if supplying all 3 arguments
                return false;
            }
            finalVariationKey = variationKey;
        }
        if (finalUserId === null) {
            return false;
        }
        return this._client.setForcedVariation(experiment, finalUserId, finalVariationKey);
    };
    /**
     *  Returns OptimizelyConfig object containing experiments and features data
     *  @returns {optimizely.OptimizelyConfig | null} optimizely config
     */
    OptimizelyReactSDKClient.prototype.getOptimizelyConfig = function () {
        return this._client.getOptimizelyConfig();
    };
    /**
     * Cleanup method for killing an running timers and flushing eventQueue
     */
    OptimizelyReactSDKClient.prototype.close = function () {
        return this._client.close();
    };
    Object.defineProperty(OptimizelyReactSDKClient.prototype, "client", {
        /**
         * Provide access to inner optimizely.Client object
         */
        get: function () {
            return this._client;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptimizelyReactSDKClient.prototype, "notificationCenter", {
        get: function () {
            return this._client.notificationCenter;
        },
        enumerable: true,
        configurable: true
    });
    OptimizelyReactSDKClient.prototype.getUserContextWithOverrides = function (overrideUserId, overrideAttributes) {
        var finalUserId = overrideUserId === undefined ? this.user.id : overrideUserId;
        var finalUserAttributes = overrideAttributes === undefined ? this.user.attributes : overrideAttributes;
        return {
            id: finalUserId,
            attributes: finalUserAttributes,
        };
    };
    return OptimizelyReactSDKClient;
}());
function createInstance(config) {
    return new OptimizelyReactSDKClient(config);
}

/**
 * Copyright 2019, Optimizely
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
var logger$2 = logging.getLogger('ReactSDK');
/**
 * logOnlyEventDispatcher only logs a message at the debug level, and does not
 * send any requests to the Optimizely results backend. Use this to disable
 * all event dispatching.
 */
var logOnlyEventDispatcher = {
    dispatchEvent: function (event, callback) {
        logger$2.debug('Event not dispatched by disabled event dispatcher: %s', function () {
            var eventStr;
            try {
                eventStr = JSON.stringify(event);
            }
            catch (err) {
                eventStr = 'error stringifying event';
            }
            return eventStr;
        });
        callback({ statusCode: 204 });
    },
};

Object.defineProperty(exports, 'enums', {
  enumerable: true,
  get: function () {
    return optimizely.enums;
  }
});
Object.defineProperty(exports, 'errorHandler', {
  enumerable: true,
  get: function () {
    return optimizely.errorHandler;
  }
});
Object.defineProperty(exports, 'eventDispatcher', {
  enumerable: true,
  get: function () {
    return optimizely.eventDispatcher;
  }
});
Object.defineProperty(exports, 'logging', {
  enumerable: true,
  get: function () {
    return optimizely.logging;
  }
});
Object.defineProperty(exports, 'setLogLevel', {
  enumerable: true,
  get: function () {
    return optimizely.setLogLevel;
  }
});
Object.defineProperty(exports, 'setLogger', {
  enumerable: true,
  get: function () {
    return optimizely.setLogger;
  }
});
exports.OptimizelyContext = OptimizelyContext;
exports.OptimizelyContextConsumer = OptimizelyContextConsumer;
exports.OptimizelyContextProvider = OptimizelyContextProvider;
exports.OptimizelyExperiment = OptimizelyExperiment;
exports.OptimizelyFeature = OptimizelyFeature;
exports.OptimizelyProvider = OptimizelyProvider;
exports.OptimizelyVariation = OptimizelyVariation;
exports.createInstance = createInstance;
exports.logOnlyEventDispatcher = logOnlyEventDispatcher;
exports.useExperiment = useExperiment;
exports.useFeature = useFeature;
exports.withOptimizely = withOptimizely;
