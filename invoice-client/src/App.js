import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import InvoiceIndex from "./invoices/InvoiceIndex";
import PersonIndex from './persons/PersonIndex';
import PersonDetail from './persons/PersonDetail';
import InvoiceDetail from './invoices/InvoiceDetail';
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
              <Nav.Link as={Link} to='/invoices'>Faktury</Nav.Link>
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

          <Route path='/invoices' element={<InvoiceIndex />} />
          <Route path='/invoices/show/:id' element={<InvoiceDetail />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
