import React from "react";
import {
    Container, Row, Col, FormGroup, Label, Button, Form, Card, CardBody, ListGroup,
    ListGroupItem,
    CardHeader,
} from "reactstrap";
import '../styles/app.css';
import NavBar from './navBar'
import { connect } from "react-redux"
import { getSectionList, getArticleList } from '../redux/actions/index'
import classnames from "classnames"
import ReactPaginate from "react-paginate";
import '../styles/react-paginate.scss'
import scrollTo from 'gatsby-plugin-smoothscroll';

class Home extends React.Component {
    state = {
        loading: false,
        activeList: 1,
        articleList: null
    }


    componentDidMount = () => {
        if (this.props.NewsPortalList && !this.props.NewsPortalList.sectionList && !this.props.NewsPortalList.articleList) {
            this.props.getSectionList().then(() => {
                this.props.getArticleList().then(() => {
                    this.setState({
                        loading: true,
                        activeList: this.props.NewsPortalList && this.props.NewsPortalList.sectionList[0].display_name
                    })
                    this.GetArticle(this.props.NewsPortalList && this.props.NewsPortalList.sectionList[0].display_name)
                })
            })
        }
        else {
            this.setState({ loading: true })
        }

    }

    GetArticle = (data) => {
        if (this.state.activeList !== data) {
            this.setState({ activeList: data })
        }
        let articleList = this.props.NewsPortalList.articleList.filter((value) => value.section === data)
        this.setState({ articleList: articleList })
        scrollTo('#article')
    }

     handlePageCount = () => {
        let list = this.state.articleList && this.state.articleList || []
        var pageCount = Math.ceil(parseInt(list.length) / 10);
        return pageCount;
      }
    
       onPageChange = (currentPage) => {
        let start = currentPage.selected * 10;
        let end = start + 10;
        let page_Data = this.state.articleList.slice(start, end)
        this.setState({articleList: page_Data})
      }

      readLater = (data, index) => {
        if(data){
            let datalist =  JSON.parse(localStorage.getItem("readLaterList"))
            if(datalist === null){
                datalist = []
                datalist.push(data)
                localStorage.setItem("readLaterList", JSON.stringify(datalist));
                var array = [...this.state.articleList];
                array.splice(index, 1);
                this.setState({articleList : array})
            }
            else {
                    datalist.push(data)
                    localStorage.setItem("readLaterList", JSON.stringify(datalist));
                    var array = [...this.state.articleList];
                    array.splice(index, 1);
                    this.setState({articleList : array})
            }

        }
      }




    render() {
        return (
            <>
                <Container id='article'>
                    <h1 className="header">News Portal App</h1>
                    <NavBar />
                    {this.state.loading === false &&
                        <h5 className="loader">Loading... Please Wait!</h5>
                    }
                    {this.state.loading === true &&
                        <Row>
                            <Col lg="3" md="9" sm="12">
                                <Card>
                                    <CardHeader>
                                        Articles
                                    </CardHeader>
                                    <CardBody >
                                        <ListGroup tag="div">
                                            {(this.props.NewsPortalList && this.props.NewsPortalList.sectionList && this.props.NewsPortalList.sectionList.length > 0) &&
                                                this.props.NewsPortalList.sectionList.map((value, index) =>
                                                    <ListGroupItem key={index}
                                                        className={`${this.state.activeList === value.display_name
                                                            ? "active"
                                                            : "notactive"
                                                            }`}
                                                        onClick={() => this.GetArticle(value.display_name)}>
                                                        {value.display_name}
                                                    </ListGroupItem>
                                                )
                                            }
                                        </ListGroup>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="9" md="9" sm="12">
                                <Row >
                                    {(this.state.articleList && this.state.articleList.length > 0) &&
                                        this.state.articleList.map((value, index) =>

                                            <Col lg="6" md="6" sm="12">
                                                <Card key={index}>
                                                    <CardHeader>
                                                        <a href={value.url} target="_blank">{value.section}</a>
                                                            <a className="readLater" onClick={()=> this.readLater(value,index)}>Read Later</a>
                                                    </CardHeader>
                                                    <CardBody>
                                                        {value.thumbnail_standard &&
                                                            <img src={value.thumbnail_standard}></img>
                                                        }
                                                        <p>{value.abstract}</p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>
                                {(this.state.articleList && this.state.articleList.length === 0) &&
                                    <Card>
                                        <CardHeader>
                                            There are no records to display
                                            </CardHeader>
                                    </Card>
                                }

                                {this.state.articleList && this.state.articleList.length > 0 ?
                                    <Row>
                                        <Col>
                                            <ReactPaginate
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={"..."}
                                                breakClassName={"break-me"}
                                                pageCount={this.handlePageCount()}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={3}
                                                containerClassName={"vx-pagination icon-pagination pagination-end mt-2"}
                                                activeClassName={"active"}
                                                onPageChange={this.onPageChange}
                                            />
                                        </Col>
                                    </Row>
                                    :
                                    null}
                            </Col>

                        </Row>
                    }

                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        NewsPortalList: state.NewsPortalList
    }
}

export default connect(mapStateToProps, {
    getSectionList, getArticleList
})(Home)