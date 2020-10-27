import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/index';
import * as ClanCheckerStore from '../store/ClanChecker';
import { RouteComponentProps } from 'react-router';


type ClanCheckerProps =
    ClanCheckerStore.ClanCheckerState &
    typeof ClanCheckerStore.actionCreators
    & RouteComponentProps<{ clanTag: string }>;

class ClanChecker extends React.PureComponent<ClanCheckerProps> {

    public componentDidUpdate() {
        this.fetchNewData();
    }

    public render() {
        return (
            <React.Fragment>
                <h1>Your Clan stats!</h1>

                <button type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => { this.props.fetchList("123"); }}>
                    Get list
                </button>
                {this.renderFetchedData()}
            </React.Fragment>
        );
    }

    private fetchNewData() {
        this.props.fetchList(this.props.match.params.clanTag);
    }

    private renderFetchedData() {
        return (
            this.props.members && (<table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Donations given</th>
                        <th>Donations received</th>
                        <th>Fame points</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.members && this.props.members.map((member: ClanCheckerStore.MemberData) =>
                        <tr key={member.name}>
                            <td>{member.donationsGive}</td>
                            <td>{member.donationsReceived}</td>
                            <td>{member.fame}</td>
                        </tr>
                    )}
                </tbody>
            </table>)
        );
    }
};

export default connect(
    (state: ApplicationState) => state.clanChecker,
    ClanCheckerStore.actionCreators
    )(ClanChecker as any);