import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
  render() {
    return (
      // <Navbar>
      //   <Navbar.Header>
      //     <Navbar.Brand>
      //       <a href="#">Timesheets</a>
      //     </Navbar.Brand>
      //     <Navbar.Toggle />
      //   </Navbar.Header>
      //   <Nav>
      //     <NavDropdown eventKey={1} title="Months" id="basic-nav-dropdown">
      //       {this.state.months.map(month => (
      //         <LinkContainer to={`/months/${month._id}`}>
      //           <MenuItem eventKey={1.1}>{month.name}</MenuItem>
      //         </LinkContainer>
      //       ))}
      //     </NavDropdown>
      //   </Nav>
      // </Navbar>
      <div>
        <h1>Timesheets</h1>
      </div>
    );
  }
}

ReactDOM.render(<Main name="russell" />, document.getElementById('main'));