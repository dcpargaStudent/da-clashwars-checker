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

    state = {
        clanTag: ""
    }

    public componentDidMount() {
        this.handleChange.bind(this);
    }
    public componentDidUpdate() {
        this.fetchNewData();
    }

    private handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ clanTag: ev.target.value });
    }

    public render() {

        return (
            <React.Fragment>
                <h1>Your Clan stats!</h1>
                <input type="textbox" name="clashTag" placeholder="Introduce clash tag.... #1L23KO" onChange={this.handleChange.bind(this)} />
                <button type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => { this.props.fetchList(this.state.clanTag); }}>
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
            this.props.members && this.props.members.length > 0 &&
            (<table className="table table-striped" aria-labelledby="tabelLabel">
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