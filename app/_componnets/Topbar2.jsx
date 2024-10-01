import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { UseGlobalState } from "../Context/GlobalContext";
import { usePathname } from "next/navigation.js";

export default function App() {
  const { user } = UseGlobalState();
  const path = usePathname();
  console.log(path);
  const menuItems = [
    "Profile",
    "Contacts",
    "Chats",
    user ? "" : "Login",
    user ? "" : "Regester",
  ];
  const router = useRouter();
  return (
    <Navbar isBordered maxWidth="full">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
        </NavbarBrand>
        <NavbarItem>
          <Link
            color={path === "/Profile" ? "danger" : "primary"}
            href="/Profile"
          >
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            href="/Contacts"
            color={path === "/Contacts" ? "danger" : "primary"}
          >
            Contacts
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color={path === "/Chats" ? "danger" : "primary"} href="/Chats">
            Chats
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {!user ? (
          <NavbarItem className="hidden lg:flex">
            <Link href="/Login">Login</Link>
          </NavbarItem>
        ) : (
          <NavbarItem></NavbarItem>
        )}
        <NavbarItem>
          {user ? (
            <img
              src={!user ? "/assets/person.jpg" : user.profileimg}
              alt="profile img"
              sx={{ cursor: "pointer" }}
              className="w-11 h-11 rounded-full object-cover object-center"
              onClick={() => {
                router.push("/Profile");
              }}
            />
          ) : (
            <Button as={Link} color="warning" href="#" variant="flat">
              Sign Up
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              href={`/${item}`}
              size="lg"
              color={`/${item}` === path ? "danger" : "primary"}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        {user ? <Button color="danger"> log out</Button> : <></>}
      </NavbarMenu>
    </Navbar>
  );
}
