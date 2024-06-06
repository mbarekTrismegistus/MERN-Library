import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem} from "@nextui-org/navbar";
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Avatar, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header(){

    const navigate = useNavigate()

    function logout(){
      sessionStorage.clear()
      navigate(0)
      
    }

    return(
        <Navbar>
              <NavbarBrand>
                <p className="dark:text-white font-bold">Library</p>
              </NavbarBrand>
              <NavbarContent justify="end">
                <NavbarItem className="">
                  {sessionStorage.getItem("session") ? 
                  <Dropdown className="dark">
                    <DropdownTrigger>
                      <Avatar color="primary" isBordered/>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem>                 
                          <p className="dark:text-white">{JSON.parse(sessionStorage.getItem("session")).nom}</p>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to={"/"}>
                          <p className="dark:text-white">Home</p>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                          <Button color="danger" onClick={logout} className="dark:text-white">Logout</Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  :
                  <Button color="primary">Login</Button>
                  
                  }
                </NavbarItem>
              </NavbarContent>
        </Navbar>
    )

  }
