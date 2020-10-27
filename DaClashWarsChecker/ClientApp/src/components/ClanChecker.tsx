import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/index';
import * as ClanCheckerStore from '../store/ClanChecker';

type ClanCheckerProps = ClanCheckerStore.ClanCheckerState;

class ClanChecker extends React.Component {

    public render() {
        return (
            <React.Fragment>
                <h1>Your Clan stats!</h1>
            </React.Fragment>
        );

    }
}

export default connect(
    (state: ApplicationState) => state.clanChecker,
    ClanCheckerStore.actionCreators
    )(ClanChecker);