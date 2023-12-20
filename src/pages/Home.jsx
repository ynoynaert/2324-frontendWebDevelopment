import { Stack, Image, Heading, Text, Card, CardBody, Divider } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Card className="page-width">
        <CardBody>
          <Image
            src={"/images/homepagina.jpg"}
            alt="recordshop"
            borderRadius="lg"
            margin={"auto"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Welcome to your vinyl vault!</Heading>
            <Text>
              Vinyl collecting is more than a hobby. It is a journey steeped in
              nostalgia and passion. Each record tells a story beyond its
              tracks, from its vibrant album art to the tactile joy of holding
              it. The hunt for rare finds and the sense of community among
              collectors add layers of excitement. Playing a vinyl record
              becomes a ritual, an immersive experience that connects the
              listener deeply to the music. In a digital age, vinyl offers a
              slower, more deliberate way to appreciate music, celebrating both
              artistry and history in a tangible form.
            </Text>
            <Divider />
            <Heading size="md">About this app</Heading>
            <Text>
              This app is a tool to help you keep track of your vinyl records
              and collections. You can add, edit and delete records and
              collections. You can also add records to collections and remove
              them from collections. <br />
              <strong>You must log in to use this app. If you
              do not have an account yet, you can register.</strong>
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
