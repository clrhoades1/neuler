import React, {Component} from 'react'
import {Form} from "semantic-ui-react"
import WeightedSimilarityForm from "./WeightedSimilarityForm";

export default class extends Component {
  state = {
    advanced: false
  }

  render() {
    const {onChange, labelOptions, relationshipTypeOptions, writeProperty, writeRelationshipType, similarityCutoff, degreeCutoff, concurrency, direction, persist} = this.props

    return (
      <Form size='mini' style={{marginBottom: '1em'}}>
        <WeightedSimilarityForm onChange={onChange} direction={direction} writeProperty={writeProperty} persist={persist}
                        concurrency={concurrency} labelOptions={labelOptions} writeRelationshipType={writeRelationshipType} similarityCutoff={similarityCutoff}
                        degreeCutoff = {degreeCutoff}
                        relationshipTypeOptions={relationshipTypeOptions}/>

      </Form>
    )
  }
}
