"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { SiNamecheap } from "react-icons/si";
import { IoMdPricetags } from "react-icons/io";
import { GiStockpiles } from "react-icons/gi";
import { CiLink } from "react-icons/ci";
import { useDispatch } from "../lib/store";
import { addResource } from "../lib/slices/mainSlice";
import { toastSuccess } from "./Toast";
import { randomUUID } from "crypto";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const menuItems = ["Home", "Add Product"];
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  function save() {
    changeData("id", generateUUID());
    dispatch(addResource(product));
    onClose();
    toastSuccess(`Success! ${product.name} added to product.`);
  }

  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    stock: "",
    image: "",
  });
  function changeData(type: string, value: string) {
    setProduct((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">Test</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link href="/" aria-current="page">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link onPress={onOpen} aria-current="page">
              Add Product
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/pokemon" aria-current="page">
              Pokemon List
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem>
            <Link color={"primary"} className="w-full" href="/" size="lg">
              Home
            </Link>
            <Link
              color={"primary"}
              className="w-full"
              onPress={onOpen}
              size="lg"
            >
              Add Product
            </Link>
            <Link
              color={"primary"}
              className="w-full"
              href="/pokemon"
              size="lg"
            >
              Pokemon List
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent className="bg-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Product
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <SiNamecheap className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Name"
                  placeholder="Enter Name"
                  variant="bordered"
                  onChange={(e) => {
                    changeData("name", e.target.value);
                  }}
                />
                <Input
                  endContent={
                    <IoMdPricetags className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Price"
                  placeholder="Enter Price"
                  variant="bordered"
                  onChange={(e) => {
                    changeData("price", e.target.value);
                  }}
                />
                <Input
                  endContent={
                    <GiStockpiles className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  placeholder="Enter Stock"
                  label="Stock"
                  variant="bordered"
                  onChange={(e) => {
                    changeData("stock", e.target.value);
                  }}
                />
                <Input
                  endContent={
                    <CiLink className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Image Link"
                  placeholder="Enter Image Link"
                  variant="bordered"
                  onChange={(e) => {
                    changeData("image", e.target.value);
                  }}
                />
                {/* <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={save}>
                  New
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
