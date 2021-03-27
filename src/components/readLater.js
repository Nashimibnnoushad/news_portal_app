import React from "react";
import {
    Container, Row, Col, FormGroup, Label, Button, Form, Card, CardBody, ListGroup,
    ListGroupItem,
    CardHeader,
} from "reactstrap";
import '../styles/app.css';
import NavBar from './navBar'
import ReactPaginate from "react-paginate";
import '../styles/react-paginate.scss'

class ReadLater extends React.Component {
    state = {
        loading: false,
        articleList: null
    }


    componentDidMount = () => {
        this.setState({loading : false})
        let datalist =  JSON.parse(localStorage.getItem("readLaterList"))
        this.setState({
            articleList : datalist,
            loading: true
        })
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

      remove = (data, index) => {
        if(data){
            let datalist =  JSON.parse(localStorage.getItem("readLaterList"))
            if(datalist === null){
                datalist = []
                datalist.splice(index, 1)
                localStorage.setItem("readLaterList", JSON.stringify(datalist));
                var array = [...this.state.articleList];
                array.splice(index, 1);
                this.setState({articleList : array})
            }
            else {
                    datalist.splice(index, 1)
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
                <Container>
                    <h1 className="header">News Portal App</h1>
                    <NavBar />
                    {this.state.loading === false &&
                        <h5 className="loader">Loading... Please Wait!</h5>
                    }
                    {this.state.loading === true &&
                        <Row>
                            <Col lg="12" md="12" sm="12">
                                <Row id='article'>
                                    {(this.state.articleList && this.state.articleList.length > 0) &&
                                        this.state.articleList.map((value, index) =>

                                            <Col lg="4" md="4" sm="12">
                                                <Card key={index}>
                                                    <CardHeader>
                                                        <a href={value.url} target="_blank">{value.section}</a>
                                                        <a className="readLater" onClick={()=> this.remove(value,index)}>Remove</a>
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


export default ReadLater