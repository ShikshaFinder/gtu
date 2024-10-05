"use client";

import * as React from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  IconButton,
  Spinner,
  Alert,
  AlertIcon,
  useInterval,  // Chakra UI useInterval
} from "@chakra-ui/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import supabase from "../../supabase";  // Assuming you have a supabase setup

export default function ImageCarousel() {
  const [slides, setSlides] = React.useState<
    { image: string; title: string; description: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch images from Supabase bucket
  const fetchImages = async () => {
    try {
      const { data, error } = await supabase.storage.from("slider2").list();

      if (error) throw error;

      if (data && data.length > 0) {
        const imageSlides = data.map((file) => ({
          image: supabase.storage.from("slider2").getPublicUrl(file.name).data
            .publicUrl,
          title: file.metadata?.title || "Default Title", // Add title if available in metadata
          description: file.metadata?.description || "Default Description", // Add description if available
        }));

        setSlides(imageSlides);
      } else {
        setError("No images found in the slider2 bucket.");
      }
    } catch (err) {
      setError("Error fetching images.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchImages();
  }, []);

  // Automatically move to the next slide every 3 seconds
  useInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, 3000); // Change slide every 3 seconds

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  if (loading) {
    return <Spinner size="xl" color="blue.500" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (slides.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        No slides to display.
      </Alert>
    );
  }

  return (
    <Box
      maxW={{ base: "sm", sm: "md", md: "lg", lg: "xl", xl: "2xl" }}
      mx="auto"
      py={4}
      position="relative"
    >
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
        Events By GTU Ventures
      </Text>

      <Box
        position="relative"
        borderRadius="md"
        overflow="hidden"
        height="400px"
      >
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={`<!-- wsrv.nl/lichtenstein.jpg -->
<img src="//wsrv.nl/?url=${slide.image}">`}
            alt={`Slide ${index + 1}`}
            objectFit="cover"
            width="100%"
            height="400px"
            position="absolute"
            top="0"
            left="0"
            transition="opacity 1s ease-in-out" // Smooth transition
            opacity={index === currentIndex ? 1 : 0}
          />
        ))}

        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="black"
          opacity="0.4"
          display="flex"
          flexDirection="column"
          justifyContent="end"
          alignItems="center"
          p={4}
        >
          <Text
            color="white"
            fontSize={{ base: "md", md: "lg", lg: "lg" }}
            as={"b"}
          >
            GTU Events
          </Text>
        </Box>

        {/* Arrows for large screens */}
        <IconButton
          aria-label="Previous Slide"
          icon={<AiOutlineLeft />}
          onClick={handlePrevious}
          variant="outline"
          position="absolute"
          top="50%"
          left="-50px" // Arrow positioned outside of the image
          transform="translateY(-50%)"
          zIndex="1"
        />
        <IconButton
          aria-label="Next Slide"
          icon={<AiOutlineRight />}
          onClick={handleNext}
          variant="outline"
          position="absolute"
          top="50%"
          right="-50px" // Arrow positioned outside of the image
          transform="translateY(-50%)"
          zIndex="1"
        />
      </Box>

      {/* Arrows for mobile view */}
      <Box
        display={{ base: "flex", lg: "none" }}
        justifyContent="space-between"
        mt={4}
      >
        <IconButton
          aria-label="Previous Slide"
          icon={<AiOutlineLeft />}
          onClick={handlePrevious}
          variant="outline"
        />
        <IconButton
          aria-label="Next Slide"
          icon={<AiOutlineRight />}
          onClick={handleNext}
          variant="outline"
        />
      </Box>
    </Box>
  );
}
