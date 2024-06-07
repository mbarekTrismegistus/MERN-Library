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
                <Link className="dark:text-white font-bold" to={"/"}>MS Library</Link>
              </NavbarBrand>
              <NavbarContent justify="end">
                <NavbarItem>
                  {sessionStorage.getItem("session") ? 
                  <Dropdown className="dark">
                    <DropdownTrigger>
                      <Avatar src={JSON.parse(sessionStorage.getItem("session")).image} color="primary" isBordered/>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem>                 
                          <p className="dark:text-white font-bold text-2xl">{JSON.parse(sessionStorage.getItem("session")).username}</p>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to={"/"}>
                          <p className="dark:text-white">Home</p>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to={"/addbook"}>
                          <p className="dark:text-white">Add a Book</p>
                        </Link>
                      </DropdownItem>
                      <DropdownItem color="danger" variant="flat" className="text-danger" onClick={logout} >
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  :
                  <div>
                    <Button color="primary" as={Link} className="mx-2" to="/login" radius="full" variant="shadow">Login</Button>
                    <Button color="primary" as={Link} className="mx-2" to="/registre" radius="full" variant="flat">Registre</Button>
                  </div>
                  
                  }
                </NavbarItem>
              </NavbarContent>
        </Navbar>
    )

  }
