import { memo, useCallback } from "react";
import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default memo(function Vinyl({
  id,
  artiest,
  album,
  kleur,
  plaatImageURL,
  onDelete,
}) {
  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <Card
      data-cy="vinyl"
      key={id}
      direction={{ base: "column", sm: "row" }}
      minW={{ base: "100%", sm: "100%" }}
      overflow="hidden"
    >
      <Image
        data-cy="vinyl_image"
        objectFit="cover"
        maxH={{ base: "100%", sm: "200px" }}
        maxW={{ base: "100%", sm: "200px" }}
        src={plaatImageURL}
        alt={album}
        borderRadius="lg"
      />
      <Stack>
        <CardHeader>
          <Heading as="h3" size="lg" data-cy="vinyl_heading_album_artiest">
            {album} - {artiest}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text py="2" data-cy="vinyl_color">
            {kleur}
          </Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme="pink">
            <Link to={`/vinyl/${id}`} data-cy="vinyl_detail_btn">
              Details
            </Link>
          </Button>
          <Button colorScheme="purple">
            <Link to={`/vinyl/edit/${id}`} data-cy="vinyl_edit_btn">
              <IoPencilOutline />
            </Link>
          </Button>
          <Button
            data-cy="vinyl_delete_btn"
            colorScheme="blue"
            onClick={handleDelete}
          >
            <IoTrashOutline />
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
});
