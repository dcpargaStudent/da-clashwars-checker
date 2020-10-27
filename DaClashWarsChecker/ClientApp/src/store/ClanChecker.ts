export interface ClanCheckerState {
    clanTag: number
}

export interface IncrementCountAction { type: 'INCREMENT_COUNT' }
export interface DecrementCountAction { type: 'DECREMENT_COUNT' }

export const actionCreators = {
    increment: () => ({ type: 'INCREMENT_COUNT' } as IncrementCountAction),
    decrement: () => ({ type: 'DECREMENT_COUNT' } as DecrementCountAction)
};