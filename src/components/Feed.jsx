import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { loadFeed } from './../redux/actions/actions'

const mapStateToProps = state => {
  return {
    feedPosts: state.feed.feedPosts
  }
}

class Feed extends Component {
  componentWillReceiveProps(nextProps) {

  }

  componentWillMount() {
    this.props.loadFeed({"data":{"isVisible":"true"}})
  }


  render() {
    function getType(type) {
      if (type < 10) {
        return "Undergraduate"
      }
      if (type > 10) {
        return "Postgraduate"
      }
    }
    const FeedArticles = this.props.feedPosts.reverse().map((article) =>

      <div className="card col-sm-3">
        <div className="card-header text-center">
          <strong className="card-text ">{getType(article.type)}</strong>
        </div>
        <div className="card-body ">

          <p className="card-text">Academic year      : {article.academic_year}</p>
          <p className="card-text">Semester           : {article.semester}</p>
          <p className="card-text">Registration start : {new Date(article.start).toLocaleDateString()}</p>
          <p className="card-text">Registration end   : {new Date(article.end).toLocaleDateString()}</p>
        </div>
      </div>
    )
    return (
      <div className="pmyx-0">
        <Header />
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>Up Comming Examinations</h1>
            <p>UCSC Undergraduate / Postgraduate</p>
          </div>
        </div>

        <div className="container ">
          <div className="card-deck">
            {FeedArticles}
          </div>
        </div>

        <Footer />
      </div >
    );
  }
}
export default connect(mapStateToProps, { loadFeed })(Feed);



