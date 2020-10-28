import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';


export interface ClanCheckerState {
    isLoading: boolean;
    clanTag: string;
    members: MemberData[];
}

export interface MemberData {
    name: string;
    donationsGive: number;
    donationsReceived: number;
    fame: number;
}

//Action types definition

export interface FetchClanDataAction {
    type: 'FETCH_CLAN_DATA';
    clanTag: string;
}

export interface FetchedClanDataAction {
    type: 'FETCHED_CLAN_DATA';
    clanTag: string;
    members: MemberData[];
}

//Actions definitions
type KnownAction = FetchClanDataAction | FetchedClanDataAction;

export const actionCreators = {
    fetchList: (clanTag: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const clanTagEncoded = encodeURIComponent(clanTag);
        if (appState && appState.clanChecker && clanTag) {
            fetch(`clanchecker?clanTag=${clanTagEncoded}`)
                .then(response => response.json() as Promise<MemberData[]>)
                .then(data => {
                    dispatch({ type: 'FETCHED_CLAN_DATA', clanTag: clanTag, members: data });
                });

            dispatch({ type: 'FETCH_CLAN_DATA', clanTag: clanTag });
        }
    },
    setClanTag: (clanTag: string) => ({ clanTag: clanTag }) 
};

const emptyClanInfo: ClanCheckerState = { isLoading: false, members: [], clanTag: "" };

export const reducer: Reducer<ClanCheckerState> = (state: ClanCheckerState | undefined, incomingAction: Action): ClanCheckerState => {
    if (state === undefined) {
        return emptyClanInfo;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
    case 'FETCH_CLAN_DATA':
            return {
                isLoading: true,
                members: state.members,
                clanTag: action.clanTag
            };
        case 'FETCHED_CLAN_DATA':
            //Here is where we should check if the incoming data is valid (weather checks the startDateIndex)
            return {
                isLoading: false,
                members: action.members,
                clanTag: action.clanTag
            }

    default:
    }
    return state;

};