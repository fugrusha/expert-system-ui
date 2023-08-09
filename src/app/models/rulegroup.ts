import { IRule } from "./rule"

export interface RuleGroup {
    id: string
    groupType: RuleGroupType
    groupName: string
    description: string
    rules: [IRule]
}

export enum RuleGroupType {
    UNIT_GROOP,
    CONDITIONAL_GROUP
}
