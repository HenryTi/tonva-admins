import * as React from 'react';
import {observer} from 'mobx-react';
import {Prop, Media, PropGrid} from 'tonva';
import {nav, Page}  from 'tonva';
import {appIcon} from 'consts';
import {caches} from 'store';
import {IdDates} from './idDates';
import {span} from './span';
import {UnitSpan} from './unitSpan';

export interface UqLinkProps {
    className?: string;
    id: number;
    isLink?: boolean;
}

@observer
export class UqSpan extends React.Component<UqLinkProps> {
    onClick = (evt) => {
        evt.preventDefault();
        nav.push(<UqInfo id={this.props.id} />);
        return false;
    }
    render() {
        let {id, className, isLink} = this.props;
        let api = caches.uqs.get(id);
        let content;
        if (api === null) {
            content = id;
        }
        else {
            let {name, discription} = api;
            let disc = discription && '- ' + discription;
            if (name !== undefined) {
                content = <>{name}&nbsp;<small className="text-muted">{disc}</small></>;
            }
            else {
                content = id;
            }
        }
        return span(isLink, className, this.onClick, content);
    }
}

@observer
class UqInfo extends React.Component<UqLinkProps> {
    private rows:Prop[];
    render() {
        let uq = caches.uqs.get(this.props.id);
        let {name, discription, unit, date_init, date_update} = uq;
        let disp = <div>
            <div>{discription}</div>
            <IdDates date_update={date_update} date_init={date_init} />
        </div>;
        this.rows = [
            '',
            {type: 'component', component: <Media icon={appIcon} main={name} discription={disp} />},
            '',
            {type: 'component', label: '所有者', component: <div className="py-2"><UnitSpan id={unit} isLink={true} /></div> },
        ];
        return <Page header={'UQ - 详细资料'}>
            <PropGrid rows={this.rows} values={this.props} />
        </Page>;
    }
}
