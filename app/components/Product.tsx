"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Link,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "../lib/store";
import { deleteResource, updateResource } from "../lib/slices/mainSlice";
import { useEffect, useState } from "react";
import AOS from "./AOS";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineUpdate } from "react-icons/md";
import { toastSuccess } from "./Toast";
import { SiNamecheap } from "react-icons/si";
import { IoMdPricetags } from "react-icons/io";
import { GiStockpiles } from "react-icons/gi";
import { CiLink } from "react-icons/ci";
// Define the interface for a Card
interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
}

export default function Product() {
  const dispatch = useDispatch();
  const { productDetails, updated } = useSelector((state) => state.products);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    setProducts(productDetails);
  }, []);

  useEffect(() => {
    setProducts(productDetails);
    console.log(productDetails);
  }, [updated]);

  const sortCheapest = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };

  const sortExpensive = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedProducts);
  };
  const sortLowStock = () => {
    const sortedProducts = [...products].sort((a, b) => a.stock - b.stock);
    setProducts(sortedProducts);
  };

  const sortHighStock = () => {
    const sortedProducts = [...products].sort((a, b) => b.stock - a.stock);
    setProducts(sortedProducts);
  };
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    stock: "",
    image: "",
  });
  function changeData(type: string, value: string | number) {
    setProduct((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }
  function setDefault(i: Product) {
    changeData("id", i?.id);
    changeData("name", i?.name);
    changeData("stock", i?.stock);
    changeData("price", i?.price);
    changeData("image", i?.image);
  }
  function save(id: string) {
    console.log(product);
    dispatch(updateResource(product));
    onClose();
    toastSuccess(`Success! ${product.name} has been updated.`);
  }

  return (
    <div>
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
                Edit Product
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <SiNamecheap className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Name"
                  value={product.name}
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
                  value={product.price}
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
                  value={product.stock}
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
                  value={product.image}
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
                <Button
                  color="primary"
                  onPress={() => {
                    save(product.id);
                  }}
                >
                  New
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="text-center p-10" data-aos="fade-down">
        <h1 className="font-bold text-4xl mb-4 dark:text-white">Welcome</h1>
        <h1 className="text-xl dark:text-white">
          Step into a world of immersive 3D experiences with our cutting-edge
          product lineup.
        </h1>
      </div>
      {/* Search input */}
      <div
        className="flex justify-center gap-x-5 items-center mx-5"
        data-aos="fade-left"
      >
        <div className="relative w-[50vw]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full h-10 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Product Name ..."
            value={query}
            onChange={(e: any) => {
              setQuery(e.target.value.toLowerCase());
            }}
          />
        </div>
        <Dropdown className="w-full text-black dark:text-white bg-black">
          <DropdownTrigger>
            <Button
              variant="bordered"
              startContent={<FaFilter />}
              className="bg-black"
            >
              Filter
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
            <DropdownItem key="Lowest Stock" onPress={sortLowStock}>
              Sort by Lowest Stock
            </DropdownItem>
            <DropdownItem key="Highest Stock" onPress={sortHighStock}>
              Sort by Highest Stock
            </DropdownItem>
            <DropdownItem key="Cheapest" onPress={sortCheapest}>
              Sort by Cheapest
            </DropdownItem>
            <DropdownItem key="edit" onPress={sortExpensive}>
              Sort by Most Expensive
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products.length > 0 &&
          products
            .filter(
              (i) =>
                !query || i.name.toLowerCase().includes(query.toLowerCase())
            )
            .map((i: any, index: number) => (
              <AOS key={i.name}>
                <div
                  className="w-62 h-96 bg-white text-black dark:bg-slate-900 dark:text-white shadow-md rounded-xl shadow-gray-400 dark:shadow-gray-600 dark:hover:shadow-gray-400 hover:shadow-gray-600 duration-250  hover:scale-105 hover:shadow-xl hover:cursor-pointer
                    text-center flex justify-center flex-col items-center align-middle"
                  // onClick={() => {
                  //   router.push(`/user/products/${i._id}`);
                  // }}
                >
                  <img
                    src={i?.image}
                    alt="Product"
                    className="h-48 w-48 object-cover rounded-t-xl"
                  />
                  <div className="px-4 py-3 w-72">
                    <span className="text-gray-400 mr-3 uppercase text-xs">
                      New
                    </span>
                    <p className="text-lg font-bold truncate block capitalize">
                      {i?.name}
                    </p>
                    <p className="text-lg font-semibold  cursor-auto my-3">
                      Stock : {i?.stock}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold  cursor-auto my-3">
                        Rp.{i?.price}
                      </p>
                      <del>
                        <p className="text-sm text-gray-600 dark:text-white cursor-auto ml-2">
                          {i?.price * 1.5}
                        </p>
                      </del>

                      <Dropdown className="w-full text-black dark:text-white bg-black">
                        <DropdownTrigger>
                          <Button
                            variant="bordered"
                            startContent={<AiTwotoneThunderbolt />}
                            className="bg-black"
                          >
                            Action
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          variant="faded"
                          aria-label="Dropdown menu with icons"
                        >
                          <DropdownItem
                            key="Delete"
                            className="ml-auto hover:text-red-600 duration-500"
                            onPress={() => {
                              dispatch(deleteResource(i));
                              toastSuccess(
                                `Success! ${i?.name} deleted to product.`
                              );
                            }}
                          >
                            <span className="flex justify-around">
                              Delete <MdDeleteOutline className="text-2xl" />
                            </span>
                          </DropdownItem>
                          <DropdownItem
                            className="ml-auto hover:text-yellow-600 duration-500"
                            onPress={() => {
                              onOpen();
                              setDefault(i);
                            }}
                          >
                            <span className="flex justify-around">
                              Edit <MdOutlineUpdate className="text-2xl" />
                            </span>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </AOS>
            ))}
      </div>
    </div>
  );
}
