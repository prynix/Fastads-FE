import React from 'react'
import MaterialDatatable from "material-datatable";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';

import { getOfferAds } from '../../store/actions/adAction.js';
import { getUserOffers, changeOfferStatus, deleteOffer } from '../../store/actions/offersAction.js';
import AdHoc from '../ad-generator/AdHoc.js';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    width: '100%',
    fontSize: '0.9rem',
    fontWeight: '500'
  }
});

class OffersList extends React.Component{
  state = {
    tabValue: 0,
    offer_id: '',
    offerOptions: { 
      filterType: 'checkbox',
      onlyOneRowCanBeSelected: true,
      rowCursorHand: true,
      onRowsDelete: (value) => {
        if(window.confirm(`Are you sure you want to delete ${this.props.offers[value.data[0].dataIndex].name}`)){
          this.props.deleteOffer(this.props.offers[value.data[0].dataIndex])
        }
      }
    },
    adOptions: { 
      filterType: 'checkbox',
      onlyOneRowCanBeSelected: true,
    }
  }

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  offerColumns = [
    {   
        name: 'Name', 
        field: 'name',
        options: {
            width: 70,
        },
    },
    {
        name: 'Description', 
        field: 'description',
        options: {
            width: 550,
        },
    },
    {
        name: 'Category', 
        field: 'category',
        options: {
            width: 170,
        },
    },
    {
        name: 'Budget', 
        field: 'budget',
        options: {
          customBodyRender: (value) => {
            return `$${value.budget} ${value.currency}`; 
          }
        }
    },
    {
        name: 'Price Per Click', 
        field: 'price_per_click',
        options: {
          customBodyRender: (value) => {
            return `$${value.price_per_click} ${value.currency}`; 
          }
        }
    },
    {
        name: 'Price Per Impression', 
        field: 'price_per_impression',
        options: {
          customBodyRender: (value) => {
            return `$${value.price_per_impression} ${value.currency}`; 
          }
        }
    },
    {
        name: 'Offer Status',
        options: {
          customBodyRender: (value) => {
            return <Switch
                checked={value.status}
                onChange={async() => {
                  this.props.changeOfferStatus(value);
                }}
                value="checkedB"
                color="primary"
              />
          }
        }
    },
    {
        name: 'View Ads',
        options: {
          customBodyRender: (value) => {
            return <button onClick={() => {
              this.setState({
                tabValue: 1,
              });
              this.props.getOfferAds(value.id);
            }}>View Ads</button>
          }
        }
    }
  ];
  
  adColumns = [
    {   
        name: 'Size', 
        field: 'size',
        options: {
            width: 70,
        },
    },
    {
        name: 'Ad', 
        field: 'message',
        options: {
            width: 150,
        },
    },
    {
        name: 'Preview', 
        field: 'back_img',
        options: {
          width: 170,            
          customBodyRender: (value) => {
            return <AdHoc ad={value}/>; 
          }
        },
    },
  ];
  

  render(){

    const { classes, offerAds, offers } = this.props;
    const { tabValue, offerOptions, adOptions } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={tabValue} onChange={this.handleTabChange}>
            <Tab label="Offers" className={classes.tab}/>
            <Tab label="Ads" className={classes.tab}/>
          </Tabs>
        </AppBar>
        {tabValue === 0 &&
        <MaterialDatatable
          title={"Offers List"}
          data={offers}
          columns={this.offerColumns}
          options={offerOptions}
        />}
        {tabValue === 1 && 
          <MaterialDatatable
          title={"Ads List"}
          data={offerAds}
          columns={this.adColumns}
          options={adOptions}
        />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    offerAds: state.adReducer.offerAds
  }
}

export default connect(
  mapStateToProps,
  {
    getOfferAds,
    getUserOffers,
    changeOfferStatus,
    deleteOffer
  }
)(withStyles(styles)(OffersList));