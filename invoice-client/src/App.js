import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import InvoiceIndex from "./invoices/InvoiceIndex";
import PersonIndex from './persons/PersonIndex';
import PersonDetail from './persons/PersonDetail';
import InvoiceDetail from './invoices/InvoiceDetail';
import PersonForm from './persons/PersonForm';
import InvoiceForm from './invoices/InvoiceForm';
function App() {
  return (
    <Router>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand>Správa faktur</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar-nav'></Navbar.Toggle>
          <Navbar.Collapse id='navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link as={Link} to='/persons'>Osoby</Nav.Link>
              <NavDropdown title="Faktury">
                <NavDropdown.Item as={Link} to={"/invoices"} >Vystavené</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/invoices/saved"} >Uložené</NavDropdown.Item>
              </NavDropdown>
              {/*<Nav.Link href='/statistics'>Statistiky</Nav.Link>*/}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path='/' element={<Navigate to={"/persons"} />} />
          <Route path='/persons' element={<PersonIndex />} />
          <Route path='/persons/show/:id' element={<PersonDetail />} />
          <Route path='/persons/create' element={<PersonForm />} />
          <Route path='/persons/edit/:id' element={<PersonForm />} />

          <Route path='/invoices' element={<InvoiceIndex />} />
          <Route path='/invoices/saved' element={<InvoiceIndex viewSaved />} />
          <Route path='/invoices/show/:id' element={<InvoiceDetail />} />
          <Route path='/invoices/create' element={<InvoiceForm />} />
          <Route path='/invoices/edit/:id' element={<InvoiceForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
