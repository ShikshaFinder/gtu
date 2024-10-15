import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import StartupSupport from "../components/support";
import Link from "next/link";
import ImageCarousel from "../components/slider";
import { FiBriefcase } from "react-icons/fi";
import StartupStats from "../components/StartupStats";
import CircularsList from "../components/circulars";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import supabase from "../../supabase";
import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
// import PreLoader from "../components/pre";

export default function Component() {
  const toast = useToast(); // Initialize useToast
  const { register, handleSubmit, reset } = useForm(); // Initialize react-hook-form

  const onSubmit = async (data: any) => {
    // Insert data into Supabase
    const { error } = await supabase
      .from("contactus") // Name of your table
      .insert([{ name: data.name, email: data.email, message: data.message }]);

    if (error) {
      toast({
        title: "Error",
        description: error.message || "There was an issue sending your message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      // Show success toast
      toast({
        title: "Form Submitted",
        description: "Your message has been sent successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form after submission
      reset();
    }
  };

  // const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsVisible(false);
  //   }, 3500);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <NextSeo
        title="GTU Ventures"
        description="GTU Ventures is a government entity associated with AiC GISC, GISC GTU & DIC GTU"
        openGraph={{
          url: "https://gtuventures.com",
          title: "GTU Ventures",
          description:
            "GTU Ventures is a government entity associated with AiC GISC, GISC GTU & DIC GTU",
          images: [
            {
              url: "https://gtu-e09.pages.dev/hihb.png",
              alt: "GTU Ventures",
            },
          ],
          site_name: "gtuventures.com",
          type: "website",
        }}
      />

      {/* {isVisible && <PreLoader />} */}

      <Flex direction="column" minH="100vh">
        <Box as="main" flex="1">
          {/* Hero Section */}
          <Box
            position="relative"
            height="100vh"
            width="full"
            overflow="hidden"
          >
            <Image
              src="/about-aic-gisc.png"
              alt="Modern startup incubator hallway"
              position="absolute"
              inset="0"
              objectFit="cover"
              width="full"
              height="full"
            />
            <Box position="absolute" inset="0" bg="blue.600" opacity="0.3" />
            <Flex
              position="relative"
              zIndex="10"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="full"
              textAlign="center"
              color="white"
              px={4}
            >
              <Heading
                size={{ base: "2xl", md: "4xl" }}
                fontWeight="bold"
                mb={4}
              >
             Innovate2Impact
              </Heading>
              <Text fontSize={{ base: "lg", md: "xl" }} mb={8} maxW="3xl">
                Unlock the full potential of your startup with GTU Ventures!
              </Text>
              <Button
                bg="purple.500"
                _hover={{ bg: "blue.300" }}
                color="white"
                fontWeight="bold"
                py={3}
                px={6}
                borderRadius="full"
                fontSize="lg"
                as={Link}
                href="/startupform"
                mt={6}
                colorScheme="whiteAlpha"
                target="_blank"
              >
                Apply Now
              </Button>
            </Flex>
          </Box>

          {/* Startup Stats Section */}
          <StartupStats />

          {/* Image Carousel Section */}

          {/* About Us Section */}
          <Box id="about" py={{ base: 12, md: 24, lg: 32 }}>
            <Flex
              direction={{ base: "column", md: "row" }}
              align="center"
              gap={6}
              px={{ base: 8, md: 95 }}
            >
              <Box flex="1">
                <Heading as="h2" size="xl" fontWeight="bold">
                  GTU Ventures
                </Heading>
                <Text mt={4}>
                  GTU Ventures is a leading investment and consulting firm
                  dedicated to helping entrepreneurs and small businesses
                  succeed.
                </Text>
                <Text mt={4}>
                  Our mission is to empower entrepreneurs and drive innovation
                  by providing access to capital, strategic guidance, and
                  industry expertise.
                </Text>
                <Text mt={4}>
                  Vision is to be the leading Incubator Center in the nation
                  promoting entrepreneurship and creating innovative ideas to
                  transform education, projects, and present them into
                  successful business opportunities.
                </Text>
                <b>Register Today & Get Benefites of GTU Ventures !</b>
              </Box>
              <Image
                src="/incub12.jpeg"
                alt="GTU Ventures"
                rounded="lg"
                objectFit="cover"
                width={{ base: "100%", md: "500px" }}
                height="auto"
              />
            </Flex>
          </Box>

          <ImageCarousel />
          {/* Services Section */}
          {/* <Box id="services" bg="gray.100" py={{ base: 12, md: 24, lg: 32 }}>
            <Box textAlign="center" px={4}>
              <Heading as="h2" size="xl" fontWeight="bold">
                Our Services
              </Heading>
              <Flex mt={8} gap={8} justify="center" wrap="wrap">
                <ServiceCard
                  icon={FiBriefcase}
                  title="Investment Management"
                  description="Our investment management services help clients achieve their financial goals through strategic portfolio allocation."
                />
                <ServiceCard
                  icon={FiBriefcase}
                  title="Venture Capital"
                  description="We provide venture capital funding and strategic guidance to help startups and early-stage companies scale."
                />
                <ServiceCard
                  icon={FiBriefcase}
                  title="Business Consulting"
                  description="Our business consulting services help clients optimize operations, improve efficiency, and navigate challenges."
                />
              </Flex>
            </Box>
          </Box> */}

          <StartupSupport />
          <br />
          {/* Circulars and Reports */}
          <CircularsList />

          {/* Contact Us Section */}
          <Box id="contact" py={{ base: 12, md: 24, lg: 32 }}>
            <Box textAlign="center" px={{ base: 8, md: 95 }}>
              <Heading as="h2" size="xl" fontWeight="bold">
                Contact Us
              </Heading>
              <Flex direction={{ base: "column", md: "row" }} gap={8} mt={8}>
                <Flex
                  display={{ base: "none", md: "flex" }}
                  flex="1"
                  justify="center"
                  align="center"
                >
                  <Box flex="1" maxW={{ base: "100%", md: "450px" }}>
                    <Image
                      src="/contact.jpeg"
                      alt="GTU Ventures"
                      rounded="lg"
                      objectFit="cover"
                      width="100%"
                      height="auto"
                    />
                  </Box>
                </Flex>
                <Box bg="white" shadow="sm" p={6} rounded="lg" flex="1">
                  <VStack
                    as="form"
                    spacing={4}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Input
                      placeholder="Name"
                      {...register("name", { required: "Name is required" })}
                    />
                    <Input
                      placeholder="Email / Mobile Number"
                      {...register("email", { required: "Email is required" })}
                    />
                    <Textarea
                      placeholder="Message"
                      rows={4}
                      {...register("message", {
                        required: "Message is required",
                      })}
                    />
                    <Button type="submit" colorScheme="purple" width="full">
                      Submit
                    </Button>
                  </VStack>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

// ServiceCard Component
const ServiceCard = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <Box
    bg="white"
    shadow="md"
    rounded="lg"
    p={6}
    maxW={{ base: "300px", sm: "400px" }}
    textAlign="center"
  >
    <Icon as={icon} w={12} h={12} mb={4} color="blue.500" />
    <Heading as="h3" size="md" fontWeight="bold" mb={2}>
      {title}
    </Heading>
    <Text>{description}</Text>
  </Box>
);
