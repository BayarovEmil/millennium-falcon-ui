import type { components } from './schema'

export type TaskDto = components['schemas']['TaskDto']
export type GoalDto = components['schemas']['GoalDto']
export type LifeAreaDto = components['schemas']['LifeAreaDto']
export type PlanPeriodDto = components['schemas']['PlanPeriodDto']
export type MonthViewDto = components['schemas']['MonthViewDto']
export type WeekSummaryDto = components['schemas']['WeekSummaryDto']

export type GoalType = GoalDto['type']
export type GoalStatus = GoalDto['status']
export type PeriodType = PlanPeriodDto['type']

export type CreateTaskRequest = components['schemas']['CreateTaskRequest']
export type UpdateTaskRequest = components['schemas']['UpdateTaskRequest']
export type ReorderRequest = components['schemas']['ReorderRequest']
export type CreateGoalRequest = components['schemas']['CreateGoalRequest']
export type UpdateGoalRequest = components['schemas']['UpdateGoalRequest']
export type NoteRequest = components['schemas']['NoteRequest']
export type LifeAreaRequest = components['schemas']['LifeAreaRequest']
