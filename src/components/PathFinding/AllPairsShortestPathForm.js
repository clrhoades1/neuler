import React, {Component} from 'react'
import { Form, Label, Input } from "semantic-ui-react"
import PathFindingForm from './PathFindingForm'
import StreamOnlyForm from "./StreamOnlyForm";

export default class extends Component {
    state = {
        advanced: false
    }

    render() {
        const { onChange, labelOptions, relationshipTypeOptions, startNodeId, endNodeId, weightProperty, defaultValue, propertyKeyLat, propertyKeyLon, concurrency, direction, persist } = this.props

        return (
            <Form size='mini' style={{ marginBottom: '1em' }}>
                <StreamOnlyForm onChange={onChange} direction={direction} persist={persist} concurrency={concurrency} labelOptions={labelOptions} relationshipTypeOptions={relationshipTypeOptions}/>
            </Form>
        )
    }
}
