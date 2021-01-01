import * as React from 'react';
import {List, LMR} from 'tonva';
import {Page} from 'tonva';
import {Role, UnitApp} from '../model';
import {store} from '../store';
import {mainApi} from '../api';

interface Props {
    role: Role;
}
interface State {
    apps: UnitApp[]
}
export class RoleApps extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {apps:undefined};
    }
    async componentDidMount() {
        let ret = await mainApi.unitRoleApps(store.unit.id, this.props.role.id);
        this.setState({
            apps: ret,
        });
    }
    private renderRoleApp(app:UnitApp, index:number) {
        return <LMR className="py-2 px-3 align-items-center"
                left={app.name}
                right={<small className="text-muted">{app.discription}</small>} />
    }
    render() {
        let {role} = this.props;
        return <Page header={role.name + ' - 可用APP'}>
            <List
                items={this.state.apps}
                item={{render: this.renderRoleApp}}
                none="没有APP" />
        </Page>;
    }
}
