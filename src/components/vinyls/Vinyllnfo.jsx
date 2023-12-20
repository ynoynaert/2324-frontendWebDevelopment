import {
  Stack,
  Image,
  Heading,
  Text,
  Card,
  CardBody,
  Divider,
} from "@chakra-ui/react";

export default function VinylInfo({ vinyl, collection }) {
  return (
    <>
      <Card className="page-width">
        <CardBody>
          <Image
            data-cy="vinyl_detail_image"
            width="300px"
            src={vinyl.plaatImageURL}
            alt={vinyl.album}
            borderRadius="lg"
            margin={"auto"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" data-cy="vinyl_detail_heading_album_artiest">
              {vinyl.album} - {vinyl.artiest}
            </Heading>
            <Divider />
            <Text data-cy="vinyl_detail_collection">
              <strong>Collection: </strong>
              {collection.name}
            </Text>
            {/* <Text>VOEG NOG TOE: genre, release date, label</Text> */}
            <Text color="blue.600" fontSize="2xl" data-cy="vinyl_detail_color">
              {vinyl.kleur}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
