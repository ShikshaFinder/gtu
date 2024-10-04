import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Link,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import ImageCarousel from "../components/slider"
import {
  FiMenu,
  FiBriefcase,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import StartupStats from "./StartupStats";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import supabase from "../../supabase";

export default function Component() {
  const toast = useToast(); // Initialize useToast
  const { register, handleSubmit, reset } = useForm(); // Initialize react-hook-form

  const onSubmit = async (data: any) => {
    console.log(data); // Log form data
  
    // Insert data into Supabase
    const { error } = await supabase
      .from('contactus') // Name of your table
      .insert([
        { name: data.name, email: data.email, message: data.message },
      ]);
  
    if (error) {
      console.error('Error inserting data:', error.message);
      toast({
        title:error.message,
        description: "There was an issue sending your message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      // Show success toast
      toast({
        title: "Form Submitted.",
        description: "Your message has been sent successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
      // Reset form after submission
      reset();
    }
  };

  return (
    <Flex direction="column" minH="100vh">
      <Box as="header" bg="purple.600" color="white" boxShadow="md">
  <Flex align="center" justify="space-between" px={{ base: 4, md: 8, lg: 12 }} py={4}>
    <Link href="#" display="flex" alignItems="center" gap={2}>
      <Icon as={FiTwitter} boxSize={6} />
      <Heading as="span" size="lg" fontWeight="bold">
        GTU Ventures
      </Heading>
    </Link>
    <Flex display={{ base: "none", md: "flex" }} gap={6} align="center">
      <Link href="#" fontWeight="semibold" _hover={{ color: "purple.300" }}>
        About Us
      </Link>
      <Link href="#" fontWeight="semibold" _hover={{ color: "purple.300" }}>
        Our Services
      </Link>
      <Link href="#" fontWeight="semibold" _hover={{ color: "purple.300" }}>
        Contact Us
      </Link>
    </Flex>
    <Button variant="outline" display={{ base: "flex", md: "none" }}>
      <Icon as={FiMenu} boxSize={6} />
    </Button>
  </Flex>
</Box>


      <Box as="main" flex="1">
        {/* Hero Section */}
        <Box bg="purple.500" color="white" py={{ base: 12, md: 36, lg: 31 }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            gap={8}
            px={{ base: 8, md: 95 }}
          >
            <Box flex="1">
              <Heading as="h1" size="2xl" fontWeight="bold">
                Empowering Entrepreneurs
              </Heading>
              <Text fontSize="lg" mt={4}>
                GTU Ventures provides investment, advisory, and consulting
                services to help startups and small businesses succeed.
              </Text>

              <Button mt={6} colorScheme="whiteAlpha">
                Get Started
              </Button>
            </Box>
            <Box flex="1" maxW={{ base: "100%", md: "600px" }}>
              <Image
                src="/incubation.jpeg"
                alt="GTU Ventures"
                rounded="lg"
                objectFit="cover"
                width="100%"
                height="auto"
              />
            </Box>
          </Flex>
        </Box>

        {/* Image Carousel Section */}

        <ImageCarousel />
        
        {/* Startup Stats Section */}
        <StartupStats />



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
                About Us
              </Heading>
              <Text mt={4}>
                GTU Ventures is a leading investment and consulting firm
                dedicated to helping entrepreneurs and small businesses succeed.
              </Text>
              <Text mt={4}>
                Our mission is to empower entrepreneurs and drive innovation by
                providing access to capital, strategic guidance, and industry
                expertise.
              </Text>
              <Text mt={4}>
                Our mission is to empower entrepreneurs and drive innovation by
                providing access to capital, strategic guidance, and industry
                expertise.
              </Text>
            </Box>
            <Image
              src="/img.webp"
              alt="GTU Ventures"
              rounded="lg"
              objectFit="cover"
              width={{ base: "100%", md: "600px" }}
              height="auto"
            />
          </Flex>
        </Box>

        {/* Services Section */}
        <Box id="services" bg="gray.100" py={{ base: 12, md: 24, lg: 32 }}>
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
        </Box>

        {/* Contact Section */}
        <Box id="contact" py={{ base: 12, md: 24, lg: 32 }}>
          <Box textAlign="center" px={{ base: 8, md: 95 }}>
            <Heading as="h2" size="xl" fontWeight="bold">
              Contact Us
            </Heading>
            <Flex direction={{ base: "column", md: "row" }} gap={8} mt={8}>
              <Box bg="white" shadow="sm" p={6} rounded="lg" flex="1">
                <VStack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    placeholder="Name"
                    {...register("name", { required: "Name is required" })} // Register the input with validation
                  />
                  <Input
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })} // Register the input with validation
                  />
                  <Textarea
                    placeholder="Message"
                    rows={4}
                    {...register("message", { required: "Message is required" })} // Register the textarea with validation
                  />
                  <Button type="submit" colorScheme="purple" width="full">
                    Submit
                  </Button>
                </VStack>
              </Box>
              <Box bg="white" shadow="sm" p={6} rounded="lg" flex="1">
                <Heading as="h3" size="lg">
                  GTU Ventures
                </Heading>
                <Text mt={4}>123 Main Street, Anytown USA</Text>
                <Text mt={2}>Phone: (123) 456-7890</Text>
                <Text mt={2}>Email: info@gtuventures.com</Text>
                <Heading as="h3" size="lg" mt={8}>
                  Follow Us
                </Heading>
                <Flex mt={4} gap={4} justify="center">
                  <Link href="#">
                    <Icon as={FiTwitter} boxSize={6} />
                  </Link>
                  <Link href="#">
                    <Icon as={FiLinkedin} boxSize={6} />
                  </Link>
                  <Link href="#">
                    <Icon as={FiInstagram} boxSize={6} />
                  </Link>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>

      <Box as="footer" bg="gray.100" py={6} color="gray.600">
        <Flex justify="space-between" px={4}>
          <Text>&copy; 2024 GTU Ventures. All rights reserved.</Text>
          <Flex gap={4}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

const ServiceCard = ({ icon, title, description }: { icon: any; title: string; description: string; }) => (
  <Box
    bg="white"
    shadow="md"
    rounded="lg"
    p={6}
    maxW={{ base: "300px", sm: "400px" }}
    textAlign="center"
  >
    <Icon as={icon} boxSize={8} color="purple.500" />
    <Heading as="h3" size="lg" mt={4}>
      {title}
    </Heading>
    <Text mt={2}>{description}</Text>
  </Box>
);
