import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class campaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContrbution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {

    const {
      balance,
      manager,
      minimumContrbution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of manager',
        description: 'The manager created this campaign and can create requests to withdraw money',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: minimumContrbution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least this much wei to become a approver'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'A request tries to wihdraw money from the contract. Requests must be approved by approvers'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of people who have already donated to this campaign'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'The balance is how much money this campaign has left to spend'
      },
      /*{
          header: 'Cupcakes and Crowns',
          description: 'Campaign Name',
      },
      {
        header: 'Goal',
        description:
          'Just a college student with a passion for baking who is hopeful to open my Cupcakes and Crowns shop to bring mason jar goodies to you!',
      },
      {
        header: 'United States of America',
        description:
          'Country',
      },
      {
        header: 'Food',
        description:
          'Category',
      },*/
    ];

    return <Card.Group items = {items}/>
  }

  render()  {
    return (
      <Layout>

        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width = {10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width = {6}>
              <ContributeForm address = {this.props.address}/>
              <br/><br/>
              <label>Predict Campaign Success</label><br/><br/>
              <a href="http://localhost:5000/">
                <Button primary>
                    Predict?
                </Button>
                </a>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route = {`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Layout>
    );
  }
}

export default campaignShow;
