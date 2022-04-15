import React, { useEffect, useState } from "react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	Input,
	useDisclosure,
	Text,
	Box,
	Container,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { ChevronRightIcon, SearchIcon } from "@chakra-ui/icons";

const SideBar = ({ setLongitude, setLatitude, setZoom, setPinPoint }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

	const [place, setPlace] = useState("");
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		fetch(
			`https://barikoi.xyz/v1/api/search/autocomplete/MzEwMTpIQ1ROQ0FNUVBT/place?q=${place}`
		)
			.then((res) => res.json())
			.then((data) => {
				setPlaces(data.places);
			})
			.catch((err) => console.log(err));
	}, [place]);

	return (
		<>
			<IconButton
				ref={btnRef}
				onClick={onOpen}
				aria-label='Search database'
				icon={<ChevronRightIcon />}
				colorScheme='teal'
			/>
			<Drawer
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				finalFocusRef={btnRef}
				size={"lg"}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						<Box d='flex'>
							<Text fontSize='2xl'>Bari</Text>
							<Text fontSize='2xl' color='tomato'>
								koi
							</Text>
						</Box>
					</DrawerHeader>

					<DrawerBody>
						<Input
							placeholder='Search location'
							onChange={(e) => setPlace(e.target.value)}
							value={place}
							mb={2}
						/>
						<Container maxW='container.sm' h='300px' _hidden>
							{places?.map((place, i) => (
								<Box
									key={i}
									w='100%'
									p={4}
									color='black'
									borderRadius='md'
									border='1px'
									borderColor='gray.200'
									_hover={{ cursor: "pointer" }}
								>
									<Text
										onClick={() => {
											console.log(place);
											setPinPoint(place);
											setLongitude(place.longitude);
											setLatitude(place.latitude);
											setZoom(17);
										}}
									>
										{place.address}
									</Text>
								</Box>
							))}
						</Container>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default SideBar;
