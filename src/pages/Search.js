import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { BookList, BookListItem } from "../components/BookList";
import API from "../utils/API";
import { Container, Row, Col } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: ""})
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Google Books Search</h1>
          <h5>Search for and Save Books of Interest</h5>
        </Jumbotron>
      <Container fluid>
      <Col size="md-12">
            <div>
            <form>
                Book Search:
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search Book
              </FormBtn>
            </form>
            </div>
            </Col>
            <Row>
            <Col size="md-12">
              {!this.state.books.length ? (
                <h1 className="text-center">No Books To Display</h1>
              ) : (
                <BookList>
                  {this.state.books.map(books => {
                    return (
                      <BookListItem
                        key={books.title}
                        title={books.title}
                        author={books.author}
                        href={books.href}
                        synopsis={books.synopsis}
                        thumbnail={books.thumbnail}
                      />
                    );
                  })}
                </BookList>
              )}
            </Col>
          </Row>
      </Container>
      </div>
    );
  }
}

export default Books;