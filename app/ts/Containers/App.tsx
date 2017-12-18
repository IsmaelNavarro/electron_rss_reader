import { Layout, Content } from 'react-mdl';
import * as React from 'react';

import TitleBar from '../Components/TitleBar';
import Menu from '../Components/Menu';
import Feed from '../Components/Feed';
import ErrorAlert from '../Components/ErrorAlert';
import { IRootState, TStore } from '../Interfaces/index';
import actions from '../Actions/actions';
import { connect } from 'react-redux';

class App extends React.Component<TStore, {}> {

  componentDidMount() {
    this.props.fetchMenu();
  }

  render() {
    return (
      <div className='main-wrapper'>
        <ErrorAlert store={this.props} />
        <Layout fixedHeader fixedDrawer>
          <TitleBar />
          <Menu store={this.props}/> 
          <Content> 
            <Feed  store={this.props}/> 
          </Content>
        </Layout>
      </div>
    );
  }
} 

const mapStateToProps = (state: IRootState) => state;

const mapDispatchToProps = {
  ...actions
}

export default connect( 
  mapStateToProps, 
  mapDispatchToProps 
)( App ); 