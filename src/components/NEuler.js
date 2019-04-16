import React, { Component } from 'react'
import { Container, Menu, Segment, Dimmer, Loader, Header } from "semantic-ui-react"

import AlgorithmsGroupMenu from "./AlgorithmGroupsMenu"
import { getAlgorithms } from "./algorithmsLibrary"
import MainContent from './MainContent'
import Datasets from './Datasets'
import { connect } from "react-redux"
import { Form, Input, Dropdown, Button } from "semantic-ui-react"
import { limit } from "../ducks/settings"
import { loadMetadata } from "../services/metadata"
import { setLabels, setRelationshipTypes } from "../ducks/metadata"
import Home from "./Home";

class NEuler extends Component {
  constructor(props, context) {
    super(props, context);
  }

  state = {
    status: 'groups',
    content: 'centralities'
  }

  handleMenuClick (content) {
    this.setState({content})
  }

  onComplete() {
    loadMetadata().then(metadata => {
      this.props.setLabels(metadata.labels)
      this.props.setRelationshipTypes(metadata.relationships)
    })
  }

  selectComponent(activeGroup) {
    switch (activeGroup) {
      case "Sample Graphs":
        return {header: "Sample Graphs", view: <Datasets onComplete={this.onComplete.bind(this)}/> }
      case  "Home":
        return {header: "Graph Algorithms Playground", view: <Home/> }
      default:
        return {header: "", view: <MainContent limit={limit}/> }
    }
  }

  render() {
    const { activeGroup, activeAlgorithm, selectAlgorithm, limit } = this.props

    const { header, view } = this.selectComponent(activeGroup)

    return (
      <Container fluid style={{ display: 'flex' }}>
       {/* <Form>
          <Form.Field>
            <label style={{ 'width': '10em', 'color': 'white' }}>Rows to show</label>
            <input
              type='number'
              placeholder="Rows"
              min={1}
              max={1000}
              step={1}
              value={limit}
              onChange={evt => this.props.updateLimit(parseInt(evt.target.value))}
              style={{ 'width': '10em' }}
            />
          </Form.Field>
        </Form>*/}
        <div style={{ width: '100%' }}>
          <Segment basic inverted vertical={false}
                   style={{ height: '5em', display: 'flex', justifyContent: 'space-between' }}>
            {header ? <Header as='h1' inverted color='grey' style={{ marginTop: '0' }}>
              {header}
            </Header> : null}
            <AlgorithmsGroupMenu selectAlgorithm={selectAlgorithm}/>

           {/* <Menu inverted>
              {getAlgorithms(activeGroup).map(algorithm =>
                <Menu.Item key={algorithm} as='a' active={activeAlgorithm === algorithm}
                           onClick={() => selectAlgorithm(algorithm)}>
                  {algorithm}
                </Menu.Item>)}
            </Menu>*/}
            <Header as='h1' inverted color='grey' style={{ marginTop: '0' }}>
              NEuler
            </Header>
          </Segment>
          {view}
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  limit: state.settings.limit
})

const mapDispatchToProps = dispatch => ({
  updateLimit: value => dispatch(limit(value)),
  setLabels: labels => dispatch(setLabels(labels)),
  setRelationshipTypes: relationshipTypes => dispatch(setRelationshipTypes(relationshipTypes))
})

export default connect(mapStateToProps, mapDispatchToProps)(NEuler)
