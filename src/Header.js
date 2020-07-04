import React,{useState} from 'react'

import {
    Navbar,
    NavbarBrand, //Logo
    Collapse,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler
  } from 'reactstrap'

  import {Link} from 'react-router-dom'
  
  
  const Header = ()=>{
  
    const [open,setOpen]= useState(false)
  
    const toggle = ()=>{
      setOpen(!open)
    }
  
    return(
        <div>
          <Navbar color='light' light expand='md'>
            <NavbarBrand tag = {Link} to = '/' >Minhas Series</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={open} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink tag={Link} to='/genres'>Genêros</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    )
  
  }

  export default Header