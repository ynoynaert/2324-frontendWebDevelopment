import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Text,
} from "@chakra-ui/react";
import { IoMoonSharp, IoSunny } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth.context";
import useSWR from "swr";
import { getById } from "../api";
import AsyncData from "./AsyncData";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthed } = useAuth();
  const userID = localStorage.getItem("userID");
  const {
    data: user = {},
    error: userError,
    isLoading: userLoading,
  } = useSWR(userID ? `users/${userID}` : null, getById);

  return (
    <>
      <Box
        bg={useColorModeValue("gray.200", "gray.700")}
        px={4}
        position="sticky"
        top={0}
        zIndex="999"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={2}>
            <Image
              src={"/images/youna.ico"}
              alt={"VINYLCOLLECTION"}
              width={30}
            />
            <Link to={"/"}>Home</Link>
            <Link to={"/collection"}>Your Collections</Link>
            <Link to={"/vinyl/all"}>All Vinyls</Link>
            <Link to={"/vinyl/add"}>Add Vinyl</Link>
            <Link to={"/collection/add"}>Add Collection</Link>
          </Stack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoonSharp /> : <IoSunny />}
              </Button>
              {isAuthed ? (
                <AsyncData loading={userLoading} error={userError}>
                  <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} name={user.name} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"2xl"} name={user.name} />
                    </Center>
                    <br />
                    <Center><Text fontSize="xl">{user.name}</Text></Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>
                      <Link to={"/user/edit"}>Profile</Link>
                    </MenuItem>
                    <MenuItem href={"#"}>
                      <Link to={"/logout"}> Logout</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
                </AsyncData>
                
              ) : (
                <>
                  <Button>
                    <Link to={"/login"}>Login</Link>
                  </Button>
                  <Button>
                    <Link to={"/register"}>Register</Link>
                  </Button>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
