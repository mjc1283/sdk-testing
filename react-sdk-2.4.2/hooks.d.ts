import { UserAttributes } from '@optimizely/optimizely-sdk';
import { VariableValuesObject } from './client';
declare type HookOptions = {
    autoUpdate?: boolean;
    timeout?: number;
};
declare type HookOverrides = {
    overrideUserId?: string;
    overrideAttributes?: UserAttributes;
};
declare type ClientReady = boolean;
declare type DidTimeout = boolean;
interface ExperimentDecisionValues {
    variation: string | null;
}
interface FeatureDecisionValues {
    isEnabled: boolean;
    variables: VariableValuesObject;
}
interface UseExperiment {
    (experimentKey: string, options?: HookOptions, overrides?: HookOverrides): [ExperimentDecisionValues['variation'], ClientReady, DidTimeout];
}
interface UseFeature {
    (featureKey: string, options?: HookOptions, overrides?: HookOverrides): [FeatureDecisionValues['isEnabled'], FeatureDecisionValues['variables'], ClientReady, DidTimeout];
}
/**
 * A React Hook that retrieves the variation for an experiment, optionally
 * auto updating that value based on underlying user or datafile changes.
 *
 * Note: The react client can become ready AFTER the timeout period.
 *       ClientReady and DidTimeout provide signals to handle this scenario.
 */
export declare const useExperiment: UseExperiment;
/**
 * A React Hook that retrieves the status of a feature flag and its variables, optionally
 * auto updating those values based on underlying user or datafile changes.
 *
 * Note: The react client can become ready AFTER the timeout period.
 *       ClientReady and DidTimeout provide signals to handle this scenario.
 */
export declare const useFeature: UseFeature;
export {};
